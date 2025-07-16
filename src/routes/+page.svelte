<script>
  let { data } = $props();
</script>

<div class="flex justify-center items-center h-screen">
  <div class="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
    <table class="table table-zebra">
      <!-- head -->
      <thead>
        <tr>
          <th>ID</th>
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
            <th>{patient.id}</th>
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