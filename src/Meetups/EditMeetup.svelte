<script>
  import meetups from './meetups-store';
  import { createEventDispatcher } from 'svelte';
  import Button from '../UI/Button.svelte';
  import Modal from '../UI/Modal.svelte';
  import TextInput from '../UI/TextInput.svelte';
  import { isEmpty, isValidEmail } from '../helpers/validation';

  export let id = null;
  let title = '';
  let subtitle = '';
  let address = '';
  let email = '';
  let description = '';
  let imageUrl = '';

  if (id) {
    const unsubscribe = meetups.subscribe((items) => {
      const selectedMeetup = items.find((i) => i.id === id);
      title = selectedMeetup.title;
      subtitle = selectedMeetup.subtitle;
      address = selectedMeetup.address;
      email = selectedMeetup.contactEmail;
      description = selectedMeetup.description;
      imageUrl = selectedMeetup.imageUrl;
    });

    unsubscribe();
  }

  const dispatch = createEventDispatcher();

  $: titleValid = !isEmpty(title);
  $: subtitleValid = !isEmpty(subtitle);
  $: addressValid = !isEmpty(address);
  $: descriptionValid = !isEmpty(description);
  $: imageUrlValid = !isEmpty(imageUrl);
  $: emailValid = isValidEmail(email);
  $: formIsValid =
    titleValid &&
    subtitleValid &&
    addressValid &&
    descriptionValid &&
    imageUrlValid &&
    emailValid;

  function submitForm() {
    const meetupData = {
      title: title,
      subtitle: subtitle,
      description: description,
      imageUrl: imageUrl,
      address: address,
      contactEmail: email,
    };

    // meetups.push(newMeetip) => DO NOT DO THIS
    if (id) {
      meetups.updateMeetup(id, meetupData);
    } else {
      meetups.addMeetup(meetupData);
      dispatch('save');
    }
  }

  function cancel() {
    dispatch('cancel');
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
      bind:value={description}
      controlType="textarea"
    />
  </form>
  <div slot="footer">
    <Button mode="outline" on:click={cancel}>Cancel</Button>
    <Button on:click={submitForm} disabled={!formIsValid}>Save</Button>
  </div>
</Modal>

<style>
  form {
    width: 100%;
  }
</style>
