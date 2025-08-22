-- Fix security issue with smile_analysis_leads table
-- Add user_id column and update RLS policies for better security

-- Add user_id column to link leads to authenticated users
ALTER TABLE public.smile_analysis_leads 
ADD COLUMN user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE;

-- Create index for better performance
CREATE INDEX idx_smile_analysis_leads_user_id ON public.smile_analysis_leads(user_id);

-- Drop the existing email-based policy that poses security risk
DROP POLICY IF EXISTS "Users can view their own leads by email" ON public.smile_analysis_leads;

-- Create new secure policies using user_id
CREATE POLICY "Users can view their own leads" 
ON public.smile_analysis_leads 
FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own leads" 
ON public.smile_analysis_leads 
FOR UPDATE 
TO authenticated
USING (auth.uid() = user_id);

-- Update the insert policy to ensure user_id is set correctly
DROP POLICY IF EXISTS "Anyone can create leads" ON public.smile_analysis_leads;

CREATE POLICY "Authenticated users can create their own leads" 
ON public.smile_analysis_leads 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Create a policy for anonymous users to create leads (for the landing page)
CREATE POLICY "Anonymous users can create leads" 
ON public.smile_analysis_leads 
FOR INSERT 
TO anon
WITH CHECK (user_id IS NULL);

-- Create a function to automatically set user_id when authenticated users create leads
CREATE OR REPLACE FUNCTION public.set_user_id_on_lead()
RETURNS TRIGGER AS $$
BEGIN
  -- Only set user_id if user is authenticated and user_id is not already set
  IF auth.uid() IS NOT NULL AND NEW.user_id IS NULL THEN
    NEW.user_id = auth.uid();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically set user_id
CREATE TRIGGER set_user_id_on_lead_trigger
  BEFORE INSERT ON public.smile_analysis_leads
  FOR EACH ROW
  EXECUTE FUNCTION public.set_user_id_on_lead();