<script>
  import meetups from './Meetups/meetups-store';
  import EditMeetup from './Meetups/EditMeetup.svelte';
  import MeetupGrid from './Meetups/MeetupGrid.svelte';
  import Button from './UI/Button.svelte';
  import Header from './UI/Header.svelte';
  import MeetupDetail from './Meetups/MeetupDetail.svelte';

  let editMode;
  let page = 'overview';
  let pageData = {};

  function addMeetup(e) {
    editMode = null;
  }

  function cancelEdit() {
    editMode = null;
  }

  function showdetails(e) {
    page = 'details';
    pageData.id = e.detail;
  }

  function closeDetails() {
    page = 'overview';
    pageData = {};
  }
</script>

<Header />
<main>
  {#if page === 'overview'}
    <div class="controls">
      <Button on:click={() => (editMode = 'add')}>New meetup</Button>
    </div>
    {#if editMode === 'add'}
      <EditMeetup on:save={addMeetup} on:cancel={cancelEdit} />
    {/if}
    <MeetupGrid meetups={$meetups} on:showdetails={showdetails} />
  {:else}
    <MeetupDetail id={pageData.id} on:close={closeDetails} />
  {/if}
</main>

<style>
  main {
    margin-top: 5rem;
  }
  .controls {
    margin: 1rem;
  }
</style>
