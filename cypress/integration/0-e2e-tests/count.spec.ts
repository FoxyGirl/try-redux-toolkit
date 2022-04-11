/// <reference types="cypress" />

describe('count in the app', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should have count with two buttons', () => {
    cy.get('.App h2').should('have.text', 'Count: 0');
    cy.get('.Buttons-wrapper button').first().should('have.text', '+');
    cy.get('.Buttons-wrapper button').last().should('have.text', '–');
  });

  it('should increase count', () => {
    cy.get('.App h2').should('have.text', 'Count: 0');
    cy.get('.Buttons-wrapper button').first().click();
    cy.get('.App h2').should('have.text', 'Count: 5');
  });

  it('should decrease count', () => {
    cy.get('.App h2').should('have.text', 'Count: 0');
    cy.get('.Buttons-wrapper button').last().click();
    cy.get('.App h2').should('have.text', 'Count: -5');
  });
});

// That fixes
// 'count.spec.ts' cannot be compiled under '--isolatedModules' because it is considered a global script file.
// Add an import, export, or an empty 'export {}' statement to make it a module.
export {};
