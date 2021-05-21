<script>
  import { createEventDispatcher } from "svelte";
  import Button from "../UI/Button.svelte";
  import Modal from "../UI/Modal.svelte";
  import TextInput from "../UI/TextInput.svelte";
  import { isEmpty, isValidEmail } from "../helpers/validation";

  let title = "";
  let titleValid = false;
  let subtitle = "";
  let subtitleValid = false;
  let address = "";
  let addressValid = false;
  let email = "";
  let emailValid = false;
  let description = "";
  let descriptionValid = false;
  let imageUrl = "";
  let imageUrlValid = false;

  const dispatch = createEventDispatcher();

  $: titleValid = !isEmpty(title);
  $: subtitleValid = !isEmpty(subtitle);
  $: addressValid = !isEmpty(address);
  $: descriptionValid = !isEmpty(description);
  $: imageUrlValid = !isEmpty(imageUrl);
  $: emailValid = isValidEmail(email);

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
      label="Title"
      value={title}
      validityMessage="Please enter a valid title"
      valid={titleValid}
      on:input={(e) => (title = e.target.value)}
    />
    <TextInput
      id="subtitle"
      label="Subtitle"
      validityMessage="Please enter a valid subtitle"
      valid={subtitleValid}
      value={subtitle}
      on:input={(e) => (subtitle = e.target.value)}
    />
    <TextInput
      id="address"
      label="Address"
      valid={addressValid}
      validityMessage="Please enter a valid address"
      value={address}
      on:input={(e) => (address = e.target.value)}
    />
    <TextInput
      id="imageUrl"
      label="Image Url"
      valid={imageUrlValid}
      validityMessage="Please enter a valid url"
      value={imageUrl}
      on:input={(e) => (imageUrl = e.target.value)}
    />
    <TextInput
      id="email"
      label="Email"
      valid={emailValid}
      validityMessage="Please enter a valid email"
      value={email}
      type="email"
      on:input={(e) => (email = e.target.value)}
    />
    <TextInput
      id="description"
      label="Description"
      valid={descriptionValid}
      validityMessage="Please enter a valid description"
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
