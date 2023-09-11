import { render } from '@testing-library/react';
import { TopPanel } from '@/components/TopPanel';
import { getCurrentDate } from '@/utils/utils';
import { normalizeWhitespaces, resolvedComponent } from './utils/test-utils';

jest.mock('../lib/auth', () => ({
  getUserFromCookie: jest.fn(),
}));

jest.mock('../components/UI/Logout', () => {
  return {
    Logout: () => <></>,
  };
});

describe('Test component TopPanel', () => {
  const currentDate = getCurrentDate();
  const NAME = 'Bob';
  const EMAIL = 'bob@test.com';

  it('should display user name with current date', async () => {
    const getUserFromCookieInMock = require('../lib/auth').getUserFromCookie;
    getUserFromCookieInMock.mockResolvedValueOnce({
      dataValues: { name: NAME, email: EMAIL },
    });

    const TopPanelResolved = await resolvedComponent(TopPanel);
    render(<TopPanelResolved />);

    const displayedText = normalizeWhitespaces(document.querySelector('div')?.textContent);
    const expectedText = `You are logged as ${NAME} - today is ${currentDate}`;

    expect(displayedText).toBe(expectedText);
  });

  it('should display user email with current date', async () => {
    const getUserFromCookieInMock = require('../lib/auth').getUserFromCookie;
    getUserFromCookieInMock.mockResolvedValueOnce({
      dataValues: { name: '', email: EMAIL },
    });

    const TopPanelResolved = await resolvedComponent(TopPanel);
    render(<TopPanelResolved />);

    const displayedText = normalizeWhitespaces(document.querySelector('div')?.textContent);
    const expectedText = `You are logged as ${EMAIL} - today is ${currentDate}`;

    expect(displayedText).toBe(expectedText);
  });
});
