<script>
  import MeetupItem from "./Meetups/MeetupItem.svelte";
  import Header from "./UI/Header.svelte";

  const meetups = [
    {
      id: "m1",
      title: "Learning Svelte",
      subtitle: "TAO FE position",
      description: "Onboarding process",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Svelte_Logo.svg/1200px-Svelte_Logo.svg.png",
      address: "WeWork - Paseo Castellana 77, Madrid",
      contactEmail: "tao@taotesting.com",
    },
    {
      id: "m2",
      title: "Learning PHP",
      subtitle: "TAO BE position",
      description: "Onboarding process",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/2/27/PHP-logo.svg",
      address: "WeWork - Paseo Castellana 77, Madrid",
      contactEmail: "tao@taotesting.com",
    },
  ];
</script>

<Header />
<section id="meetups">
  {#each meetups as meetup}
    <MeetupItem
      title={meetup.title}
      subtitle={meetup.subtitle}
      imageUrl={meetup.imageUrl}
      description={meetup.description}
    />
  {/each}
</section>

<style>
  #meetups {
    margin-top: 5em;
  }
</style>
