-- Add location and current_crop fields to farmer_profiles
ALTER TABLE public.farmer_profiles
ADD COLUMN location TEXT,
ADD COLUMN current_crop TEXT;

-- Update soil_analyses to include coordinates for GIS mapping
ALTER TABLE public.soil_analyses
ADD COLUMN latitude NUMERIC,
ADD COLUMN longitude NUMERIC;