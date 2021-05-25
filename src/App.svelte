<script>
  import meetups from './Meetups/meetups-store';
  import EditMeetup from './Meetups/EditMeetup.svelte';
  import MeetupGrid from './Meetups/MeetupGrid.svelte';
  import Button from './UI/Button.svelte';
  import Header from './UI/Header.svelte';
  import MeetupDetail from './Meetups/MeetupDetail.svelte';

  let editMode;
  let editedId;
  let page = 'overview';
  let pageData = {};

  function saveMeetup(event) {
    editMode = null;
    editedId = null;
  }

  function cancelEdit() {
    editMode = null;
    editedId = null;
  }

  function showdetails(event) {
    page = 'details';
    pageData.id = event.detail;
  }

  function closeDetails() {
    page = 'overview';
    pageData = {};
  }

  function startEdit(event) {
    editMode = 'edit';
    editedId = event.detail;
  }
</script>

<Header />
<main>
  {#if page === 'overview'}
    <div class="controls">
      <Button on:click={() => (editMode = 'edit')}>New meetup</Button>
    </div>
    {#if editMode === 'edit'}
      <EditMeetup id={editedId} on:save={saveMeetup} on:cancel={cancelEdit} />
    {/if}
    <MeetupGrid
      meetups={$meetups}
      on:showdetails={showdetails}
      on:edit={startEdit}
    />
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
