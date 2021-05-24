<script>
  import meetups from './Meetups/meetups-store';
  import EditMeetup from './Meetups/EditMeetup.svelte';
  import MeetupGrid from './Meetups/MeetupGrid.svelte';
  import Button from './UI/Button.svelte';
  import Header from './UI/Header.svelte';

  let editMode;

  function addMeetup(e) {
    const meetupData = {
      title: e.detail.title,
      subtitle: e.detail.subtitle,
      description: e.detail.description,
      imageUrl: e.detail.imageUrl,
      address: e.detail.address,
      contactEmail: e.detail.email,
    };
    meetups.addMeetup(meetupData);
    editMode = null;
  }

  function cancelEdit() {
    editMode = null;
  }

  function toggleFavorite(e) {
    const id = e.detail;
    meetups.toggleFavorite(id);
  }
</script>

<Header />
<main>
  <div class="controls">
    <Button on:click={() => (editMode = 'add')}>New meetup</Button>
  </div>
  {#if editMode === 'add'}
    <EditMeetup on:save={addMeetup} on:cancel={cancelEdit} />
  {/if}
  <MeetupGrid meetups={$meetups} on:togglefavorite={toggleFavorite} />
</main>

<style>
  main {
    margin-top: 5rem;
  }
  .controls {
    margin: 1rem;
  }
</style>
