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
    const subHeaderText = document.querySelector('h2')?.textContent;
    const paragraphText = document.querySelector('p')?.textContent;

    expect(headerText).toBe('Welcome');
    expect(subHeaderText).toBe('Have plans to organize?');
    expect(paragraphText).toBe(
      'Create simple well organized event with tasks to not miss anything',
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
