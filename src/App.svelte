<script>
  import MeetupGrid from "./Meetups/MeetupGrid.svelte";
  import Header from "./UI/Header.svelte";
  import TextInput from "./UI/TextInput.svelte";

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
    <TextInput
      id="title"
      type="text"
      label="Title"
      value={title}
      on:input={(e) => (title = e.target.value)}
    />
    <TextInput
      id="subtitle"
      type="text"
      label="Subtitle"
      value={subtitle}
      on:input={(e) => (subtitle = e.target.value)}
    />
    <TextInput
      id="address"
      type="text"
      label="Address"
      value={address}
      on:input={(e) => (address = e.target.value)}
    />
    <TextInput
      id="imageUrl"
      type="text"
      label="Image Url"
      value={imageUrl}
      on:input={(e) => (imageUrl = e.target.value)}
    />
    <TextInput
      id="email"
      label="Email"
      value={email}
      type="email"
      on:input={(e) => (email = e.target.value)}
    />
    <TextInput
      id="description"
      label="Description"
      value={description}
      controlType="textarea"
      on:input={(e) => (description = e.target.value)}
    />

    <button type="submit">Save</button>
  </form>
  <MeetupGrid {meetups} />
</main>

<style>
  main {
    margin-top: 5rem;
  }
  form {
    width: 30rem;
    max-width: 90%;
    margin: auto;
  }
</style>
