-- Create table for smile analysis leads
CREATE TABLE public.smile_analysis_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  age INTEGER,
  analysis_completed BOOLEAN DEFAULT false,
  analysis_score INTEGER,
  analysis_data JSONB,
  utm_source TEXT,
  utm_campaign TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.smile_analysis_leads ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (lead generation)
CREATE POLICY "Anyone can create leads" 
ON public.smile_analysis_leads 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Users can view their own leads by email" 
ON public.smile_analysis_leads 
FOR SELECT 
USING (email = current_setting('request.jwt.claims', true)::json->>'email');

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_leads_updated_at
BEFORE UPDATE ON public.smile_analysis_leads
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for better performance
CREATE INDEX idx_leads_email ON public.smile_analysis_leads(email);
CREATE INDEX idx_leads_created_at ON public.smile_analysis_leads(created_at DESC);