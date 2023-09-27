import { pageUrl } from '../../environment.e2e';

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
}

export const commonElements = new CommonElements();
