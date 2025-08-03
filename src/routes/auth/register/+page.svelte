<script lang="ts">
  import { authStore } from '$lib/stores/auth';
  import { createTenant, createUserProfile } from '$lib/supabaseInterface';
  import { goto } from '$app/navigation';
  
  let centerName = '';
  let centerSlug = '';
  let email = '';
  let password = '';
  let confirmPassword = '';
  let fullName = '';
  let phone = '';
  let address = '';
  let licenseNumber = '';
  let pcpndtRegistration = '';
  
  let loading = false;
  let error = '';

  // Auto-generate slug from center name
  $: {
    if (centerName) {
      centerSlug = centerName
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
    }
  }

  async function handleRegister() {
    if (!centerName || !email || !password || !fullName) {
      error = 'Please fill in all required fields';
      return;
    }

    if (password !== confirmPassword) {
      error = 'Passwords do not match';
      return;
    }

    if (password.length < 6) {
      error = 'Password must be at least 6 characters';
      return;
    }

    loading = true;
    error = '';

    try {
      // 1. Create tenant
      const { data: tenant, error: tenantError } = await createTenant({
        name: centerName,
        slug: centerSlug,
        address,
        phone,
        email,
        license_number: licenseNumber,
        pcpndt_registration: pcpndtRegistration
      });

      if (tenantError) throw tenantError;

      // 2. Sign up user
      const { data: authData, error: authError } = await authStore.signUp(email, password, centerSlug);
      
      if (authError) throw authError;

      if (authData.user) {
        // 3. Create user profile
        const { error: profileError } = await createUserProfile({
          user_id: authData.user.id,
          tenant_id: tenant.id,
          role: 'owner',
          full_name: fullName,
          phone
        });

        if (profileError) throw profileError;

        // 4. Sign in the user
        await authStore.signIn(email, password);
        goto('/');
      }
    } catch (err: any) {
      error = err.message || 'Registration failed';
    } finally {
      loading = false;
    }
  }
</script>

<div class="min-h-screen bg-base-300 flex items-center justify-center py-8">
  <div class="card w-full max-w-2xl bg-base-100 shadow-xl">
    <div class="card-body">
      <h2 class="card-title justify-center mb-4">Register Your Ultrasound Center</h2>
      
      {#if error}
        <div class="alert alert-error mb-4">
          <span>{error}</span>
        </div>
      {/if}

      <form on:submit|preventDefault={handleRegister}>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Center Information -->
          <div class="col-span-full">
            <h3 class="text-lg font-semibold mb-2">Center Information</h3>
          </div>
          
          <div class="form-control">
            <label class="label" for="centerName">
              <span class="label-text">Center Name *</span>
            </label>
            <input 
              type="text" 
              id="centerName"
              bind:value={centerName}
              placeholder="e.g., City Ultrasound Center" 
              class="input input-bordered" 
              required 
            />
          </div>

          <div class="form-control">
            <label class="label" for="centerSlug">
              <span class="label-text">Center URL Slug</span>
            </label>
            <input 
              type="text" 
              id="centerSlug"
              bind:value={centerSlug}
              placeholder="auto-generated" 
              class="input input-bordered" 
              readonly
            />
          </div>

          <div class="form-control col-span-full">
            <label class="label" for="address">
              <span class="label-text">Address</span>
            </label>
            <textarea 
              id="address"
              bind:value={address}
              placeholder="Enter center address" 
              class="textarea textarea-bordered"
            ></textarea>
          </div>

          <div class="form-control">
            <label class="label" for="licenseNumber">
              <span class="label-text">License Number</span>
            </label>
            <input 
              type="text" 
              id="licenseNumber"
              bind:value={licenseNumber}
              placeholder="Medical license number" 
              class="input input-bordered" 
            />
          </div>

          <div class="form-control">
            <label class="label" for="pcpndtRegistration">
              <span class="label-text">PCPNDT Registration</span>
            </label>
            <input 
              type="text" 
              id="pcpndtRegistration"
              bind:value={pcpndtRegistration}
              placeholder="PCPNDT registration number" 
              class="input input-bordered" 
            />
          </div>

          <!-- Owner Information -->
          <div class="col-span-full mt-4">
            <h3 class="text-lg font-semibold mb-2">Owner Information</h3>
          </div>

          <div class="form-control">
            <label class="label" for="fullName">
              <span class="label-text">Full Name *</span>
            </label>
            <input 
              type="text" 
              id="fullName"
              bind:value={fullName}
              placeholder="Enter your full name" 
              class="input input-bordered" 
              required 
            />
          </div>

          <div class="form-control">
            <label class="label" for="phone">
              <span class="label-text">Phone Number</span>
            </label>
            <input 
              type="tel" 
              id="phone"
              bind:value={phone}
              placeholder="Enter phone number" 
              class="input input-bordered" 
            />
          </div>

          <div class="form-control">
            <label class="label" for="email">
              <span class="label-text">Email *</span>
            </label>
            <input 
              type="email" 
              id="email"
              bind:value={email}
              placeholder="Enter your email" 
              class="input input-bordered" 
              required 
            />
          </div>

          <div class="form-control">
            <label class="label" for="password">
              <span class="label-text">Password *</span>
            </label>
            <input 
              type="password" 
              id="password"
              bind:value={password}
              placeholder="Enter password (min 6 chars)" 
              class="input input-bordered" 
              required 
            />
          </div>

          <div class="form-control col-span-full">
            <label class="label" for="confirmPassword">
              <span class="label-text">Confirm Password *</span>
            </label>
            <input 
              type="password" 
              id="confirmPassword"
              bind:value={confirmPassword}
              placeholder="Confirm your password" 
              class="input input-bordered" 
              required 
            />
          </div>
        </div>

        <div class="form-control mt-6">
          <button 
            type="submit" 
            class="btn btn-primary"
            class:loading
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Register Center'}
          </button>
        </div>
      </form>

      <div class="divider">OR</div>
      
      <div class="text-center">
        <p class="text-sm">Already have an account?</p>
        <a href="/auth/login" class="link link-primary">Sign in here</a>
      </div>
    </div>
  </div>
</div>