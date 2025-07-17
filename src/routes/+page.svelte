<script lang="ts">
 import Sidebar from '$lib/components/Sidebar.svelte';

  let { data } = $props();
</script>

<!-- component -->
<div class="h-screen w-screen flex bg-base-300">
	<!-- container -->
  
	<Sidebar />
  <!-- Main Content -->

  <div class="flex flex-col justify-center items-center h-screen">
    <div class="flex flex-row justify-end items-center self-end mx-12">
      <a href="./add-form">
        <div class="btn btn-primary mx-auto">
          Add
        </div>
      </a>
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
        <input type="search" class="grow" placeholder="Search" />
        <kbd class="kbd kbd-sm">Ctrl</kbd>
        <kbd class="kbd kbd-sm">K</kbd>
      </label>
    </div>
    
    <div class="overflow-x-auto rounded-box border border-base-content/5 m-10 bg-base-100">
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
            <th>Male Children</th>
            <th>Female Children</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Referred By</th>
            <th>Last Menstrual Period</th>
          </tr>
        </thead>
        <tbody>
          <!-- Rows -->
          {#each data.patients as patient}
            <tr>
              <td><input type="checkbox" class="checkbox checkbox-primary" /></td>
              <th>{patient.patient_id}</th>
              <td>{patient.date_of_usg}</td>
              <td>{patient.patient_name}</td>
              <td>{patient.husband_name}</td>
              <td>{patient.patient_age}</td>
              <td>{patient.number_of_male_children}</td>
              <td>{patient.number_of_female_children}</td>
              <td>{patient.address}</td>
              <td>{patient.mobile_no}</td>
              <td>{patient.referred_by}</td>
              <td>{patient.last_menstrual_period}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</div>