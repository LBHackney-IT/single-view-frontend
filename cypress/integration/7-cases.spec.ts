import { AuthRoles } from '../support/commands';

describe('Cases', () => {

  describe("Prompts Jigsaw login", () => {
    before(() => {
      cy.visitAs('/customers/Jigsaw/641056#cases', AuthRoles.UnrestrictedGroup);
      cy.clearCookie('jigsawToken');
    });

    // beforeEach(() => {
    //   cy.intercept("**/getJigsawCustomer**", {fixture: 'person-profile.json'});
    //   cy.intercept('**/getJigsawCases**', {fixture: 'person-cases.json'});
    // });

    it('displays jigsaw login link in error summary', () => {
      cy.get('[data-testid="jigsawLoginErrorSummary"]').should('have.text', 'Log in to Jigsaw');
    });

    it('displays jigsaw login link in header bar', () => {
      cy.get('[data-testid="jigsawloginHeader"]').should('have.text', 'Log in to Jigsaw');
    });

  });

  describe("Displays cases", () => {
    before(() => {
      cy.visitAs('/customers/Jigsaw/641056#cases', AuthRoles.UnrestrictedGroup);
      cy.setCookie('jigsawToken', 'Placeholder-Jigsaw-Token');
    });

    beforeEach(() => {
    cy.intercept("**/getJigsawCustomer**", {fixture: 'person-profile.json'});
    cy.intercept('**/getJigsawCases**', {fixture: 'person-cases.json'});
    });

    it('displays the cases tab', () => {
      cy.get('#cases', { timeout: 10000 })
        .should('be.visible')
    });
    it('displays the case ID', () => {
      cy.get('[data-testid="caseId"]').should('have.text', "641056", {timeout: 10000});
    });
    it('displays the case Status', () => {
      cy.get('[data-testid="statusName"]').should('have.text', "Relief", {timeout: 10000});
    });
      it('displays the case date of approach', () => {
      cy.get('[data-testid="dateOfApproach"]').should('have.text', "05/05/2022 1:00", {timeout: 10000});
    });
    it('displays the Assigned Agent', () => {
      cy.get('[data-testid="assignedTo"]').should('have.text', "Agent Carter", {timeout: 10000});
    });
    it('displays the Flowchart Position', () => {
      cy.get('[data-testid="currentFlowChartPosition"]').should('have.text', "Relief", {timeout: 10000});
    });
    it('displays the current decision', () => {
      cy.get('[data-testid="currentDecision"]').should('have.text', "56 days relief duty - help to secure accommodation s.189B", {timeout: 10000});
    });
    it('displays the placement address', () => {
      cy.get('[data-testid="fullAddress"]').should('have.text', "  435 Loxford Lane Loxford Lane Ilford SW1 1AA ", {timeout: 10000});
    });
    it('displays the placement detail full name', () => {
      cy.get('[data-testid="placementDutyFullName"]').should('have.text', "Section 188 – Interim duty to accommodate in case of apparent priority need", {timeout: 10000});
    });
    it('displays the additional factors', () => {
      cy.get('[data-testid="AdditionalFactor-0"]').should('have.text', "Yes")
    });
    it('displays the health and wellbeing information', () => {
      cy.get('[data-testid="WellBeingFactor-1"]').should('contain', "wheelchair/depression")
    });
  });
});
