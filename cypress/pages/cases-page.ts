import { BasePage } from "./base-page"

class CasesPage extends BasePage {

	constructor(pageUrl: string = "/customers/Jigsaw/641056#cases") {
		super(pageUrl = pageUrl)
	}

  elements = {
    ...this.baseElements,
    loginErrorSummary: () => cy.get('[data-testid="jigsawLoginErrorSummary"]'),
  }

}

export const casesPage = new CasesPage();