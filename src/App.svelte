<script>
  import EditMeetup from "./Meetups/EditMeetup.svelte";
  import MeetupGrid from "./Meetups/MeetupGrid.svelte";
  import Button from "./UI/Button.svelte";
  import Header from "./UI/Header.svelte";

  let editMode;
  let meetups = [
    {
      id: "m1",
      title: "Learning Svelte",
      subtitle: "TAO FE position",
      description: "Onboarding process",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Svelte_Logo.svg/1200px-Svelte_Logo.svg.png",
      address: "WeWork - Paseo Castellana 77, Madrid",
      contactEmail: "tao@test.com",
      isFavorite: false,
    },
    {
      id: "m2",
      title: "Learning PHP",
      subtitle: "TAO BE position",
      description: "Onboarding process",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/2/27/PHP-logo.svg",
      address: "WeWork - Paseo Castellana 77, Madrid",
      contactEmail: "tao@test.com",
      isFavorite: false,
    },
  ];

  function addMeetup(e) {
    const newMeetup = {
      id: Math.random().toString(),
      title: e.detail.title,
      subtitle: e.detail.subtitle,
      description: e.detail.description,
      imageUrl: e.detail.imageUrl,
      email: e.detail.email,
      address: e.detail.address,
    };
    meetups = [newMeetup, ...meetups];
    editMode = null;
  }

  function togglefavorite(e) {
    const id = e.detail;
    // Copy the meetup before update
    const updatedMeetup = { ...meetups.find((meet) => meet.id === id) };
    updatedMeetup.isFavorite = !updatedMeetup.isFavorite;
    const meetupIndex = meetups.findIndex((meet) => meet.id === id);
    // Copy the entire meetups
    const updatedMeetups = [...meetups];
    // Update the copy to array by replacing an element
    updatedMeetups[meetupIndex] = updatedMeetup;
    // Overwrite the existing meetups array so it triggers the DOM update
    meetups = updatedMeetups;
  }

  function cancelEdit() {
    editMode = null;
  }
</script>

<Header />
<main>
  <div class="controls">
    <Button on:click={() => (editMode = "add")}>New meetup</Button>
  </div>
  {#if editMode === "add"}
    <EditMeetup on:save={addMeetup} on:cancel={cancelEdit} />
  {/if}
  <MeetupGrid {meetups} on:togglefavorite={togglefavorite} />
</main>

<style>
  main {
    margin-top: 5rem;
  }
  .controls {
    margin: 1rem;
  }
</style>
