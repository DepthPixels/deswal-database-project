<script lang="ts">
  import Sidebar from '$lib/components/Sidebar.svelte';

</script>

<div class="h-screen w-screen flex bg-base-300">
  <Sidebar />

  <!-- Form Content -->
  <form class="m-auto">
    <fieldset class="fieldset bg-base-200 border-neutral rounded-box border p-4 ">
      <legend class="fieldset-legend">Add a Patient</legend>

      <div class="grid grid-cols-4 gap-5">
        <div class="col-span-2">
          <label for="patient_id" class="label">Patient ID</label>
          <input type="number" id="patient_id" class="input"/>
        </div>

        <div class="col-span-2">
          <label for="date_of_usg" class="label">Date of USG</label>
          <input type="date" id="usg-date" class="input"/>
        </div>

        <div class="col-span-2">
          <label for="patient_name" class="label">Patient Name</label>
          <input type="text" id="patient_name" class="input"/>
        </div>

        <div class="col-span-2">
          <label for="husband_name" class="label">Husband Name</label>
          <input type="text" id="husband_name" class="input"/>
        </div>

        <div class="col-span-2">
          <label for="patient_age" class="label">Patient Age</label>
          <input type="number" id="patient_age" class="input"/>
        </div>

        <div class="col-span-2">
          <label for="last_menstrual_period" class="label">Last Menstrual Period</label>
          <input type="date" id="last_menstrual_period" class="input"/>
        </div>

        <div class="col-span-2">
          <label for="number_of_male_children" class="label">Number of Male Children</label>
          <input type="number" id="number_of_male_children" class="input"/>
        </div>

        <div class="col-span-2">
          <label for="number_of_female_children" class="label">Number of Female Children</label>
          <input type="number" id="number_of_female_children" class="input"/>
        </div>

        <div class="col-span-2">
          <label for="referred_by" class="label">Referred By</label>
          <input type="text" id="referred_by" class="input"/>
        </div>

        <div class="col-span-2">
          <label for="mobile_no" class="label">Mobile Number</label>
          <input type="number" id="mobile_no" class="input"/>
        </div>

        <div class="col-span-2">
          <label for="address" class="label">Address</label>
          <textarea id="address" class="textarea"></textarea>
        </div>
        <div class="col-span-1"></div>

        <button class="btn btn-primary self-end">Submit</button>
      </div>
    </fieldset>
  </form>
</div>