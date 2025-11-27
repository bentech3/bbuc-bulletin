-- Add priority enum for notices
CREATE TYPE public.notice_priority AS ENUM ('urgent', 'normal', 'low');

-- Add priority column to notices table
ALTER TABLE public.notices 
ADD COLUMN priority public.notice_priority NOT NULL DEFAULT 'normal';

-- Add attachment fields to notices
ALTER TABLE public.notices
ADD COLUMN attachments JSONB DEFAULT '[]'::jsonb,
ADD COLUMN banner_url TEXT,
ADD COLUMN view_count INTEGER NOT NULL DEFAULT 0;

-- Create bookmarks table
CREATE TABLE public.notice_bookmarks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  notice_id UUID NOT NULL REFERENCES public.notices(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, notice_id)
);

ALTER TABLE public.notice_bookmarks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own bookmarks"
ON public.notice_bookmarks
FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Create likes table
CREATE TABLE public.notice_likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  notice_id UUID NOT NULL REFERENCES public.notices(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, notice_id)
);

ALTER TABLE public.notice_likes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own likes"
ON public.notice_likes
FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Likes are viewable by everyone"
ON public.notice_likes
FOR SELECT
USING (true);

-- Create notifications table
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL,
  reference_id UUID,
  read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own notifications"
ON public.notifications
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications"
ON public.notifications
FOR UPDATE
USING (auth.uid() = user_id);

-- Create audit logs table
CREATE TABLE public.audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id UUID,
  details JSONB,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Only admins can view audit logs"
ON public.audit_logs
FOR SELECT
USING (public.is_admin(auth.uid()));

-- Add MFA and notification preferences to profiles
ALTER TABLE public.profiles
ADD COLUMN mfa_enabled BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN mfa_secret TEXT,
ADD COLUMN notification_preferences JSONB DEFAULT '{"email": true, "push": true, "inApp": true}'::jsonb;

-- Create notification preferences table
CREATE TABLE public.notification_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  category TEXT,
  department TEXT,
  subscribed BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, category, department)
);

ALTER TABLE public.notification_subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own subscriptions"
ON public.notification_subscriptions
FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Add departments table
CREATE TABLE public.departments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  faculty TEXT,
  code TEXT UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

ALTER TABLE public.departments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Departments viewable by everyone"
ON public.departments
FOR SELECT
USING (true);

CREATE POLICY "Only admins can manage departments"
ON public.departments
FOR ALL
USING (public.is_admin(auth.uid()))
WITH CHECK (public.is_admin(auth.uid()));

-- Add target_audience field to notices
ALTER TABLE public.notices
ADD COLUMN target_audience JSONB DEFAULT '["all"]'::jsonb;

-- Add archived field to notices
ALTER TABLE public.notices
ADD COLUMN archived BOOLEAN NOT NULL DEFAULT false;

-- Create indexes for performance
CREATE INDEX idx_notices_priority ON public.notices(priority);
CREATE INDEX idx_notices_publish_at ON public.notices(publish_at);
CREATE INDEX idx_notices_expire_at ON public.notices(expire_at);
CREATE INDEX idx_notices_archived ON public.notices(archived);
CREATE INDEX idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX idx_notifications_read ON public.notifications(read);
CREATE INDEX idx_audit_logs_created_at ON public.audit_logs(created_at);
CREATE INDEX idx_bookmarks_user_id ON public.notice_bookmarks(user_id);
CREATE INDEX idx_likes_notice_id ON public.notice_likes(notice_id);

-- Function to increment view count
CREATE OR REPLACE FUNCTION public.increment_notice_views(notice_uuid UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.notices
  SET view_count = view_count + 1
  WHERE id = notice_uuid;
END;
$$;

-- Function to create audit log
CREATE OR REPLACE FUNCTION public.create_audit_log(
  p_user_id UUID,
  p_action TEXT,
  p_entity_type TEXT,
  p_entity_id UUID,
  p_details JSONB
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  log_id UUID;
BEGIN
  INSERT INTO public.audit_logs (user_id, action, entity_type, entity_id, details)
  VALUES (p_user_id, p_action, p_entity_type, p_entity_id, p_details)
  RETURNING id INTO log_id;
  
  RETURN log_id;
END;
$$;