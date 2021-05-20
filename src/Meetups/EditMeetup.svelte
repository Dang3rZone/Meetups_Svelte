<script>
  import { createEventDispatcher } from "svelte";
  import Button from "../UI/Button.svelte";
  import Modal from "../UI/Modal.svelte";
  import TextInput from "../UI/TextInput.svelte";

  let title = "";
  let subtitle = "";
  let address = "";
  let email = "";
  let description = "";
  let imageUrl = "";

  const dispatch = createEventDispatcher();

  function submitForm() {
    dispatch("save", {
      title: title,
      subtitle: subtitle,
      description: description,
      imageUrl: imageUrl,
      email: email,
      address: address,
    });
  }

  function cancel() {
    dispatch("cancel");
  }
</script>

<Modal title="Edit meetup" on:cancel>
  <form on:submit|preventDefault={submitForm}>
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
  </form>
  <div slot="footer">
    <Button type="button" mode="outline" on:click={cancel}>Cancel</Button>
    <Button type="button" on:click={submitForm}>Save</Button>
  </div>
</Modal>

<style>
  form {
    width: 100%;
  }
</style>
