/*
  # Multi-tenant Architecture Implementation

  1. New Tables
    - `tenants` - Stores ultrasound center information
    - `user_profiles` - Links Supabase auth users to tenants with roles
    - `tenant_subscriptions` - Manages subscription plans and billing

  2. Schema Changes
    - Add `tenant_id` column to existing `patients` table
    - Create indexes for performance optimization

  3. Security
    - Enable RLS on all tables
    - Create policies to ensure tenant data isolation
    - Add user role-based access control

  4. Functions
    - Helper functions for tenant management
    - User role checking functions
*/

-- Create tenants table
CREATE TABLE IF NOT EXISTS tenants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  address text,
  phone text,
  email text,
  license_number text,
  pcpndt_registration text,
  subscription_plan text DEFAULT 'basic' CHECK (subscription_plan IN ('basic', 'professional', 'enterprise', 'chain')),
  subscription_status text DEFAULT 'active' CHECK (subscription_status IN ('active', 'inactive', 'suspended', 'trial')),
  trial_ends_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create user profiles table to link auth users to tenants
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  tenant_id uuid REFERENCES tenants(id) ON DELETE CASCADE,
  role text DEFAULT 'staff' CHECK (role IN ('owner', 'admin', 'doctor', 'technician', 'receptionist', 'staff')),
  full_name text,
  phone text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, tenant_id)
);

-- Create tenant subscriptions table for billing management
CREATE TABLE IF NOT EXISTS tenant_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid REFERENCES tenants(id) ON DELETE CASCADE,
  plan_name text NOT NULL,
  monthly_price decimal(10,2),
  max_scans_per_month integer,
  storage_limit_gb integer,
  features jsonb DEFAULT '{}',
  billing_cycle text DEFAULT 'monthly' CHECK (billing_cycle IN ('monthly', 'yearly')),
  next_billing_date timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Add tenant_id to existing patients table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'patients' AND column_name = 'tenant_id'
  ) THEN
    ALTER TABLE patients ADD COLUMN tenant_id uuid REFERENCES tenants(id) ON DELETE CASCADE;
  END IF;
END $$;

-- Add missing columns to patients table for better tracking
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'patients' AND column_name = 'created_at'
  ) THEN
    ALTER TABLE patients ADD COLUMN created_at timestamptz DEFAULT now();
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'patients' AND column_name = 'updated_at'
  ) THEN
    ALTER TABLE patients ADD COLUMN updated_at timestamptz DEFAULT now();
  END IF;
END $$;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_patients_tenant_id ON patients(tenant_id);
CREATE INDEX IF NOT EXISTS idx_user_profiles_user_id ON user_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_profiles_tenant_id ON user_profiles(tenant_id);
CREATE INDEX IF NOT EXISTS idx_tenants_slug ON tenants(slug);

-- Enable RLS on all tables
ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE tenant_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE patients ENABLE ROW LEVEL SECURITY;

-- Helper function to get current user's tenant_id
CREATE OR REPLACE FUNCTION get_current_tenant_id()
RETURNS uuid
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT tenant_id FROM user_profiles WHERE user_id = auth.uid() LIMIT 1;
$$;

-- Helper function to check if user has specific role
CREATE OR REPLACE FUNCTION user_has_role(required_role text)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM user_profiles 
    WHERE user_id = auth.uid() 
    AND role = required_role 
    AND is_active = true
  );
$$;

-- Helper function to check if user has any of the specified roles
CREATE OR REPLACE FUNCTION user_has_any_role(roles text[])
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM user_profiles 
    WHERE user_id = auth.uid() 
    AND role = ANY(roles) 
    AND is_active = true
  );
$$;

-- RLS Policies for tenants table
CREATE POLICY "Users can view their own tenant"
  ON tenants
  FOR SELECT
  TO authenticated
  USING (id = get_current_tenant_id());

CREATE POLICY "Owners and admins can update their tenant"
  ON tenants
  FOR UPDATE
  TO authenticated
  USING (id = get_current_tenant_id() AND user_has_any_role(ARRAY['owner', 'admin']));

-- RLS Policies for user_profiles table
CREATE POLICY "Users can view profiles in their tenant"
  ON user_profiles
  FOR SELECT
  TO authenticated
  USING (tenant_id = get_current_tenant_id());

CREATE POLICY "Users can view their own profile"
  ON user_profiles
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Owners and admins can manage user profiles"
  ON user_profiles
  FOR ALL
  TO authenticated
  USING (tenant_id = get_current_tenant_id() AND user_has_any_role(ARRAY['owner', 'admin']));

-- RLS Policies for tenant_subscriptions table
CREATE POLICY "Users can view their tenant's subscription"
  ON tenant_subscriptions
  FOR SELECT
  TO authenticated
  USING (tenant_id = get_current_tenant_id());

CREATE POLICY "Owners can manage subscriptions"
  ON tenant_subscriptions
  FOR ALL
  TO authenticated
  USING (tenant_id = get_current_tenant_id() AND user_has_role('owner'));

-- RLS Policies for patients table
CREATE POLICY "Users can view patients in their tenant"
  ON patients
  FOR SELECT
  TO authenticated
  USING (tenant_id = get_current_tenant_id());

CREATE POLICY "Users can insert patients in their tenant"
  ON patients
  FOR INSERT
  TO authenticated
  WITH CHECK (tenant_id = get_current_tenant_id());

CREATE POLICY "Users can update patients in their tenant"
  ON patients
  FOR UPDATE
  TO authenticated
  USING (tenant_id = get_current_tenant_id());

CREATE POLICY "Admins and owners can delete patients"
  ON patients
  FOR DELETE
  TO authenticated
  USING (tenant_id = get_current_tenant_id() AND user_has_any_role(ARRAY['owner', 'admin']));

-- Create trigger to automatically update updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_tenants_updated_at BEFORE UPDATE ON tenants
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_patients_updated_at BEFORE UPDATE ON patients
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample tenant data for testing
INSERT INTO tenants (name, slug, address, phone, email, license_number, pcpndt_registration)
VALUES 
  ('Demo Ultrasound Center', 'demo-center', '123 Medical Street, Delhi', '+91-9876543210', 'demo@ultrasound.com', 'LIC123456', 'PCPNDT789')
ON CONFLICT (slug) DO NOTHING;