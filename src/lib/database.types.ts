export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          role: 'employee' | 'manager'
          service: string
          anonymous_id: string
          display_name: string | null
          consents: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          role?: 'employee' | 'manager'
          service: string
          anonymous_id?: string
          display_name?: string | null
          consents?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          role?: 'employee' | 'manager'
          service?: string
          anonymous_id?: string
          display_name?: string | null
          consents?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      posts: {
        Row: {
          id: string
          user_id: string
          mood: 'very_happy' | 'happy' | 'neutral' | 'sad' | 'very_sad'
          message: string
          is_anonymous: boolean
          anonymous_id: string
          service: string
          tags: string[] | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          mood: 'very_happy' | 'happy' | 'neutral' | 'sad' | 'very_sad'
          message: string
          is_anonymous?: boolean
          anonymous_id: string
          service: string
          tags?: string[] | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          mood?: 'very_happy' | 'happy' | 'neutral' | 'sad' | 'very_sad'
          message?: string
          is_anonymous?: boolean
          anonymous_id?: string
          service?: string
          tags?: string[] | null
          created_at?: string
        }
      }
      services: {
        Row: {
          id: string
          name: string
          mood_average: number
          participant_count: number
          last_updated: string
        }
        Insert: {
          id?: string
          name: string
          mood_average?: number
          participant_count?: number
          last_updated?: string
        }
        Update: {
          id?: string
          name?: string
          mood_average?: number
          participant_count?: number
          last_updated?: string
        }
      }
      chat_conversations: {
        Row: {
          id: string
          participant_1_id: string
          participant_2_id: string
          created_at: string
          last_message_at: string
        }
        Insert: {
          id?: string
          participant_1_id: string
          participant_2_id: string
          created_at?: string
          last_message_at?: string
        }
        Update: {
          id?: string
          participant_1_id?: string
          participant_2_id?: string
          created_at?: string
          last_message_at?: string
        }
      }
      chat_messages: {
        Row: {
          id: string
          conversation_id: string
          sender_id: string
          message: string
          read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          conversation_id: string
          sender_id: string
          message: string
          read?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          conversation_id?: string
          sender_id?: string
          message?: string
          read?: boolean
          created_at?: string
        }
      }
      post_reactions: {
        Row: {
          id: string
          user_id: string
          post_id: string | null
          reply_id: string | null
          emoji: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          post_id?: string | null
          reply_id?: string | null
          emoji: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          post_id?: string | null
          reply_id?: string | null
          emoji?: string
          created_at?: string
        }
      }
      post_replies: {
        Row: {
          id: string
          post_id: string
          user_id: string
          message: string
          is_anonymous: boolean
          created_at: string
        }
        Insert: {
          id?: string
          post_id: string
          user_id: string
          message: string
          is_anonymous?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          post_id?: string
          user_id?: string
          message?: string
          is_anonymous?: boolean
          created_at?: string
        }
      }
    }
  }
}
