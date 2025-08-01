<script lang="ts">
  import { invalidateAll } from '$app/navigation';
  import { handleDeletion } from '$lib/supabaseInterface';
  import { onMount } from 'svelte';

  let { data } = $props();
  let selectedRows: string[] = $state([]);

  let searchBar: HTMLInputElement; // Declare a variable to bind to the input element

  onMount(() => {
    // Add a global keydown listener
    window.addEventListener('keydown', handleGlobalHotkey);
    return () => {
      // Clean up the listener when the component unmounts
      window.removeEventListener('keydown', handleGlobalHotkey);
    };
  });

  function handleGlobalHotkey(event: KeyboardEvent) {
    if (event.ctrlKey && event.key === 'm' && searchBar) { // Example: 't' key
      searchBar.focus();
      event.preventDefault(); // Prevent default browser behavior for the key
    }
    if (event.key === 'Enter') {
      // Handle Enter key press
      console.log('Enter key pressed');
    }
  }
</script>


<div class="flex flex-col justify-center items-center w-auto bg-base-300">
  <div class="flex flex-row justify-end items-center self-start mx-8 mt-8">
    <label class="input mx-auto">
      <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <g
          stroke-linejoin="round"
          stroke-linecap="round"
          stroke-width="2.5"
          fill="none"
          stroke="currentColor"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.3-4.3"></path>
        </g>
      </svg>
      <input type="search" class="grow" placeholder="Search" bind:this={searchBar} />
      <kbd class="kbd kbd-sm">Ctrl</kbd>
      <kbd class="kbd kbd-sm">M</kbd>
    </label>
    <a href="./add-form">
      <div class="btn btn-primary mx-1">
        Add
      </div>
    </a>
    {#if selectedRows.length > 0}
      <a href='./update_record/{selectedRows[0]}'>
        <div class="btn btn-accent mx-1">
          Edit
        </div>
      </a>
      <button class="btn btn-error mx-1" onclick={() => {
        handleDeletion(selectedRows);
        selectedRows = []; // Clear selection after deletion
        invalidateAll();
      }}>
        Delete
      </button>
    {:else}
      <button class="btn btn-accent mx-1" disabled>
        Edit
      </button>
      <button class="btn btn-error mx-1" disabled>
        Delete
      </button>
    {/if}
  </div>
  
  <div class="overflow-x-auto rounded-box border border-base-content/5 m-8 bg-base-100">
    {#if data.patients.length === 0}
      <div class="text-center p-4">No patients found.</div>
    {:else}
    <table class="table table-zebra">
      <!-- head -->
      <thead>
        <tr>
          <th></th>
          <th>Patient ID</th>
          <th>Date of USG</th>
          <th>Patient Name</th>
          <th>Husband Name</th>
          <th>Age</th>
          <th class="text-wrap">Male Children</th>
          <th class="text-wrap">Female Children</th>
          <th class="text-wrap">Male Children Ages</th>
          <th class="text-wrap">Female Children Ages</th>
          <th class="overflow-x-auto min-w-60">Address</th>
          <th>Phone</th>
          <th>Referred By</th>
          <th class="text-wrap min-w-36">Last Menstrual Period</th>
          <th>Gestational Age</th>
          <th>RCH ID</th>
        </tr>
      </thead>
      <tbody>
        <!-- Rows -->
        {#each data.patients as patient}
          <tr>
            <td><input type="checkbox" class="checkbox checkbox-primary" bind:group={selectedRows} value={patient.patient_id} id={`patient-${patient.patient_id}`} /></td>
            <th>{patient.patient_id}</th>
            <td>{patient.date_of_usg}</td>
            <td>{patient.patient_name}</td>
            <td>{patient.husband_name}</td>
            <td>{patient.patient_age}</td>
            <td>{patient.number_of_male_children}</td>
            <td>{patient.number_of_female_children}</td>
            <td>{patient.male_children_ages}</td>
            <td>{patient.female_children_ages}</td>
            <td>{patient.address}</td>
            <td>{patient.mobile_no}</td>
            <td>{patient.referred_by}</td>
            <td>{patient.last_menstrual_period}</td>
            <td>{patient.gestational_age}</td>
            <td>{patient.rch_id}</td>
          </tr>
        {/each}
      </tbody>
    </table>
    {/if}
  </div>
</div>