import { user } from '../../environment.e2e';
import { commonElements } from '../pages/common';
import { loginPage } from '../pages/login.po';

describe('Should log to page', () => {
  it('should log to page', () => {
    commonElements.visitPage();
  });

  it('should check texts on welcome page', () => {
    loginPage.checkWelcomePageTexts();
  });

  it('should check redirects on welcome page', () => {
    commonElements.checkRedirects(0, '/login', 'Go to login page');
    commonElements.checkRedirects(1, '/register', 'Go to register page');
  });

  it('should go to login page', () => {
    commonElements.clickLinkByText('Go to login page');
  });

  it('should check texts on login page', () => {
    loginPage.checkLoginPageTexts();
  });

  it('should fill login form', () => {
    loginPage.fillLoginForm(user.name, user.userPassword);
  });

  it('should log to application', () => {
    commonElements.clickButtonByText('Log in');
  });

  it('should check that user is logged in', () => {
    loginPage.checkThatUserIsLoggedIn('Grzegorz');
  });
});

describe('Should check that Events, Notes and Profile are displayed', () => {
  it('should check texts on Event page ', () => {
    commonElements.checkGuideBoxText(
      "You can organize future events. To create event use button or card 'Add New Event'. Click on event for more details.",
    );
  });

  it('should go to Notes page ', () => {
    commonElements.clickLinkByText('Notes');
  });

  it('should check texts on Notes page ', () => {
    commonElements.checkGuideBoxText(
      "You can create notes. To create note use button or card 'Add new note'. Click on note for more details.",
    );
  });

  it('should go to Profile page ', () => {
    commonElements.clickLinkByText('Profile');
  });

  it('should check texts on Profile page ', () => {
    commonElements.checkHeaderText('h1', 'Your profile and data');
    commonElements.checkHeaderText('h2', 'Preview your data');
  });
});

describe('Should log out', () => {
  it('should click logout icon ', () => {
    commonElements.logoutUser();
  });

  it('should check that user is logged out ', () => {
    loginPage.checkLoginPageTexts();
  });
});
