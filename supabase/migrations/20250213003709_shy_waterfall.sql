/*
  # Create Hide & Seek Game Schema

  1. New Tables
    - `games`
      - `id` (uuid, primary key)
      - `code` (text, unique) - Game join code
      - `host_id` (uuid) - References auth.users
      - `seeker_id` (uuid) - References auth.users
      - `hider_id` (uuid) - References auth.users
      - `status` (text) - Game status (waiting, hiding, seeking, completed)
      - `hide_time_limit` (int) - Time limit for hiding in seconds
      - `start_time` (timestamptz) - When the seeking phase started
      - `end_time` (timestamptz) - When the game ended
      - `winner_id` (uuid) - References auth.users
      - `created_at` (timestamptz)
    
  2. Security
    - Enable RLS on `games` table
    - Add policies for game access
*/

CREATE TABLE IF NOT EXISTS games (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text UNIQUE NOT NULL,
  host_id uuid REFERENCES auth.users NOT NULL,
  seeker_id uuid REFERENCES auth.users,
  hider_id uuid REFERENCES auth.users,
  status text NOT NULL DEFAULT 'waiting',
  hide_time_limit integer NOT NULL DEFAULT 300,
  start_time timestamptz,
  end_time timestamptz,
  winner_id uuid REFERENCES auth.users,
  created_at timestamptz DEFAULT now(),
  CONSTRAINT valid_status CHECK (status IN ('waiting', 'hiding', 'seeking', 'completed'))
);

ALTER TABLE games ENABLE ROW LEVEL SECURITY;

-- Allow users to read games they're part of
CREATE POLICY "Users can view their games"
  ON games
  FOR SELECT
  USING (
    auth.uid() = host_id OR 
    auth.uid() = seeker_id OR 
    auth.uid() = hider_id
  );

-- Allow users to create games
CREATE POLICY "Users can create games"
  ON games
  FOR INSERT
  WITH CHECK (auth.uid() = host_id);

-- Allow users to update games they're part of
CREATE POLICY "Users can update their games"
  ON games
  FOR UPDATE
  USING (
    auth.uid() = host_id OR 
    auth.uid() = seeker_id OR 
    auth.uid() = hider_id
  );