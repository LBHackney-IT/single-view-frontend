import { AuthRoles } from '../support/commands';

describe('Cases', () => {
  describe("Displays active case", () => {
    before(() => {
      cy.intercept('GET', "**/getJigsawCustomer*", {fixture: 'person-profile.json'}).as('getJigsawCustomer');
      cy.intercept('GET', '**/getJigsawCases*', { fixture: 'person-cases.json' }).as("getJigsawCases");
      cy.setCookie('jigsawToken', 'testValue');
      cy.visitAs('/customers/Jigsaw/641056#cases', AuthRoles.UnrestrictedGroup);
    });

    it('displays the cases tab', () => {
      cy.get('#cases', { timeout: 10000 })
        .should('be.visible')
    });
    it('displays the case ID', ()=>{
      cy.get('[data-testid="caseId"]').should('have.text', "641056", {timeout: 10000});
    });
    it('displays the case Status', ()=>{
      cy.get('[data-testid="statusName"]').should('have.text', "Relief", {timeout: 10000});
    });
     it('displays the case date of approach', ()=>{
      cy.get('[data-testid="dateOfApproach"]').should('have.text', "05/05/2022 1:00", {timeout: 10000});
    });
    it('displays the Assigned Agent', ()=>{
      cy.get('[data-testid="assignedTo"]').should('have.text', "Agent Carter", {timeout: 10000});
    });
    it('displays the Flowchart Position', ()=>{
      cy.get('[data-testid="currentFlowChartPosition"]').should('have.text', "Relief", {timeout: 10000});
    });
    it('displays the current decision', ()=>{
      cy.get('[data-testid="currentDecision"]').should('have.text', "56 days relief duty - help to secure accommodation s.189B", {timeout: 10000});
    });
    it('displays the placement address', ()=>{
      cy.get('[data-testid="fullAddress"]').should('have.text', "  435 Loxford Lane Loxford Lane Ilford SW1 1AA ", {timeout: 10000});
    });
    it('displays the placement detail full name', ()=>{
      cy.get('[data-testid="placementDutyFullName"]').should('have.text', "Section 188 – Interim duty to accommodate in case of apparent priority need", {timeout: 10000});
    });


  });
});
