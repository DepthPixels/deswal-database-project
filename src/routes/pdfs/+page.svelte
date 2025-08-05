<script lang="ts">
  import { downloadList } from '$lib/pdfUtils';
</script>

<div class="flex justify-center items-center w-screen bg-base-300">
  <button class="btn btn-primary mx-auto" onclick={() => {downloadList('Full')}}>Download Full List</button>
  <button class="btn btn-primary mx-auto" onclick={() => {downloadList('Female Children')}}>Download Female Children List</button>
  <button class="btn btn-primary mx-auto" onclick={() => {downloadList('RPOC')}}>Download RPOC List</button>
</div>