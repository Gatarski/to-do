import { user } from '../../environment.e2e';
import { commonElements } from '../pages/common';
import { eventsPage } from '../pages/events.po';
import { loginPage } from '../pages/login.po';

const EVENT_NAME = 'Cypress event';

describe('Should log to page', () => {
  it('should log to page', () => {
    commonElements.visitPage();
  });

  it('should go to login page', () => {
    commonElements.clickLinkByText('Go to login page');
  });

  it('should fill login form', () => {
    loginPage.fillLoginForm(user.name, user.userPassword);
  });

  it('should log to application', () => {
    commonElements.clickButtonByText('Log in');
  });
});

describe('Should add event', () => {
  it('should click "Add new event"', () => {
    eventsPage.clickAddNewEvent();
  });

  it('should fill event form ', () => {
    eventsPage.fillEventForm(EVENT_NAME, 'This is event from cypress', 'urgent', '2025-01-01')
  });

  it('should save event', () => {
    commonElements.clickButtonByText('Save');
  });
});

describe('Should search event and click it', () => {
  it('should search event by search bar', () => {
    eventsPage.searchEvent(EVENT_NAME);
    eventsPage.checkNumberOfEvents(1);
  });

  it('should click on event', () => {
    eventsPage.clickEventByTitle(EVENT_NAME);
  });

  it('should check event data', () => {
    commonElements.checkHeaderText('h1', EVENT_NAME);
    commonElements.checkHeaderText('h2', 'This is event from cypress');
    commonElements.checkGuideBoxText(
      "You can organize your event: To create tasks in event use button or card 'Add New Task'. Click on task to complete it. You can close or reopen event.",
    );
    commonElements.checkNoDataMessage('No tasks')
  });
});

describe('Should delete event', () => {
  it('should click delete icon', () => {
    eventsPage.clickDeleteIcon();
  });

  it('should check delete event confirmation modal', () => {
    eventsPage.checkDeleteEventModal();
  });

  it('should confirm delete in modal', () => {
    commonElements.clickButtonByText('Delete');
  });
});

describe('Should check that event is deleted and logout', () => {
  it('should search deleted event by search bar', () => {
    eventsPage.searchEvent(EVENT_NAME);
  });

  it('should not found it', () => {
    eventsPage.checkNumberOfEvents(0);
  });

  it('should click logout icon ', () => {
    commonElements.logoutUser();
  });
});
