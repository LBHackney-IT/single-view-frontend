import { BasePage } from "./base-page"

export class BasePersonPage extends BasePage {

	constructor(pageUrl: string = "/customers/Jigsaw/641056") {
		super(pageUrl = pageUrl)
	}

  basePersonElements = {
    ...this.baseElements,
    backToSearch: () => cy.get('#back-to-search')
  }

}