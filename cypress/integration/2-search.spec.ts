import { AuthRoles } from '../support/commands';

describe('search', () => {
  before(() => {
    cy.visitAs('/search', AuthRoles.UnrestrictedGroup);
    cy.setCookie('jigsawToken', 'testValue')
  })

  it('displays the heading', () => {
    cy.get('.lbh-heading-h1', { timeout: 10000 })
      .should('be.visible')
      .should('have.text', 'Search resident information')
  });

  it('displays the form', () => {
    cy.get('form').contains('* First name or initial');
    cy.get('form').contains('* Last name');
    cy.get('form').contains('First line of address');
    cy.get('form').contains('Postcode');
    cy.get('form').contains('Date of birth');
  });

  it('displays the error messages', () => {
    cy.get('.govuk-button', { timeout: 10000 }).click();

    cy.contains('First name is mandatory');
    cy.contains('Last name is mandatory');
  });

  it('displays the error message when date of birth is in future', () => {
    cy.get('#dateOfBirth').type('2050-12-01');

    cy.get('.govuk-button', { timeout: 1000 }).click();

    cy.contains('Date of birth cannot be in future');
  });

  it('displays search results with first name and last name', () => {
    cy.setCookie('jigsawToken', 'testValue')

    cy.get('#firstName').type('Luna');
    cy.get('#lastName').type('Kitty');

    cy.intercept('GET', '**/search?**', { fixture: 'person-search.json' }).as('getPersons')

    cy.get('.govuk-button').first().should('have.text', 'Search').click();

    cy.location().should((location) => {
      expect(location.pathname).to.eq('/search');
      expect(location.search).to.eq('?firstName=Luna&lastName=Kitty&dateOfBirth=2050-12-01');
    });

    cy.get('#searchResults', { timeout: 10000 })
      .should('be.visible')

    cy.get('.lbh-heading-h3').should('have.text', '14 results found')

    cy.get('.lbh-heading-h4').first().should('have.text', 'The following results were matched on name and date of birth, if provided:')

    cy.get('.sv-result').first()
      .contains('Olivia Kitty');

    cy.get('.sv-result').first()
        .contains('(NI Number Not Set)');
  });

})
