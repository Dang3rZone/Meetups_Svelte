<script>
  import ContactCard from "./ContactCard.svelte";

  let name = "Andres";
  let title = "";
  let image = "";
  let description = "";
  let formState = "empty";

  let createdContacts = [];

  function addContact(e) {
    e.preventDefault();
    if (
      name.trim().length == 0 ||
      title.trim().length == 0 ||
      image.trim().length == 0 ||
      description.trim().length == 0
    ) {
      formState = "invalid";
      return;
    }

    createdContacts = [
      ...createdContacts,
      {
        id: Math.random() * 10000,
        name: name,
        jobTitle: title,
        imageUrl: image,
        desc: description,
      },
    ];

    formState = "done";
  }

  function deleteFirst() {
    createdContacts = createdContacts.slice(1);
  }
  function deleteLast() {
    createdContacts = createdContacts.slice(0, -1);
  }
</script>

<div id="form">
  <div class="form-control">
    <label for="userName">User Name</label>
    <input type="text" bind:value={name} id="userName" />
  </div>
  <div class="form-control">
    <label for="jobTitle">Job Title</label>
    <input type="text" bind:value={title} id="jobTitle" />
  </div>
  <div class="form-control">
    <label for="image">Image URL</label>
    <input type="text" bind:value={image} id="image" />
  </div>
  <div class="form-control">
    <label for="desc">Description</label>
    <textarea rows="3" bind:value={description} id="desc" />
  </div>
  <button on:click|once={addContact}>Add Contact</button>
</div>

<!-- TODO: Modifiers are pipes with | sintax: once, passive, capture, stopPropagation, preventDefault -->
<button on:click={deleteFirst}>Delete First Contact</button>
<button on:click={deleteLast}>Delete Last Contact</button>

{#if formState === "invalid"}
  <p>Invalid form! Please complete the form</p>
  <!-- {:else}
  <p>Please enter some data</p> -->
{/if}

{#each createdContacts as contact, index (contact.id)}
  <h2>#{index + 1}</h2>
  <ContactCard
    userName={contact.name}
    jobTitle={contact.jobTitle}
    description={contact.desc}
    userImage={contact.imageUrl}
  />
{:else}
  <p>Please start adding contacts!</p>
{/each}

<style>
  #form {
    width: 25rem;
    max-width: 100%;
    margin: 1rem;
  }
</style>
