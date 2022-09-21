import { BasePage } from "./base-page"

export class BasePersonPage extends BasePage {

	constructor(pageUrl: string = "/customers/Jigsaw/641056") {
		super(pageUrl)
	}

  basePersonElements = {
    ...this.baseElements,
    getBackToSearchButton: () => cy.get('#back-to-search'),
    getNewSearchButton: () => cy.get('#new-search')
  }

}