import { pageUrl } from '../../environment.e2e';
import { commonElements } from './common';

const loginInputSelector = 'input[id="email"]';
const passwordInputSelector = 'input[id="password"]';
const logoutIconSelector = 'img[alt="Logout icon"]'

class LoginPage {
  checkWelcomePageTexts = () => {
    commonElements.checkHeaderText('h1', 'Welcome');
    commonElements.checkHeaderText('h2', 'Have plans to organize?');
    cy.get('p').contains('Create simple well organized event with tasks to not miss anything');
  };

  checkLoginPageTexts = () => {
    commonElements.checkHeaderText('h2', 'Login');
    cy.get('p').contains('Enter your credentials to access your account');
  };

  fillLoginForm = (login: string, password: string) => {
    cy.get(loginInputSelector).type(login);
    cy.get(passwordInputSelector).type(password);
  };

  checkThatUserIsLoggedIn = (loggedUsername: string, urlPath = 'home') => {
    // loggedUsername is logged user name - it can be email or display name
    cy.get(logoutIconSelector).should('be.visible');
    cy.get('div').contains(`You are logged as ${loggedUsername}`);
    cy.url().should('eq', `${pageUrl}${urlPath}`);
  };
}

export const loginPage = new LoginPage();
