/*
  # Safe Migration - Add Missing Tables and Fields
  This migration safely adds missing tables and fields, checking for existence first.
*/

-- Add missing fields to posts table (safe)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'posts' AND column_name = 'tags') THEN
        ALTER TABLE posts ADD COLUMN tags text[];
    END IF;
END $$;

-- Add missing fields to profiles table (safe)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'consents') THEN
        ALTER TABLE profiles ADD COLUMN consents jsonb DEFAULT '{}';
    END IF;
END $$;

-- Add missing fields to chat_messages table (safe)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'chat_messages' AND column_name = 'read') THEN
        ALTER TABLE chat_messages ADD COLUMN read boolean DEFAULT false;
    END IF;
END $$;

-- Create post_replies table (safe)
CREATE TABLE IF NOT EXISTS post_replies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  message text NOT NULL,
  is_anonymous boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Create post_reactions table (safe)
CREATE TABLE IF NOT EXISTS post_reactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  post_id uuid REFERENCES posts(id) ON DELETE CASCADE,
  reply_id uuid REFERENCES post_replies(id) ON DELETE CASCADE,
  emoji text NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, post_id, emoji),
  UNIQUE(user_id, reply_id, emoji),
  CHECK (
    (post_id IS NOT NULL AND reply_id IS NULL) OR 
    (post_id IS NULL AND reply_id IS NOT NULL)
  )
);

-- Create indexes for new tables (safe)
CREATE INDEX IF NOT EXISTS idx_post_replies_post_id ON post_replies(post_id);
CREATE INDEX IF NOT EXISTS idx_post_replies_user_id ON post_replies(user_id);
CREATE INDEX IF NOT EXISTS idx_post_replies_created_at ON post_replies(created_at);
CREATE INDEX IF NOT EXISTS idx_post_reactions_post_id ON post_reactions(post_id);
CREATE INDEX IF NOT EXISTS idx_post_reactions_reply_id ON post_reactions(reply_id);
CREATE INDEX IF NOT EXISTS idx_post_reactions_user_id ON post_reactions(user_id);

-- Enable RLS on new tables (safe)
ALTER TABLE post_reactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_replies ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist and recreate them
DROP POLICY IF EXISTS "Users can view all post reactions" ON post_reactions;
DROP POLICY IF EXISTS "Users can create post reactions" ON post_reactions;
DROP POLICY IF EXISTS "Users can delete own post reactions" ON post_reactions;
DROP POLICY IF EXISTS "Users can view all post replies" ON post_replies;
DROP POLICY IF EXISTS "Users can create post replies" ON post_replies;
DROP POLICY IF EXISTS "Users can update own post replies" ON post_replies;
DROP POLICY IF EXISTS "Users can delete own post replies" ON post_replies;

-- RLS Policies for post_reactions
CREATE POLICY "Users can view all post reactions"
  ON post_reactions FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create post reactions"
  ON post_reactions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own post reactions"
  ON post_reactions FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS Policies for post_replies
CREATE POLICY "Users can view all post replies"
  ON post_replies FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create post replies"
  ON post_replies FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own post replies"
  ON post_replies FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own post replies"
  ON post_replies FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);
