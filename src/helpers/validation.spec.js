import { isEmpty, isValidEmail } from './validation';

describe('#Input-validation', () => {
  test('should confirm is empty', () => {
    const val = '    ';
    expect(isEmpty(val)).toBeTruthy();
  });

  test('should confirm is NOT empty', () => {
    const val = 'hi';
    expect(isEmpty(val)).toBeFalsy();
  });
});

describe('#Email-validation', () => {
  test('should confirm is empty', () => {
    const val = 'tato@taotesting.com';
    expect(isValidEmail(val)).toBeTruthy();
  });

  test('should confirm is NOT an email', () => {
    const val = 'hi';
    expect(isValidEmail(val)).toBeFalsy();
  });
});
