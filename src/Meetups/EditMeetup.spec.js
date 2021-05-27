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
describe('props are passing properly', () => {
  it.only('type of button', async () => {
    render(EditMeetup);
    const saveBtn = document.querySelectorAll('div>button')[1];
    // type button
    expect(saveBtn.type).toBe('button');
  });
});

describe('form validation', () => {
  it.only('all inputs are required, save btn is disabled', () => {
    render(EditMeetup);
    const saveBtn = document.querySelectorAll('div>button')[1];

    // btn is disabled by default
    expect(saveBtn).toBeDisabled();
    // expect(saveBtn).toHaveAttribute('disabled');
  });

  // TODO: work in progress
  //   it.only('button enabled', async () => {
  //     render(EditMeetup);
  //     let formIsValid = true;
  //     const saveBtn = document.querySelectorAll('div>button')[1];
  //     // button enabled
  //     expect(saveBtn).toBeEnabled();
  //   });

  it.only('input are empty', () => {
    render(EditMeetup);
    const input = document.querySelector('#title');
    // be empty
    expect(input).toBeEmptyDOMElement();
  });

  it.only('form is visible', () => {
    render(EditMeetup);
    const form = document.querySelector('form');
    // be empty
    expect(form).toBeVisible();
  });
});
