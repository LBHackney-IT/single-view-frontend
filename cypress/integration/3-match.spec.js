import { AuthRoles } from '../support/commands';

describe('matching', () => {
  before(() => {
    cy.visitAs('/search', AuthRoles.UnrestrictedGroup);
    cy.setCookie('jigsawToken', 'testValue')
  }) 

  it('displays search results', () => {
    cy.get('#firstName').type('Luna');
    cy.get('#lastName').type('Kitty');

    cy.intercept('GET', '**/search?**', { fixture: 'person-search.json' }).as('getPersons')

    cy.get('.govuk-button').should('have.text', 'Search').click();

    cy.get('#searchResults', { timeout: 10000 })
      .should('be.visible')

    cy.get('.lbh-heading-h3').should('have.text', '12 results found')

    cy.get(':nth-child(1) > .sv-result')
      .should('have.text', 'Luna Kitty, Date of Birth: 06/10/1977ROOM 608 143 Northumberland Park, N17 0TR Person API id: 57ea3d58');
     })

 it('allows user to match results', () => {
    cy.get('#match-button').should('be.disabled');

     cy.get(".sv-checkboxes").eq(0).click();  
     cy.get(".sv-checkboxes").eq(1).click();   
     cy.get('#match-button').should('have.text', 'Merge 2 records');

     cy.intercept('POST', '**/customers**', {
         statusCode: 201,
         body: 'cypress-sv-id'
     }).as('mergeRecords')

     cy.get('#match-button').click();

     cy.location('pathname').should('eq', '/customers/single-view/cypress-sv-id');


 })

})
