/**
 * @jest-environment jsdom
 */
import { render, fireEvent } from '@testing-library/svelte';
import EditMeetup from './EditMeetup.svelte';

const formData = {
  id: null,
  title: '',
  subtitle: '',
  address: '',
  email: '',
  description: '',
  imageUrl: '',
};

describe('form validation', () => {
  it.only('all inputs are required, save btn is disabled', async () => {
    render(EditMeetup);
    const saveBtn = document.querySelectorAll("div>button")[1];

    // btn is disabled by default
    expect(saveBtn).toBeDisabled();
    // expect(saveBtn).toHaveAttribute('disabled');
  });
});
