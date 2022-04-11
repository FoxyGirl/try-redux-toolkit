/// <reference types="cypress" />
import { interceptIndefinitely } from '../../support/utlis';

const usersUrl = 'https://jsonplaceholder.typicode.com/users';
const loaderSelector = '[data-testid="usersLoading"]';
const errorSelector = '[data-testid="usersError"]';
const usersSelector = '.Users-wrapper';

describe('users in the app', () => {
  it('should have users sections', () => {
    cy.visit('/');

    cy.get(usersSelector).should('be.not.empty');
  });

  it('should show then hide loading text', () => {
    const interception = interceptIndefinitely(usersUrl);

    cy.visit('/');
    cy.get(loaderSelector)
      .should('be.visible')
      .then(() => {
        interception.sendResponse!();

        cy.get(usersSelector).should('be.visible');
        cy.get(loaderSelector).should('not.exist');
      });
  });

  it('should show error if the data fetch fails', () => {
    const interception = interceptIndefinitely(usersUrl, {
      body: {
        error: 'Not found',
      },
      statusCode: 404,
    });
    cy.visit('/somewhere');
    cy.get(loaderSelector)
      .should('be.visible')
      .then(() => {
        interception.sendResponse!();

        cy.get(usersSelector).should('be.empty');
        cy.get(loaderSelector).should('not.exist');
        cy.get(errorSelector).should('have.text', 'Request failed with status code 404');
      });
  });
});
