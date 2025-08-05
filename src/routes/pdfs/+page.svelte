<script lang="ts">
  import { downloadFullList } from '$lib/pdfUtils';
</script>

<div class="flex flex-col justify-center items-center w-screen bg-base-300">
  <button class="btn btn-primary" onclick={() => {downloadFullList()}}>Download Full List</button>
</div>