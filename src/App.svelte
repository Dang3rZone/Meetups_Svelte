<script>
  import EditMeetup from "./Meetups/EditMeetup.svelte";

  import MeetupGrid from "./Meetups/MeetupGrid.svelte";
  import Button from "./UI/Button.svelte";
  import Header from "./UI/Header.svelte";

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

  let editMode = null;

  function addMeetup() {
    const newMeetup = {
      id: Math.random().toString(),
      title: title,
      subtitle: subtitle,
      description: description,
      imageUrl: imageUrl,
      email: email,
      address: address,
    };
    meetups = [newMeetup, ...meetups];
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
</script>

<Header />
<main>
  <Button caption="New meetup" on:click={() => (editMode = "add")} />
  {#if editMode === "add"}
    <EditMeetup />
  {/if}
  <MeetupGrid {meetups} on:togglefavorite={togglefavorite} />
</main>

<style>
  main {
    margin-top: 5rem;
  }
</style>
