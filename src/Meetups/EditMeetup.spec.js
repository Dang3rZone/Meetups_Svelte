/**
 * @jest-environment jsdom
 */
// import { axe } from 'jest-axe';
import { render, fireEvent } from '@testing-library/svelte';
import EditMeetup from './EditMeetup.svelte';
import { addMeetup as mockAddMeetup } from './meetups-store';

const formData = {
  id: null,
  title: 'Test title',
  subtitle: '',
  address: 'Test address',
  email: 'Test email',
  description: 'Test description',
  imageUrl: 'Test imageUrl',
};

jest.mock('./meetups-store.js');

afterEach(() => {
  jest.clearAllMocks();
});

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

  it.only('button disabled using click', () => {
    const { getByLabelText, getByText, getAllByText } = render(EditMeetup);
    getAllByText(/title/i);
    getByLabelText(/email/i);
    getByLabelText(/address/i);
    const submitButton = getByText(/save/i);

    fireEvent.click(submitButton);

    expect(submitButton).toBeDisabled();
  });

  // TODO: work in progress
  it.only('button enabled', () => {
    mockAddMeetup.mockResolvedValue();
    const { getByLabelText, getByText, getAllByText } = render(EditMeetup);
    getAllByText(/title/i).value = formData.title;
    getByLabelText(/email/i).value = formData.email;
    getByLabelText(/address/i).value = formData.address;
    getByLabelText(/description/i).value = formData.description;
    getByLabelText(/imageUrl/i).value = formData.imageUrl;

    const submitButton = getByText(/save/i);

    fireEvent.click(submitButton);

    expect(submitButton).toBeDisabled();

    expect(mockAddMeetup).toHaveBeenCalledWith({
      ...formData,
    });
    expect(mockAddMeetup).toHaveBeenCalledTimes(1);
  });
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

  // TODO: make jest-axe work
  //   it.only('the form is accessible', async () => {
  //     const { container } = render(EditMeetup);
  //     const results = await ActiveXObject(container);
  //     expect(results).toHaveNoViolations();
  //   });

  it.only('renders a form with title content and save button', () => {
    const { getByLabelText, getByText, getAllByText } = render(EditMeetup);
    getAllByText(/title/i);
    getByLabelText(/email/i);
    getByLabelText(/address/i);
    getByText(/save/i);
  });
});
