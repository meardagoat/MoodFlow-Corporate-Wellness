/*
  # MoodFlow - Corporate Wellness App Schema

  ## Overview
  This migration creates the complete database schema for the MoodFlow corporate wellness application.
  
  ## New Tables
  
  ### 1. `profiles`
  Extends Supabase auth.users with additional user information
  - `id` (uuid, primary key, references auth.users)
  - `role` (text) - User role: 'employee' or 'manager'
  - `service` (text) - Department/service name
  - `anonymous_id` (uuid) - Unique identifier for anonymous posts
  - `display_name` (text, nullable) - Optional display name
  - `created_at` (timestamptz) - Account creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp
  
  ### 2. `posts`
  Stores mood posts from employees
  - `id` (uuid, primary key)
  - `user_id` (uuid, references profiles) - Post author
  - `mood` (text) - Emoji representation: 'very_happy', 'happy', 'neutral', 'sad', 'very_sad'
  - `message` (text) - Post content
  - `is_anonymous` (boolean) - Whether post is anonymous
  - `anonymous_id` (uuid) - Anonymous identifier (from user profile)
  - `service` (text) - Service/department
  - `created_at` (timestamptz)
  
  ### 3. `services`
  Department analytics aggregation
  - `id` (uuid, primary key)
  - `name` (text, unique) - Service/department name
  - `mood_average` (numeric) - Average mood score (1-5)
  - `participant_count` (integer) - Number of participants
  - `last_updated` (timestamptz)
  
  ### 4. `chat_conversations`
  Anonymous chat sessions between users
  - `id` (uuid, primary key)
  - `participant_1_id` (uuid) - First participant
  - `participant_2_id` (uuid) - Second participant
  - `created_at` (timestamptz)
  - `last_message_at` (timestamptz)
  
  ### 5. `chat_messages`
  Messages within chat conversations
  - `id` (uuid, primary key)
  - `conversation_id` (uuid, references chat_conversations)
  - `sender_id` (uuid, references profiles)
  - `message` (text)
  - `created_at` (timestamptz)
  
  ## Security
  - Enable Row Level Security (RLS) on all tables
  - Profiles: Users can read all, update own
  - Posts: Users can read all, insert own, update/delete own
  - Services: All authenticated users can read
  - Chats: Users can only access their own conversations
  - Messages: Users can only access messages in their conversations
  
  ## Functions
  - `handle_new_user()` - Trigger to create profile on signup
  - `update_service_analytics()` - Update service mood averages
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role text NOT NULL DEFAULT 'employee' CHECK (role IN ('employee', 'manager')),
  service text NOT NULL,
  anonymous_id uuid NOT NULL DEFAULT gen_random_uuid() UNIQUE,
  display_name text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create posts table
CREATE TABLE IF NOT EXISTS posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  mood text NOT NULL CHECK (mood IN ('very_happy', 'happy', 'neutral', 'sad', 'very_sad')),
  message text NOT NULL,
  is_anonymous boolean DEFAULT true,
  anonymous_id uuid NOT NULL,
  service text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create services table
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  mood_average numeric(3,2) DEFAULT 0,
  participant_count integer DEFAULT 0,
  last_updated timestamptz DEFAULT now()
);

-- Create chat_conversations table
CREATE TABLE IF NOT EXISTS chat_conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  participant_1_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  participant_2_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  last_message_at timestamptz DEFAULT now(),
  UNIQUE(participant_1_id, participant_2_id)
);

-- Create chat_messages table
CREATE TABLE IF NOT EXISTS chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id uuid NOT NULL REFERENCES chat_conversations(id) ON DELETE CASCADE,
  sender_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_service ON posts(service);
CREATE INDEX IF NOT EXISTS idx_posts_user_id ON posts(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_conversation ON chat_messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_chat_conversations_participants ON chat_conversations(participant_1_id, participant_2_id);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view all profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Posts policies
CREATE POLICY "Users can view all posts"
  ON posts FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create posts"
  ON posts FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own posts"
  ON posts FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own posts"
  ON posts FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Services policies
CREATE POLICY "Users can view all services"
  ON services FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Managers can update services"
  ON services FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'manager'
    )
  );

-- Chat conversations policies
CREATE POLICY "Users can view own conversations"
  ON chat_conversations FOR SELECT
  TO authenticated
  USING (
    auth.uid() = participant_1_id OR auth.uid() = participant_2_id
  );

CREATE POLICY "Users can create conversations"
  ON chat_conversations FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = participant_1_id OR auth.uid() = participant_2_id
  );

-- Chat messages policies
CREATE POLICY "Users can view messages in own conversations"
  ON chat_messages FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM chat_conversations
      WHERE chat_conversations.id = chat_messages.conversation_id
      AND (chat_conversations.participant_1_id = auth.uid() 
           OR chat_conversations.participant_2_id = auth.uid())
    )
  );

CREATE POLICY "Users can send messages in own conversations"
  ON chat_messages FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = sender_id AND
    EXISTS (
      SELECT 1 FROM chat_conversations
      WHERE chat_conversations.id = conversation_id
      AND (chat_conversations.participant_1_id = auth.uid() 
           OR chat_conversations.participant_2_id = auth.uid())
    )
  );

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, role, service)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'role', 'employee'),
    COALESCE(NEW.raw_user_meta_data->>'service', 'General')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Function to update service analytics
CREATE OR REPLACE FUNCTION update_service_analytics()
RETURNS void AS $$
DECLARE
  service_record RECORD;
  mood_score numeric;
BEGIN
  FOR service_record IN 
    SELECT DISTINCT service FROM posts
  LOOP
    -- Calculate mood average (very_happy=5, happy=4, neutral=3, sad=2, very_sad=1)
    SELECT AVG(
      CASE mood
        WHEN 'very_happy' THEN 5
        WHEN 'happy' THEN 4
        WHEN 'neutral' THEN 3
        WHEN 'sad' THEN 2
        WHEN 'very_sad' THEN 1
      END
    ) INTO mood_score
    FROM posts
    WHERE service = service_record.service
    AND created_at > NOW() - INTERVAL '30 days';
    
    -- Upsert service record
    INSERT INTO services (name, mood_average, participant_count, last_updated)
    VALUES (
      service_record.service,
      mood_score,
      (SELECT COUNT(DISTINCT user_id) FROM posts WHERE service = service_record.service),
      NOW()
    )
    ON CONFLICT (name) DO UPDATE SET
      mood_average = mood_score,
      participant_count = (SELECT COUNT(DISTINCT user_id) FROM posts WHERE service = service_record.service),
      last_updated = NOW();
  END LOOP;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;