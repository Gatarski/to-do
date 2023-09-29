import { commonElements, modalContentSelector } from './common';

class EventsPage {
  clickAddNewEvent = () => {
    cy.get('div').contains('Add new event', { timeout: 10000 }).click();
  };

  fillEventForm = (
    title: string,
    description: string,
    priority: 'small' | 'medium' | 'urgent',
    deadline: string,
  ) => {
    cy.get('#title').type(title);
    cy.get('#shortDescription').type(description);
    cy.get('#deadline').type(deadline, { force: true });
    cy.get('#priority').within(() => {
      cy.get('span').contains(priority).click();
    });
  };

  searchEvent = (eventTitle: string) => {
    cy.get('input[placeholder="Search events by title"]').clear().type(eventTitle);
    commonElements.clickButtonByText('Search');
  };

  checkNumberOfEvents = (eventsNumber: number) => {
    cy.get('a[href^="/events/"').its('length').should('eq', eventsNumber);
  };

  clickEventByTitle = (eventTitle: string) => {
    cy.get('div').contains(eventTitle).click();
  };

  clickDeleteIcon = () => {
    cy.get('img[alt="Trash icon"]').click();
  };

  checkDeleteEventModal = () => {
    cy.get(modalContentSelector).within(() => {
      cy.get('header').contains('Delete event');
      cy.get('p').contains(
        'Are you sure you want delete event? All tasks inside this event will be deleted.',
      );
    });
  };
}

export const eventsPage = new EventsPage();
