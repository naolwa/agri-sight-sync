-- Create farmer profiles table
CREATE TABLE public.farmer_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  farmer_type TEXT NOT NULL CHECK (farmer_type IN ('crop', 'livestock', 'mixed')),
  crops TEXT[],
  harvest_schedule JSONB,
  water_usage_per_day NUMERIC,
  livestock_count INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create soil analyses table
CREATE TABLE public.soil_analyses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  health_score NUMERIC CHECK (health_score >= 0 AND health_score <= 100),
  moisture_level NUMERIC,
  ph_level NUMERIC,
  nitrogen_level NUMERIC,
  ndvi_value NUMERIC,
  recommendations TEXT[],
  should_rest BOOLEAN,
  suggested_crop TEXT,
  rotation_needed BOOLEAN,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.farmer_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.soil_analyses ENABLE ROW LEVEL SECURITY;

-- RLS Policies for farmer_profiles
CREATE POLICY "Users can view their own profile"
  ON public.farmer_profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile"
  ON public.farmer_profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
  ON public.farmer_profiles FOR UPDATE
  USING (auth.uid() = user_id);

-- RLS Policies for soil_analyses
CREATE POLICY "Users can view their own analyses"
  ON public.soil_analyses FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own analyses"
  ON public.soil_analyses FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_farmer_profiles_updated_at
  BEFORE UPDATE ON public.farmer_profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();