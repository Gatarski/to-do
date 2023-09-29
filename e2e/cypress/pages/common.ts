import { pageUrl } from '../../environment.e2e';

export const logoutIconSelector = 'img[alt="Logout icon"]';
export const modalContentSelector = 'div[class="ant-modal-content"]';

class CommonElements {
  visitPage = (url = pageUrl) => {
    cy.visit(url);
  };

  checkHeaderText = (whichHeader: 'h1' | 'h2' | 'h3', text: string) => {
    cy.get(whichHeader).contains(text);
  };

  checkRedirects = (whichRedirect: number, expectedHref: string, expectedText: string) => {
    cy.get('a').eq(whichRedirect).invoke('attr', 'href').should('eq', expectedHref);
    cy.get('a').eq(whichRedirect).contains(expectedText);
  };

  clickLinkByText = (linkText: string) => {
    cy.get('a').contains(linkText).click();
  };

  clickButtonByText = (buttonText: string) => {
    cy.get('button').contains(buttonText).click();
  };

  checkGuideBoxText = (expectedText: string) => {
    cy.get('#guideBox').contains(expectedText);
  };

  logoutUser = () => {
    cy.get(logoutIconSelector).click();
  };

  checkNoDataMessage = (message: string) => {
    cy.get('#noData').contains(message);
  };
}

export const commonElements = new CommonElements();
