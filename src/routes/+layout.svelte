<script>
  import { onMount } from 'svelte';
  import { authStore } from '$lib/stores/auth';
  let { children } = $props();
  let { data } = $props();
  import Sidebar from '$lib/components/Sidebar.svelte';

  import "../app.css";

  // Initialize auth store with server data
  onMount(() => {
    if (data.session && data.userProfile && data.tenant) {
      authStore.updateProfile(data.userProfile);
    } else {
      authStore.initialize();
    }
  });
</script>

{#if data.session && data.userProfile && data.tenant}
  <div class="h-screen w-screen flex">
    <Sidebar />
    {@render children()}
  </div>
{:else}
  <!-- Show auth pages or loading state -->
  {@render children()}
{/if}

  {@render children()}
</div>