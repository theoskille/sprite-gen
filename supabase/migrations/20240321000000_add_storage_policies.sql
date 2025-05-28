-- Create the training-images bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('training-images', 'training-images', false)
ON CONFLICT (id) DO NOTHING;

-- Enable RLS on the bucket
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Create policy to allow authenticated users to upload files
CREATE POLICY "Users can upload training images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'training-images' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Create policy to allow users to read their own files
CREATE POLICY "Users can view their own training images"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'training-images' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Create policy to allow users to delete their own files
CREATE POLICY "Users can delete their own training images"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'training-images' AND
  (storage.foldername(name))[1] = auth.uid()::text
); 