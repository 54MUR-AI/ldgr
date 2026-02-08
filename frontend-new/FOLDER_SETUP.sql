-- LDGR Folder Structure Setup
-- Run this SQL in Supabase SQL Editor

-- Create folders table
CREATE TABLE IF NOT EXISTS folders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  parent_id UUID REFERENCES folders(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add folder_id to files table
ALTER TABLE files ADD COLUMN IF NOT EXISTS folder_id UUID REFERENCES folders(id) ON DELETE SET NULL;

-- Enable Row Level Security on folders
ALTER TABLE folders ENABLE ROW LEVEL SECURITY;

-- Folders policies
CREATE POLICY "Users can view own folders"
  ON folders FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own folders"
  ON folders FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own folders"
  ON folders FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own folders"
  ON folders FOR DELETE
  USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS folders_user_id_idx ON folders(user_id);
CREATE INDEX IF NOT EXISTS folders_parent_id_idx ON folders(parent_id);
CREATE INDEX IF NOT EXISTS files_folder_id_idx ON files(folder_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for folders
DROP TRIGGER IF EXISTS update_folders_updated_at ON folders;
CREATE TRIGGER update_folders_updated_at
  BEFORE UPDATE ON folders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
