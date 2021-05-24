<script>
  import meetups from './Meetups/meetups-store';
  import EditMeetup from './Meetups/EditMeetup.svelte';
  import MeetupGrid from './Meetups/MeetupGrid.svelte';
  import Button from './UI/Button.svelte';
  import Header from './UI/Header.svelte';

  let editMode;

  function addMeetup(e) {
    editMode = null;
  }

  function cancelEdit() {
    editMode = null;
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
  <MeetupGrid meetups={$meetups} />
</main>

<style>
  main {
    margin-top: 5rem;
  }
  .controls {
    margin: 1rem;
  }
</style>
