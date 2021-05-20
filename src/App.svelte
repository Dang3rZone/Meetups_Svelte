<script>
  import MeetupGrid from "./Meetups/MeetupGrid.svelte";
  import Header from "./UI/Header.svelte";

  let title = "";
  let subtitle = "";
  let address = "";
  let email = "";
  let description = "";
  let imageUrl = "";

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
    },
  ];

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
</script>

<Header />
<main>
  <form on:submit|preventDefault={addMeetup}>
    <div class="form-control">
      <label for="title">Title</label>
      <input type="text" id="title" bind:value={title} />
    </div>
    <div class="form-control">
      <label for="subtitle">Subtitle</label>
      <input type="text" id="subtitle" bind:value={subtitle} />
    </div>
    <div class="form-control">
      <label for="Address">Address</label>
      <input type="text" id="Address" bind:value={address} />
    </div>
    <div class="form-control">
      <label for="imageUrl">Image Url</label>
      <input type="text" id="imageUrl" bind:value={imageUrl} />
    </div>
    <div class="form-control">
      <label for="email">Email</label>
      <input type="email" id="email" bind:value={email} />
    </div>
    <div class="form-control">
      <label for="description">Description</label>
      <textarea row="3" id="description" bind:value={description} />
    </div>
    <button type="submit">Save</button>
  </form>
  <MeetupGrid {meetups} />
</main>

<style>
  main {
    margin-top: 5rem;
  }
</style>
