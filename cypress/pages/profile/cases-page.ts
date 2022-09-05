import { BasePersonPage } from "../base/base-person-page"

class CasesPage extends BasePersonPage {

	constructor(pageUrl: string = "/customers/Jigsaw/641056#cases") {
		super(pageUrl = pageUrl)
	}

  elements = {
    ...this.basePersonElements,
    getLoginErrorSummary: () => cy.get('[data-testid="jigsawLoginErrorSummary"]'),
    getCasesTab: () => cy.get('#tab_cases'),
    getCaseId: () => cy.get('[data-testid="caseId"]'),
    getCaseStatus: () => cy.get('[data-testid="statusName"]'),
    getDateOfApproach: () => cy.get('[data-testid="dateOfApproach"]'),
    getAssignedAgent: () => cy.get('[data-testid="assignedTo"]'),
    getFlowchartPosition: () => cy.get('[data-testid="currentFlowChartPosition"]'),
    getCurrentDecision: () => cy.get('[data-testid="currentDecision"]'),
    getPlacementAddress: () => cy.get('[data-testid="fullAddress"]'),
    getPlacementDutyFullName: () => cy.get('[data-testid="placementDutyFullName"]'),
    getAdditionalFactorByIndex: (index) => cy.get(`[data-testid="AdditionalFactor-${index}"]`),
    getWellbeingFactorByIndex: (index) => cy.get(`[data-testid="WellBeingFactor-${index}"]`)
  }

}

export const casesPage = new CasesPage();