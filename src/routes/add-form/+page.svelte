<script lang="ts">
	import type { PageProps } from "./$types";


  let { data }: PageProps = $props();
</script>

<div class="flex flex-col justify-center items-center h-screen w-screen bg-base-300">
  <form class="m-auto" method="POST">
    <fieldset class="fieldset bg-base-200 border-neutral rounded-box border p-4">
      <legend class="fieldset-legend">Add a Patient</legend>

      <div class="grid grid-cols-4 gap-5">
        <div class="col-span-2">
          <label for="patient_id" class="label">Patient ID</label>
          <input name="patient_id" type="number" id="patient_id" class="input capitalize" value={data.nextEmptyId}/>
        </div>

        <div class="col-span-2">
          <label for="date_of_usg" class="label">Date of USG</label>
          <input name="date_of_usg" type="date" id="date_of_usg" class="input capitalize"/>
        </div>

        <div class="col-span-2">
          <label for="patient_name" class="label">Patient Name</label>
          <input name="patient_name" type="text" id="patient_name" class="input capitalize"/>
        </div>

        <div class="col-span-2">
          <label for="husband_name" class="label">Husband Name</label>
          <input name="husband_name" type="text" id="husband_name" class="input capitalize"/>
        </div>

        <div class="col-span-2">
          <label for="patient_age" class="label">Patient Age</label>
          <input name="patient_age" type="number" id="patient_age" class="input capitalize"/>
        </div>

        <div class="col-span-2">
          <label for="last_menstrual_period" class="label">Last Menstrual Period</label>
          <input name="last_menstrual_period" type="date" id="last_menstrual_period" class="input capitalize"/>
        </div>

        <div class="col-span-2">
          <label for="number_of_male_children" class="label">Number of Male Children</label>
          <input name="number_of_male_children" type="number" id="number_of_male_children" class="input capitalize"/>
        </div>

        <div class="col-span-2">
          <label for="number_of_female_children" class="label">Number of Female Children</label>
          <input name="number_of_female_children" type="number" id="number_of_female_children" class="input capitalize"/>
        </div>

        <div class="col-span-2">
          <label for="male_children_ages" class="label">Ages of Male Children</label>
          <input name="male_children_ages" type="text" id="male_children_ages" class="input capitalize" placeholder="Enter values like 2,6 without words or spaces"/>
        </div>

        <div class="col-span-2">
          <label for="female_children_ages" class="label">Ages of Female Children</label>
          <input name="female_children_ages" type="text" id="female_children_ages" class="input capitalize" placeholder="Enter 0 if none"/>
        </div>

        <div class="col-span-2">
          <label for="referred_by" class="label">Referred By</label>
          <input name="referred_by" type="text" id="referred_by" class="input capitalize"/>
        </div>

        <div class="col-span-2">
          <label for="mobile_no" class="label">Mobile Number</label>
          <input name="mobile_no" type="number" id="mobile_no" class="input capitalize" pattern="[0-9]*" minlength="10" maxlength="10"/>
        </div>

        <div class="col-span-2">
          <label for="rch_id" class="label">RCH ID</label>
          <input name="rch_id" type="text" id="rch_id" class="input capitalize"/>
        </div>

        <div class="col-span-2">
          <label for="gestational_age" class="label">Gestational Age</label>
          <input name="gestational_age" type="text" id="gestational_age" class="input capitalize"/>
        </div>

        <div class="col-span-2">
          <label for="address" class="label">Address</label>
          <textarea name="address" id="address" class="textarea capitalize"></textarea>
        </div>


        <div class="col-span-1"></div>

        <button class="btn btn-primary self-end">Submit</button>
      </div>
    </fieldset>
  </form>
</div>