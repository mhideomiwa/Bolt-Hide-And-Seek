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
      games: {
        Row: {
          id: string
          code: string
          host_id: string
          seeker_id: string | null
          hider_id: string | null
          status: 'waiting' | 'hiding' | 'seeking' | 'completed'
          hide_time_limit: number
          start_time: string | null
          end_time: string | null
          winner_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          code: string
          host_id: string
          seeker_id?: string | null
          hider_id?: string | null
          status?: 'waiting' | 'hiding' | 'seeking' | 'completed'
          hide_time_limit?: number
          start_time?: string | null
          end_time?: string | null
          winner_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          code?: string
          host_id?: string
          seeker_id?: string | null
          hider_id?: string | null
          status?: 'waiting' | 'hiding' | 'seeking' | 'completed'
          hide_time_limit?: number
          start_time?: string | null
          end_time?: string | null
          winner_id?: string | null
          created_at?: string
        }
      }
    }
  }
}