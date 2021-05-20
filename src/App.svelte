<script>
  import ContactCard from "./ContactCard.svelte";
  let userName = "andres";
  let jobTitle = "Front-End";
  let description = "Study Svelte";
  let image = "";
</script>

<main>
  <h1>Hello {userName}!</h1>
  <button>Change</button>
  <input type="text" bind:value={userName} />
  <input type="text" bind:value={jobTitle} />
  <input type="text" bind:value={image} />
  <textarea rows="3" bind:value={description} />
  <ContactCard
    userName={userName.toUpperCase()}
    {jobTitle}
    {description}
    {image}
  />
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
