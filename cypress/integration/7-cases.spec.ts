import { AuthRoles, JigsawStatuses } from '../support/commands';
import { casesPage } from '../pages/profile/cases-page';

describe("Displays cases", () => {

  before(() => {
    cy.intercept('**/getJigsawCustomer**', { fixture: 'person-profile.json' });
    cy.intercept('**/getJigsawCases**', { fixture: 'person-cases.json' });

    casesPage.visit(AuthRoles.UnrestrictedGroup, JigsawStatuses.LoggedIn)
  });

  it('displays the cases tab with jigsaw id when available', () => {
    casesPage.elements.getCasesTab()
      .should('have.text', "Active Homelessness Case (641056)", { timeout: 10000 });
  });

  it('displays the case ID', () => {
    casesPage.elements.getCaseId()
      .should('have.text', "641056", { timeout: 10000 });
  });

  it('displays the case Status', () => {
    casesPage.elements.getCaseStatus()
      .should('have.text', "Relief", { timeout: 10000 });
  });

  it('displays the case date of approach', () => {
    casesPage.elements.getDateOfApproach()
      .should('have.text', "05/05/2022 1:00", { timeout: 10000 });
  });

  it('displays the Assigned Agent', () => {
    casesPage.elements.getAssignedAgent()
      .should('have.text', "Agent Carter", { timeout: 10000 });
  });

  it('displays the Flowchart Position', () => {
    casesPage.elements.getFlowchartPosition()
      .should('have.text', "Relief", { timeout: 10000 });
  });

  it('displays the current decision', () => {
    casesPage.elements.getCurrentDecision()
      .should('have.text', "56 days relief duty - help to secure accommodation s.189B", { timeout: 10000 });
  });

  it('displays the placement address', () => {
    casesPage.elements.getPlacementAddress()
      .should('have.text', "  435 Loxford Lane Loxford Lane Ilford SW1 1AA ", { timeout: 10000 });
  });

  it('displays the placement detail full name', () => {
    casesPage.elements.getPlacementDutyFullName()
      .should('have.text', "Section 188 – Interim duty to accommodate in case of apparent priority need", { timeout: 10000 });
  });

  it('displays the additional factors', () => {
    casesPage.elements.getAdditionalFactorByIndex(0)
      .should('have.text', "Yes")
  });

  it('displays the health and wellbeing information', () => {
    casesPage.elements.getWellbeingFactorByIndex(1)
      .should('contain', "wheelchair/depression")
  });

});
