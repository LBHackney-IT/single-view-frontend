import { AuthRoles } from "../support/commands";

export class BasePage {
	pageUrl: string;

	constructor(pageUrl: string) {
		this.pageUrl = pageUrl;
	}

	visit(role?: AuthRoles, jigsawLoggedIn?: boolean) {
		if (role == null) {
			cy.clearCookies()
			cy.visit(this.pageUrl)
		} else {
			cy.visitAs(this.pageUrl, role, jigsawLoggedIn)
		}
	}
}