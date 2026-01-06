<script lang="ts">
  import { downloadList } from '$lib/pdfUtils';

  let startDate: Date;
  let endDate: Date;
</script>

<div class="flex flex-col justify-center items-center w-screen bg-base-300 space-y-20">
  <div class="flex justify-center items-center bg-base-300">
    <label for="start_date" class="label mx-4">Start Date</label>
    <input name="start_date" bind:value={startDate} type="date" id="start_date" class="input capitalize"/>
    <label for="end_date" class="label mx-4">End Date</label>
    <input name="end_date" bind:value={endDate} type="date" id="end_date" class="input capitalize"/>
  </div>
  <div class="flex justify-center items-center w-1/2 bg-base-300">
    <button class="btn btn-primary mx-auto" onclick={() => {downloadList('Full', startDate, endDate)}}>Download Full List</button>
    <button class="btn btn-primary mx-auto" onclick={() => {downloadList('Female Children', startDate, endDate)}}>Download Female Children List</button>
    <button class="btn btn-primary mx-auto" onclick={() => {downloadList('RPOC', startDate, endDate)}}>Download RPOC List</button>
  </div>
</div>