<script lang="ts">
  import Sidebar from '$lib/components/Sidebar.svelte'
</script>

<div class="h-screen w-screen flex bg-base-300">
  <Sidebar />
  <!-- Form Content -->
  <form class="m-auto" method="POST">
    <fieldset class="fieldset bg-base-200 border-neutral rounded-box border p-4">
      <legend class="fieldset-legend">Add a Patient</legend>

      <div class="grid grid-cols-4 gap-5">
        <div class="col-span-2">
          <label for="patient_id" class="label">Patient ID</label>
          <input name="patient_id" type="number" id="patient_id" class="input"/>
        </div>

        <div class="col-span-2">
          <label for="date_of_usg" class="label">Date of USG</label>
          <input name="date_of_usg" type="date" id="date_of_usg" class="input"/>
        </div>

        <div class="col-span-2">
          <label for="patient_name" class="label">Patient Name</label>
          <input name="patient_name" type="text" id="patient_name" class="input"/>
        </div>

        <div class="col-span-2">
          <label for="husband_name" class="label">Husband Name</label>
          <input name="husband_name" type="text" id="husband_name" class="input"/>
        </div>

        <div class="col-span-2">
          <label for="patient_age" class="label">Patient Age</label>
          <input name="patient_age" type="number" id="patient_age" class="input"/>
        </div>

        <div class="col-span-2">
          <label for="last_menstrual_period" class="label">Last Menstrual Period</label>
          <input name="last_menstrual_period" type="date" id="last_menstrual_period" class="input"/>
        </div>

        <div class="col-span-2">
          <label for="number_of_male_children" class="label">Number of Male Children</label>
          <input name="number_of_male_children" type="number" id="number_of_male_children" class="input"/>
        </div>

        <div class="col-span-2">
          <label for="number_of_female_children" class="label">Number of Female Children</label>
          <input name="number_of_female_children" type="number" id="number_of_female_children" class="input"/>
        </div>

        <div class="col-span-2">
          <label for="referred_by" class="label">Referred By</label>
          <input name="referred_by" type="text" id="referred_by" class="input"/>
        </div>

        <div class="col-span-2">
          <label for="mobile_no" class="label">Mobile Number</label>
          <input name="mobile_no" type="number" id="mobile_no" class="input"/>
        </div>

        <div class="col-span-2">
          <label for="address" class="label">Address</label>
          <textarea name="address" id="address" class="textarea"></textarea>
        </div>
        <div class="col-span-1"></div>

        <button class="btn btn-primary self-end">Submit</button>
      </div>
    </fieldset>
  </form>
</div>