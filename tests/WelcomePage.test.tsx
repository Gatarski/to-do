import { render, screen } from '@testing-library/react';
import { WelcomePage } from '@/components/WelcomePage';
import { resolvedComponent } from './utils/test-utils';

jest.mock('../lib/auth', () => ({
  getIsUserLoggedIn: jest.fn(() => {
    return Promise.resolve(false);
  }),
}));

describe('Test component WelcomePage', () => {

  beforeEach(async () => {
    const WelcomePageResolved = await resolvedComponent(WelcomePage);
    render(<WelcomePageResolved />);
  });

  it('should check components texts', () => {
    const headerText = document.querySelector('h1')?.textContent;
    const paragraphText = document.querySelector('p')?.textContent;
    expect(headerText).toBe('Welcome');
    expect(paragraphText).toBe(
      'Login in or register user',
    );
  });

  it('should check displayed redirection links', () => {
    const loginLinkHref = screen
      .getByRole('link', { name: 'Go to login page' })
      .getAttribute('href');

    const registerLinkHref = screen
      .getByRole('link', { name: 'Go to register page' })
      .getAttribute('href');

    expect(loginLinkHref).toBe('/login');
    expect(registerLinkHref).toBe('/register');
  });
});
