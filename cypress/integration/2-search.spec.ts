import { AuthRoles } from '../support/commands';

describe('search', () => {
  before(() => {
    cy.visitAs('/search', AuthRoles.UnrestrictedGroup);
  })

  it('displays the heading', () => {
    cy.get('.lbh-heading-h1', { timeout: 10000 })
      .should('be.visible')
      .should('have.text', 'Search resident information')
  })

  it('displays the form', () => {
    cy.get('form').contains('* First name Mandatory');
    cy.get('form').contains('* Last name Mandatory');
    cy.get('form').contains('First Line of Address');
    cy.get('form').contains('Postcode');
  })

  it('displays search results', () => {
    cy.get('#firstName').type('Luna');
    cy.get('#lastName').type('Kitty');

    cy.intercept('GET', '**/search/persons*', { fixture: 'person-search.json' }).as('getPersons')

    cy.get('.govuk-button').should('have.text', 'Search').click()

    cy.get('#searchResults', { timeout: 10000 })
      .should('be.visible')

    cy.get('.lbh-heading-h3').should('have.text', '12 results found')
  })

})
