/**
 * @jest-environment jsdom
 */
// import { axe } from 'jest-axe';
import { render, fireEvent } from '@testing-library/svelte';
import { tick } from 'svelte';
import EditMeetup from './EditMeetup.svelte';
import meetups from './meetups-store';

const formData = {
  //   id: null,
  title: 'Test title',
  subtitle: 'Test subtitle',
  address: 'Test address',
  contactEmail: 'Test email',
  description: 'Test description',
  imageUrl: 'Test imageUrl',
};

jest.mock('./meetups-store.js');

afterEach(() => {
  jest.clearAllMocks();
});

function renderEditMeetup() {
  const utils = render(EditMeetup);
  utils.getAllByText(/title/i).value = formData.title;
  utils.getByLabelText(/email/i).value = formData.email;
  utils.getByLabelText(/address/i).value = formData.address;
  utils.getByLabelText(/description/i).value = formData.description;
  utils.getByLabelText(/imageUrl/i).value = formData.imageUrl;

  const submitButton = utils.getByText(/save/i);
  return {
    ...utils,
    submitButton,
  };
}

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
  /*  it.only('button enabled', () => {
    meetups.addMeetup.mockResolvedValue();
    const { getByLabelText, getByText, getAllByText } = render(EditMeetup);
    getAllByText(/title/i).value = formData.title;
    getAllByText(/subtitle/i).value = formData.subtitle;
    getByLabelText(/email/i).value = formData.contactEmail;
    getByLabelText(/address/i).value = formData.address;
    getByLabelText(/description/i).value = formData.description;
    getByLabelText(/image Url/i).value = formData.imageUrl;

    const submitButton = getByText(/save/i);

    fireEvent.click(submitButton);

    expect(submitButton).toBeDisabled();

    expect(meetups.addMeetup).toHaveBeenCalledWith({
      ...formData,
    });
    expect(meetups.addMeetup).toHaveBeenCalledTimes(1);
  }); */

  it.only('button enabled', async () => {
    meetups.addMeetup.mockResolvedValue();
    const { getByLabelText, getByText, getAllByText } = render(EditMeetup);
    const title = document.querySelector('#title');
    const subtitle = document.querySelector('#subtitle');
    const email = getByLabelText(/email/i);
    const address = getByLabelText(/address/i);
    const description = getByLabelText(/description/i);
    const imageUrl = getByLabelText(/image Url/i);

    const submitButton = getByText(/save/i);

    fireEvent.click(submitButton);

    expect(submitButton).toBeDisabled();

    // set a message

    title.value = 'this would work?';
    subtitle.value = 'this would work?';
    email.value = 'tato@tatotesting.com';
    address.value = 'this would work?';
    description.value = 'this would work?';
    imageUrl.value = 'this would work?';

    await fireEvent.input(title);
    await fireEvent.input(subtitle);
    await fireEvent.input(email);
    await fireEvent.input(address);
    await fireEvent.input(description);
    await fireEvent.input(imageUrl);
    tick();

    // submit button is enabled
    expect(submitButton).toBeEnabled();
  });

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

describe('error handling when dealing with API', () => {
  it.skip('error shows', async () => {
    const testError = 'test error';

    meetups.addMeetup.mockRejectedValueOnce({ data: { error: testError } });
    const { getByLabelText, getByText, getAllByText, findByRole } =
      render(EditMeetup);

    getAllByText(/title/i).value = formData.title;
    getByLabelText(/email/i).value = formData.contactEmail;
    getByLabelText(/address/i).value = formData.address;
    getByLabelText(/description/i).value = formData.description;
    getByLabelText(/imageUrl/i).value = formData.imageUrl;

    const submitButton = getByText(/save/i);

    fireEvent.click(submitButton);

    const postError = await findByRole('alert');
    expect(postError).toHaveTextContent(testError);
    expect(submitButton).not.toBeDisabled();
  });
});
