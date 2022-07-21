import { AuthRoles } from '../support/commands';

describe('Cases', () => {
  describe("Displays active case", () => {
    before(() => {       
      cy.intercept('GET', '**/getPersonApiCustomer*', { fixture: 'person-profile.json' });
      cy.intercept('GET', '**/getJigsawCases*', { fixture: 'person-cases.json' });
      cy.visitAs('/customers/Jigsaw/6d7ed1a4#cases', AuthRoles.UnrestrictedGroup);
    });

    it('displays the cases tab', () => {
      cy.get('#cases', { timeout: 10000 })
        .should('be.visible')
    });
    it('displays the case ID', ()=>{
      cy.get('[data-testid="caseId"]').should('have.text', "641056", {timeout: 10000});
    }); 
    // it('displays the case Status', ()=>{
    //   cy.get('[data-testid="status"]').should('have.text', "Relief", {timeout: 10000});
    // }); 
    // it('displays the Assigned Agent', ()=>{
    //   cy.get('[data-testid="assignedTo"]').should('have.text', "Agent Carter", {timeout: 10000});
    // }); 
    // it('displays the Flowchart Position', ()=>{
    //   cy.get('[data-testid="flowchartPosition"]').should('have.text', "Relief", {timeout: 10000});
    // }); 
    // it('displays the current decision', ()=>{
    //   cy.get('[data-testid="currentDecision"]').should('have.text', "56 days relief duty - help to secure accommodation s.189B", {timeout: 10000});
    // }); 
    // it('displays the Flowchart Position', ()=>{
    //   cy.get('[data-testid="flowchartPosition"]').should('have.text', "Relief", {timeout: 10000});
    // }); 
    // it('displays the Flowchart Position', ()=>{
    //   cy.get('[data-testid="flowchartPosition"]').should('have.text', "Relief", {timeout: 10000});
    // }); 


  });
});
