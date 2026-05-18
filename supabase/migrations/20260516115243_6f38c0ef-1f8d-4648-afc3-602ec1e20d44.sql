-- Create public storage bucket for site content assets
INSERT INTO storage.buckets (id, name, public)
VALUES ('site-assets', 'site-assets', true)
ON CONFLICT (id) DO NOTHING;

-- Public read of site-assets
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public can read site-assets' AND tablename = 'objects' AND schemaname = 'storage') THEN
    CREATE POLICY "Public can read site-assets"
      ON storage.objects FOR SELECT
      USING (bucket_id = 'site-assets');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admins can upload site-assets' AND tablename = 'objects' AND schemaname = 'storage') THEN
    CREATE POLICY "Admins can upload site-assets"
      ON storage.objects FOR INSERT TO authenticated
      WITH CHECK (bucket_id = 'site-assets' AND public.has_role(auth.uid(), 'admin'));
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admins can update site-assets' AND tablename = 'objects' AND schemaname = 'storage') THEN
    CREATE POLICY "Admins can update site-assets"
      ON storage.objects FOR UPDATE TO authenticated
      USING (bucket_id = 'site-assets' AND public.has_role(auth.uid(), 'admin'));
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admins can delete site-assets' AND tablename = 'objects' AND schemaname = 'storage') THEN
    CREATE POLICY "Admins can delete site-assets"
      ON storage.objects FOR DELETE TO authenticated
      USING (bucket_id = 'site-assets' AND public.has_role(auth.uid(), 'admin'));
  END IF;
END $$;

-- Allow deleting settings keys (admins only)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admins can delete settings' AND tablename = 'site_settings' AND schemaname = 'public') THEN
    CREATE POLICY "Admins can delete settings"
      ON public.site_settings FOR DELETE TO authenticated
      USING (public.has_role(auth.uid(), 'admin'));
  END IF;
END $$;