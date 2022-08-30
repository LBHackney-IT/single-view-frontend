import { AuthRoles } from '../support/commands';

describe('matching', () => {
  before(() => {
    var jigsawLoggedIn = true;
    cy.visitAs('/search?firstName=Luna&lastName=Kitty', AuthRoles.UnrestrictedGroup, jigsawLoggedIn);
  });
  
  it('displays search results', () => {

    cy.intercept('GET', '**/search?**', { fixture: 'person-search.json' }).as('getPersons')

    cy.get('#searchResults', { timeout: 10000 })
      .should('be.visible')

    cy.get('.lbh-heading-h3').should('have.text', '14 results found')

    cy.get('.sv-result').first()
      .contains('Olivia Kitty');
  });

  it('does not display merge option for single view records', () => {
    cy.get(".sv-checkboxes").eq(0).should('exist');
    cy.get(".sv-checkboxes").eq(1).should('exist');
    cy.get('#searchResults > :nth-child(2) > .govuk-checkboxes').should('not.be.visible');
  });

 it('allows user to match results', () => {
    cy.get('#match-button').should('be.disabled');

     cy.get(".sv-checkboxes").eq(1).click();
     cy.get(".sv-checkboxes").eq(3).click();
     cy.get('#match-button').should('have.text', 'Merge 2 records');

     cy.intercept('POST', '**/customers**', {
         statusCode: 200,
         body: 'cypress-sv-id'
     }).as('mergeRecords')

     cy.get('#match-button').click();

     cy.location('pathname').should('eq', '/customers/single-view/cypress-sv-id');
 });

})
