/// <reference types="cypress" />
import { interceptIndefinitely } from '../../support/utlis';

const postUrl = 'http://localhost:5000/posts?_limit=30';
const loaderSelector = '[data-testid="posts"] [data-testid="loading"]';
const postsSelector = '[data-testid="posts"] .Post';
const posts2Selector = '[data-testid="posts2"] .Post';

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
    cy.get(posts2Selector).should('have.length', 4);
  });

  it('should not have Update button in the second posts section', () => {
    cy.visit('/');

    cy.get('[data-testid="posts2"]').should('be.not.empty');
    cy.get(posts2Selector).should('have.length', 4);
    cy.get(`${posts2Selector} .Post-buttons`)
      .first()
      .find('button')
      .should('have.length', 1)
      .should('not.have.text', 'Update')
      .should('have.text', 'Delete');
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

describe('form for creating and updating posts in the app', () => {
  const inputTitleSlector = 'input[name="title"]';
  const inputBodySlector = 'textarea[name="body"]';
  const inputAuthorSlector = 'input[name="author"]';
  const submitButtonSlector = '[data-testid="submitForm"]';

  const testTitle = 'Test title';
  const testBody = 'Test body';

  it('should have form with set of empty inputs and button', () => {
    cy.visit('/');

    cy.get('.Form').should('be.not.empty');
    cy.get('.Form .Label').should('have.length', 3);
    cy.get(inputTitleSlector).should('be.exist').should('have.value', '');
    cy.get(inputBodySlector).should('be.exist').should('have.value', '');
    cy.get(inputAuthorSlector).should('be.exist').should('have.value', '');
    cy.get(submitButtonSlector).should('be.exist').should('have.text', 'Add new post');
  });

  it('should create a new post', () => {
    cy.visit('/');

    cy.get(inputTitleSlector).type(testTitle);
    cy.get(inputTitleSlector).should('have.value', testTitle);
    cy.get(inputBodySlector).type(testBody);
    cy.get(inputBodySlector).should('have.value', testBody);
    cy.get(inputAuthorSlector).should('be.exist').should('have.value', '');
    cy.get(submitButtonSlector).click();

    cy.get(postsSelector).should('have.length', 5);
    cy.get(posts2Selector).should('have.length', 5);

    cy.get(postsSelector).first().find('.Post-info span').should('contain.text', testTitle);
    cy.get(postsSelector).first().find('.Post-body').should('have.text', testBody);
    cy.get(postsSelector).first().find('.Post-author').should('have.text', 'unknown');

    cy.get(posts2Selector).last().find('.Post-info span').should('contain.text', testTitle);
    cy.get(posts2Selector).last().find('.Post-body').should('have.text', testBody);
    cy.get(posts2Selector).last().find('.Post-author').should('have.text', 'unknown');
  });

  it('should delete a post', () => {
    cy.visit('/');

    cy.get(postsSelector).should('have.length', 5);
    cy.get(posts2Selector).should('have.length', 5);

    cy.get(postsSelector)
      .first()
      .find('.Post-buttons button')
      .last()
      .should('have.text', 'Delete')
      .click();

    cy.get(postsSelector).should('have.length', 4);
    cy.get(posts2Selector).should('have.length', 4);

    cy.get(postsSelector).first().find('.Post-info span').should('not.contain.text', testTitle);
    cy.get(postsSelector).first().find('.Post-body').should('not.have.text', testBody);
    cy.get(postsSelector).first().find('.Post-author').should('not.have.text', 'unknown');

    cy.get(posts2Selector).last().find('.Post-info span').should('not.contain.text', testTitle);
    cy.get(posts2Selector).last().find('.Post-body').should('not.have.text', testBody);
    cy.get(posts2Selector).last().find('.Post-author').should('not.have.text', 'unknown');
  });
});
