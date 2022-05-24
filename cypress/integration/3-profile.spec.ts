import { AuthRoles } from '../support/commands';

describe('Profile', () => {
  describe('Basic Information', () => {
    before(() => {
      cy.intercept('GET', '**/customers/*', { fixture: 'person-profile.json' }).as('getPerson');
      cy.visitAs('/customers/6d7ed1a4/0', AuthRoles.UnrestrictedGroup);
    })

    it('displays the profile tab', () => {
      cy.get('#profile', { timeout: 10000 })
        .should('be.visible')
    });

    it('displays name', ()=>{
      cy.get('[data-testid="name"]').should('have.text', "Miss Luna Kitty", {timeout: 10000});
    });

    it('displays middle name', ()=>{
      cy.get('[data-testid="middleName"]').should('have.text', "Purry", {timeout: 10000});
    });

    it('displays date of birth', ()=>{
      cy.get('[data-testid="dateOfBirth"]').should('have.text', "07/01/2021", {timeout: 10000});
    });

    it('displays tenures', ()=>{
      cy.get('[data-testid="tenures"]').should('have.text', "123 Cute Street, M3 0W", {timeout: 10000});
    });

    it('displays types', ()=>{
      cy.get('[data-testid="types"]').should('have.text', "HouseholdMember", {timeout: 10000});
    });

    it('displays place of birth', ()=>{
      cy.get('[data-testid="placeOfBirth"]').should('have.text', "London", {timeout: 10000});
    });

    it('displays date of death', ()=>{
      cy.get('[data-testid="dateOfDeath"]').should('have.text', "", {timeout: 10000});
    });

    it('displays is a minor', ()=>{
      cy.get('[data-testid="isMinor"]').should('have.text', "N", {timeout: 10000});
    });

  });

})
