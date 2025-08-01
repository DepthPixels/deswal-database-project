<script>
  let { children } = $props();
  import Sidebar from '$lib/components/Sidebar.svelte';

  import "../app.css";
</script>

<div class="h-screen w-screen flex">
  <Sidebar />

  {@render children()}
</div>