-- Create storage buckets for attachments and banners
INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('notice-attachments', 'notice-attachments', true),
  ('notice-banners', 'notice-banners', true)
ON CONFLICT (id) DO NOTHING;

-- Create RLS policies for notice-attachments bucket
CREATE POLICY "Anyone can view attachments"
ON storage.objects FOR SELECT
USING (bucket_id = 'notice-attachments');

CREATE POLICY "Authenticated users can upload attachments"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'notice-attachments' 
  AND auth.role() = 'authenticated'
);

CREATE POLICY "Users can update their own attachments"
ON storage.objects FOR UPDATE
USING (bucket_id = 'notice-attachments' AND auth.role() = 'authenticated');

CREATE POLICY "Users can delete their own attachments"
ON storage.objects FOR DELETE
USING (bucket_id = 'notice-attachments' AND auth.role() = 'authenticated');

-- Create RLS policies for notice-banners bucket
CREATE POLICY "Anyone can view banners"
ON storage.objects FOR SELECT
USING (bucket_id = 'notice-banners');

CREATE POLICY "Authenticated users can upload banners"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'notice-banners' 
  AND auth.role() = 'authenticated'
);

CREATE POLICY "Users can update their own banners"
ON storage.objects FOR UPDATE
USING (bucket_id = 'notice-banners' AND auth.role() = 'authenticated');

CREATE POLICY "Users can delete their own banners"
ON storage.objects FOR DELETE
USING (bucket_id = 'notice-banners' AND auth.role() = 'authenticated');