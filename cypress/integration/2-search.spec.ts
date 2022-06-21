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
    cy.get('form').contains('* First name');
    cy.get('form').contains('* Last name');
    cy.get('form').contains('First line of address');
    cy.get('form').contains('Postcode');
  });

  it('displays the error messages', () => {
    cy.get('.govuk-button', { timeout: 10000 }).click();

    cy.contains('First name is mandatory');
    cy.contains('Last name is mandatory');
  });

  it('displays search results', () => {
    cy.get('#firstName').type('Luna');
    cy.get('#lastName').type('Kitty');

    cy.intercept('GET', '**/search?**', { fixture: 'person-search.json' }).as('getPersons')

    cy.get('.govuk-button').should('have.text', 'Search').click();

    cy.get('#searchResults', { timeout: 10000 })
      .should('be.visible')

    cy.get('.lbh-heading-h3').should('have.text', '12 results found')

    cy.get(':nth-child(1) > .sv-result')
      .should('have.text', 'Luna Kitty, Date of Birth: 06/10/1977ROOM 608 143 Northumberland Park, N17 0TR Jigsaw id: 57ea3d58');
  });

  xit('displays first result with provided postcode', ()=> {
    cy.get('#postcode').type('M3 0W');

    cy.intercept('GET', '**/search?**', { fixture: 'person-search.json' }).as('getPersons');

    cy.get('.govuk-button').first().should('have.text', 'Search').click();

    cy.get(':nth-child(1) > .sv-result')
      .should('have.text', 'Luna Kitty, Date of Birth: 07/01/2021 123 Cute Street, M3 0W Person API id: 6d7ed1a4');

  })

})
