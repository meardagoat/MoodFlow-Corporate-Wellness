/*
  # Add Missing Tables and Fields
  
  This migration adds the missing tables and fields that are used in the application
  but not defined in the initial schema.
*/

-- Add missing fields to posts table
ALTER TABLE posts ADD COLUMN IF NOT EXISTS tags text[];

-- Add missing fields to profiles table
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS consents jsonb DEFAULT '{}';

-- Add missing fields to chat_messages table
ALTER TABLE chat_messages ADD COLUMN IF NOT EXISTS read boolean DEFAULT false;

-- Create post_reactions table
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

-- Create post_replies table
CREATE TABLE IF NOT EXISTS post_replies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  message text NOT NULL,
  is_anonymous boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Create indexes for new tables
CREATE INDEX IF NOT EXISTS idx_post_reactions_post_id ON post_reactions(post_id);
CREATE INDEX IF NOT EXISTS idx_post_reactions_reply_id ON post_reactions(reply_id);
CREATE INDEX IF NOT EXISTS idx_post_reactions_user_id ON post_reactions(user_id);
CREATE INDEX IF NOT EXISTS idx_post_replies_post_id ON post_replies(post_id);
CREATE INDEX IF NOT EXISTS idx_post_replies_user_id ON post_replies(user_id);
CREATE INDEX IF NOT EXISTS idx_post_replies_created_at ON post_replies(created_at);

-- Enable RLS on new tables
ALTER TABLE post_reactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_replies ENABLE ROW LEVEL SECURITY;

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
