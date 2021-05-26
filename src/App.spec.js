// NOTE: jest-dom adds handy assertions to Jest and it is recommended, but not required.
// import '@testing-library/jest-dom/extend-expect';
import { cleanup, fireEvent, render, waitFor } from '@testing-library/svelte';

import App from './App.svelte';

describe('App', () => {
  it('this is a test', () => {
    expect('hello').toBe('hello');
  });
});
