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
        focus:text-orange-500"
        aria-label="Database">
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
        href="./docs"
        class="h-16 px-6 flex flex justify-center items-center w-full
        focus:text-orange-500"
        aria-label="Documentation">
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

    <li class="hover:bg-base-200 self-end">
      <a
        href="./settings"
        class="h-16 px-6 flex flex justify-center items-center w-full
        focus:text-orange-500"
        aria-label="Settings">
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

  </ul>

  <div class="mt-auto h-16 flex flex-col items-center w-full">
    <!-- Action Section -->
    <button
      class="h-16 w-10 mx-auto flex flex justify-center items-center
      w-full focus:text-orange-500 hover:bg-red-200 focus:outline-none"
      aria-label="Logout">
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