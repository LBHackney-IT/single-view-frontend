import { AuthRoles, JigsawStatuses } from "../../support/commands";

export class BasePage {
	pageUrl: string;

	constructor(pageUrl: string) {
		this.pageUrl = pageUrl;
	}

	baseElements = {
		getJigsawLoginLinkHeader: () => cy.get('[data-testid="jigsawLoginHeader"]'),
		getJigsawLogoutLinkHeader: () => cy.get('[data-testid="jigsawLogoutHeader"]')
	}

	visit(role?: AuthRoles, jigsawLoggedIn?: JigsawStatuses, options?: Partial<Cypress.VisitOptions>) {
		if (role == null) {
			cy.clearCookies()
			cy.visit(this.pageUrl)
		} else {
			cy.visitAs(this.pageUrl, role, jigsawLoggedIn, options)
		}
	}
}