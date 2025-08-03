<script lang="ts">
  import { authStore } from '$lib/stores/auth';
  import { goto } from '$app/navigation';
  
  let email = '';
  let password = '';
  let loading = false;
  let error = '';

  async function handleLogin() {
    if (!email || !password) {
      error = 'Please fill in all fields';
      return;
    }

    loading = true;
    error = '';

    try {
      await authStore.signIn(email, password);
      goto('/');
    } catch (err: any) {
      error = err.message || 'Login failed';
    } finally {
      loading = false;
    }
  }
</script>

<div class="min-h-screen bg-base-300 flex items-center justify-center">
  <div class="card w-96 bg-base-100 shadow-xl">
    <div class="card-body">
      <h2 class="card-title justify-center mb-4">Sign In to Your Center</h2>
      
      {#if error}
        <div class="alert alert-error mb-4">
          <span>{error}</span>
        </div>
      {/if}

      <form on:submit|preventDefault={handleLogin}>
        <div class="form-control mb-4">
          <label class="label" for="email">
            <span class="label-text">Email</span>
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

        <div class="form-control mb-6">
          <label class="label" for="password">
            <span class="label-text">Password</span>
          </label>
          <input 
            type="password" 
            id="password"
            bind:value={password}
            placeholder="Enter your password" 
            class="input input-bordered" 
            required 
          />
        </div>

        <div class="form-control">
          <button 
            type="submit" 
            class="btn btn-primary"
            class:loading
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </div>
      </form>

      <div class="divider">OR</div>
      
      <div class="text-center">
        <p class="text-sm">Don't have an account?</p>
        <a href="/auth/register" class="link link-primary">Register your center</a>
      </div>
    </div>
  </div>
</div>