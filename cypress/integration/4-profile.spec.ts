import { AuthRoles } from '../support/commands';

describe('Profile', () => {
  describe('Basic Information', () => {
    before(() => {
      cy.intercept('GET', '**/customers*', { fixture: 'person-profile.json' }).as('getPerson');
      cy.visitAs('/customers/single-view/6d7ed1a4', AuthRoles.UnrestrictedGroup);
    })

    it('displays the profile tab', () => {
      cy.get('#profile', { timeout: 10000 })
        .should('be.visible')
    });

    it('displays jigsaw login error', ()=>{
      cy.get('.govuk-warning-text__text > :nth-child(1)').debug().should('have.text', "Warning", {timeout: 10000});
      cy.get('.govuk-warning-text__text > :nth-child(2)').should('have.text', "If you have access to Jigsaw, please login here.", {timeout: 10000});
    });

    it('displays cautionary alert warning title', ()=>{
      cy.get('[data-testid="cautionaryAlert-alertCode"]').should('have.text', "Warning: Risk to adults", {timeout: 10000});
    });

    it('displays cautionary alert warning message', () => {
      cy.get('[data-testid="cautionaryAlert-alertMessage"]').should('have.text', "Added 01 Mar 2018 by Luna Purry. Last reviewed 01 Feb 2020.");
    });

    it('displays name', ()=>{
      cy.get('[data-testid="name"]').should('have.text', "Miss Luna Kitty", {timeout: 10000});
    });


    it('displays date of birth', ()=>{
      cy.get('[data-testid="dateOfBirth"]').should('have.text', "01/02/1980", {timeout: 10000});
    });

    it('displays tenures', ()=>{
      cy.get('[data-testid="tenureFullAddress"]').should('have.text', "123 Cute Street, M3 0W", {timeout: 10000});
      cy.get('[data-testid="tenureStartDate"]').should('have.text', "Start date: 10/06/1996", {timeout: 10000});
      cy.get('[data-testid="tenureEndDate"]').should('have.text', "End date: 22/07/1999", {timeout: 10000});
      cy.get('[data-testid="tenureDataSource"]').should('have.text', "Data Source: PersonAPI", {timeout: 10000});
    });

    it('displays types', ()=>{
      cy.get('[data-testid="types"]').should('have.text', "HouseholdMember", {timeout: 10000});
    });

    it('displays place of birth', ()=>{
      cy.get('[data-testid="placeOfBirth"]').should('have.text', "", {timeout: 10000});
    });

    it('place of birth is greyed out', () => {
      cy.get('[data-testid="placeOfBirth"]').parent().parent().children("dt").children("h5").should('have.class', 'sv-null-field', {timeout: 10000});
    })

    it('displays date of death', ()=>{
      cy.get('[data-testid="dateOfDeath"]').should('have.text', "", {timeout: 10000});
    });

    it('date of death is greyed out', () => {
      cy.get('[data-testid="dateOfDeath"]').parent().parent().children("dt").children("h5").should('have.class', 'sv-null-field', {timeout: 10000});
    })

    it('displays is a minor', ()=>{
      cy.get('[data-testid="isMinor"]').should('have.text', "N", {timeout: 10000});
    });

    it('displays Council Tax Information', () => {
      cy.get('[data-testid="accountRef"]').should('have.text', "34596507", {timeout: 10000});
      cy.get('[data-testid="accountBalance"]').should('have.text', "15465", {timeout: 10000});
      cy.get('[data-testid="paymentMethod"]').should('have.text', "Direct Debit", {timeout: 10000});
      cy.get('[data-testid="propertyAddress"]').should('have.text', "123 Fake Street Springfield USA  SW19 1AA", {timeout: 10000});
    });

    it('displays System id\'s', () => {
      cy.get('[data-testid="PersonApi"]').should('have.text', "e749f036-3183-49cb-8504-59b76c1a8f88", {timeout: 10000});
      cy.get('[data-testid="Jigsaw"]').should('have.text', "1234", {timeout: 10000});
      cy.get('[data-testid="Academy-CouncilTax"]').should('have.text', "34596507", {timeout: 10000});
    });

  });

})
