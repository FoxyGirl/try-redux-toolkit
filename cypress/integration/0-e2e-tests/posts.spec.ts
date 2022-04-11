/// <reference types="cypress" />
import { interceptIndefinitely } from '../../support/utlis';

const postUrl = 'http://localhost:5000/posts?_limit=30';
const loaderSelector = '[data-testid="posts"] [data-testid="loading"]';
const postsSelector = '[data-testid="posts"] .Post';

const mockPosts = [
  {
    id: 1,
    title: 'json-server 1',
    author: 'typicode',
  },
  {
    id: 2,
    title: 'json-server 2',
    author: 'typicode',
  },
];

describe('posts in the app', () => {
  it('should have 2 posts sections with equal number of posts', () => {
    cy.visit('/');

    cy.get('[data-testid="posts"]').should('be.not.empty');
    cy.get(postsSelector).should('have.length', 4);

    cy.get('[data-testid="posts2"]').should('be.not.empty');
    cy.get('[data-testid="posts2"] .Post').should('have.length', 4);
  });

  context('with a real response', () => {
    it('should show then hide the loading spinner', () => {
      const interception = interceptIndefinitely(postUrl);

      cy.visit('/');
      cy.get(loaderSelector)
        .should('be.visible')
        .then(() => {
          interception.sendResponse!();

          cy.get(postsSelector).should('be.visible');
          cy.get(loaderSelector).should('not.exist');
        });
    });
  });

  context('with a mock error response', () => {
    it('should show error if the data fetch fails', () => {
      const interception = interceptIndefinitely(postUrl, {
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

          cy.get(postsSelector).should('not.exist');
          cy.get(loaderSelector).should('not.exist');
          cy.get('[data-testid="posts"] h3').should('have.text', 'Error with status: 404');
        });
    });
  });

  context('with a mock response', () => {
    it('should show then hide the loading spinner and show mock posts', () => {
      const interception = interceptIndefinitely(postUrl, {
        body: mockPosts,
        statusCode: 200,
      });
      cy.visit('/');
      cy.get(loaderSelector)
        .should('be.visible')
        .then(() => {
          interception.sendResponse!();

          cy.get(postsSelector).should('be.visible');
          cy.get(postsSelector).should('have.length', mockPosts.length);
          cy.get(loaderSelector).should('not.exist');
        });
    });
  });
});
