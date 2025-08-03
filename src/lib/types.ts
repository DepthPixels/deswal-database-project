// Core types for multi-tenant architecture

export interface Tenant {
  id: string;
  name: string;
  slug: string;
  address?: string;
  phone?: string;
  email?: string;
  license_number?: string;
  pcpndt_registration?: string;
  subscription_plan: 'basic' | 'professional' | 'enterprise' | 'chain';
  subscription_status: 'active' | 'inactive' | 'suspended' | 'trial';
  trial_ends_at?: string;
  created_at: string;
  updated_at: string;
}

export interface UserProfile {
  id: string;
  user_id: string;
  tenant_id: string;
  role: 'owner' | 'admin' | 'doctor' | 'technician' | 'receptionist' | 'staff';
  full_name?: string;
  phone?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  tenant?: Tenant; // Optional joined data
}

export interface TenantSubscription {
  id: string;
  tenant_id: string;
  plan_name: string;
  monthly_price: number;
  max_scans_per_month: number;
  storage_limit_gb: number;
  features: Record<string, any>;
  billing_cycle: 'monthly' | 'yearly';
  next_billing_date?: string;
  created_at: string;
  updated_at: string;
}

// Updated Patient type to include tenant_id
export interface Patient {
  patient_id: number;
  tenant_id: string;
  date_of_usg: string;
  patient_name: string;
  husband_name: string;
  patient_age: number;
  number_of_male_children: number;
  number_of_female_children: number;
  male_children_ages: string;
  female_children_ages: string;
  address: string;
  mobile_no: number;
  referred_by: string;
  last_menstrual_period: string;
  gestational_age: string;
  rch_id: string;
  created_at?: string;
  updated_at?: string;
}

// Authentication context
export interface AuthContext {
  user: any; // Supabase user object
  profile: UserProfile | null;
  tenant: Tenant | null;
  isLoading: boolean;
}

// Subscription plan definitions
export interface SubscriptionPlan {
  name: string;
  price: number;
  maxScans: number;
  storageGB: number;
  features: string[];
  popular?: boolean;
}

export const SUBSCRIPTION_PLANS: Record<string, SubscriptionPlan> = {
  basic: {
    name: 'Basic',
    price: 2999,
    maxScans: 200,
    storageGB: 10,
    features: [
      'Up to 200 scans/month',
      'Basic pregnancy tracking',
      'PCPNDT compliance tools',
      'WhatsApp notifications',
      'Cloud storage (10GB)'
    ]
  },
  professional: {
    name: 'Professional',
    price: 7999,
    maxScans: 1000,
    storageGB: 50,
    features: [
      'Up to 1,000 scans/month',
      'Full DICOM integration',
      'Advanced reporting templates',
      'Teleradiology support',
      'Cloud storage (50GB)',
      'Multi-location support'
    ],
    popular: true
  },
  enterprise: {
    name: 'Enterprise',
    price: 19999,
    maxScans: -1, // Unlimited
    storageGB: -1, // Unlimited
    features: [
      'Unlimited scans',
      'Custom integrations',
      'AI-powered analytics',
      'Multi-language support',
      'Dedicated support',
      'Unlimited cloud storage'
    ]
  },
  chain: {
    name: 'Chain/Franchise',
    price: 0, // Custom pricing
    maxScans: -1,
    storageGB: -1,
    features: [
      'Multi-center management',
      'Centralized reporting',
      'Custom branding',
      'Advanced analytics',
      'Training programs',
      'Custom pricing'
    ]
  }
};