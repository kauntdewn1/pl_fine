/*
  # Create clientes_vip table with RLS policies

  1. New Tables
    - `clientes_vip`
      - `id` (uuid, primary key)
      - `email` (text)
      - `canal_entrega` (text)
      - `status` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `clientes_vip` table
    - Add policy to allow anyone to insert new records
    - Add policy to allow authenticated users to read their own records
*/

-- Create the table if it doesn't exist
CREATE TABLE IF NOT EXISTS clientes_vip (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  canal_entrega text NOT NULL,
  status text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE clientes_vip ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert records
CREATE POLICY "Allow anyone to insert records"
  ON clientes_vip
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create policy to allow authenticated users to read their own records
CREATE POLICY "Users can read own records"
  ON clientes_vip
  FOR SELECT
  TO authenticated
  USING (auth.uid() IS NOT NULL AND email = current_user);