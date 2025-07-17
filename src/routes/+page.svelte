<script lang="ts">
  let { data } = $props();
</script>

<!-- component -->
<div class="h-screen w-screen flex bg-base-200">
	<!-- container -->
  
	<aside
		class="flex flex-col items-center bg-base-100 shadow h-full">
		<!-- Side Nav Bar-->

		<div class="h-16 flex items-center w-full">
			<!-- Logo Section -->
			<a class="h-6 w-6 mx-auto" href="http://svelte.dev/">
				<img
					class="h-6 w-6 mx-auto"
					src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Svelte_Logo.svg/512px-Svelte_Logo.svg.png"
					alt="svelte logo" />
			</a>
		</div>

		<ul>
			<!-- Items Section -->
			<li class="hover:bg-base-200">
				<a
					href="."
					class="h-16 px-6 flex flex justify-center items-center w-full
					focus:text-orange-500">
					<svg
						class="h-5 w-5"
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round">
						<polyline
							points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline>
						<path
							d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0
							2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0
							0-1.79 1.11z"></path>
					</svg>

				</a>
			</li>

			<li class="hover:bg-base-200">
				<a
					href="."
					class="h-16 px-6 flex flex justify-center items-center w-full
					focus:text-orange-500">
					<svg
						class="h-5 w-5"
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round">
						<path
							d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
					</svg>

				</a>
			</li>

			<li class="hover:bg-base-200">
				<a
					href="."
					class="h-16 px-6 flex flex justify-center items-center w-full
					focus:text-orange-500">

					<svg
						class="h-5 w-5"
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round">
						<polyline points="3 6 5 6 21 6"></polyline>
						<path
							d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2
							0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
					</svg>

				</a>
			</li>

			<li class="hover:bg-base-200">
				<a
					href="."
					class="h-16 px-6 flex flex justify-center items-center w-full
					focus:text-orange-500">
					<svg
						class="h-5 w-5"
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round">
						<circle cx="9" cy="21" r="1"></circle>
						<circle cx="20" cy="21" r="1"></circle>
						<path
							d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0
							2-1.61L23 6H6"></path>
					</svg>

				</a>
			</li>

			<li class="hover:bg-base-200">
				<a
					href="."
					class="h-16 px-6 flex flex justify-center items-center w-full
					focus:text-orange-500">
					<svg
						class="h-5 w-5"
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round">
						<circle cx="12" cy="12" r="3"></circle>
						<path
							d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1
							0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0
							0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2
							2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0
							0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1
							0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0
							0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65
							0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0
							1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0
							1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2
							0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0
							1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0
							2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0
							0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65
							1.65 0 0 0-1.51 1z"></path>
					</svg>
				</a>
			</li>

			<li class="hover:bg-base-200">
				<a
					href="."
					class="h-16 px-6 flex flex justify-center items-center w-full
					focus:text-orange-500">
					<svg
						class="h-5 w-5"
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round">
						<path
							d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
						<path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
					</svg>
				</a>
			</li>

		</ul>

		<div class="mt-auto h-16 flex items-center w-full">
			<!-- Action Section -->
			<button
				class="h-16 w-10 mx-auto flex flex justify-center items-center
				w-full focus:text-orange-500 hover:bg-red-200 focus:outline-none">
				<svg
					class="h-5 w-5 text-red-700"
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round">
					<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
					<polyline points="16 17 21 12 16 7"></polyline>
					<line x1="21" y1="12" x2="9" y2="12"></line>
				</svg>

			</button>
		</div>

	</aside>
  <!-- Main Content -->

  <div class="flex flex-col justify-center items-center h-screen">
    <div class="flex flex-row justify-end items-center self-end mx-12">
      <div class="btn btn-primary mx-auto">Add</div>
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
              <td><input type="checkbox" class="checkbox checkbox-primary" /></td>
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
</div>