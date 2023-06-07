import { BasePage } from "./base/base-page"

enum ResultTypes {
	Merged = '#mergedRecords',
	Matched = '#matchedResults',
	Search = '#searchResults'
}

class SearchPage extends BasePage {

	constructor(pageUrl: string = "/search") {
		super(pageUrl)
	}

	resultTypes = ResultTypes

	elements = {
		...this.baseElements,
		getSearchPageHeading: () => cy.get('.lbh-heading-h1'),
		getGetSearchPageForm: () => cy.get('form'),

		getFirstNameField: () => cy.get('#firstName'),
		getLastNameField: () => cy.get('#lastName'),
		getFirstLineAddressField: () => cy.get('#addressLine1'),
		getPostcodeField: () => cy.get('#postcode'),
		getDateOfBirthField: () => cy.get('#dateOfBirth'),

		getSearchButton: () => cy.get('[data-testid=searchButton]'),
		getClearSearchButton: () => cy.get('[data-testid=clearSearchButton]'),

		getResultsCounter: () => cy.get('.sv-group > .lbh-heading-h3'),
		getResultsDescriptor: () => cy.get('#mergedRecords > .lbh-heading-h4'),

		getMergedRecords: () => cy.get('#mergedRecords'),
		getMatchedResults: () => cy.get('#matchedResults'),
		getSearchResults: () => cy.get('#searchResults'),

		getUnmergeButtonFirst: () => cy.get('[data-testid="unmerge"]').first(),
		getConfirmUnmergeButton: () => cy.get('[data-testid="confirm"]'),
		getCancelUnmergeButton: () => cy.get('[data-testid="cancel"]'),

		getMergedRecordCountFirst: () => cy.get('[data-testid="mergeCounter-0"]'),
		getMergedRecordTags: () => this.elements.getResultByIndex(this.resultTypes.Merged, 0).find('div > span'),

		getfirstUnmergedResult: () => cy.get('#matchedResults > .lbh-body'),

		getResultByIndex: (resultType: ResultTypes, index: number) => cy.get(`${resultType} > .lbh-body > .sv-result-sub-wrapper > .sv-result`).eq(index),

		getMatchButton: () => cy.get('[data-testid="match-button"]'),

	}

	search(firstName: string, lastName: string, firstLineAddress: string = "", postcode: string = "", dateOfBirth: string = "") {
		firstName && this.elements.getFirstNameField().type(firstName);
		lastName && this.elements.getLastNameField().type(lastName);
		firstLineAddress && this.elements.getFirstLineAddressField().type(firstLineAddress)
		postcode && this.elements.getPostcodeField().type(postcode)
		dateOfBirth && this.elements.getDateOfBirthField().type(dateOfBirth);
		this.elements.getSearchButton().click()
	}

	matchResults(checkboxIndexes: Array<number>) {
		cy.intercept('POST', '**/customers**', {
			statusCode: 200,
			body: 'cypress-sv-id'
		}).as('mergeRecords')
		checkboxIndexes.forEach(checkboxIndex => {
			cy.get(".sv-checkboxes").eq(checkboxIndex).click()
		});
		this.elements.getMatchButton().should('have.text', `Merge ${checkboxIndexes.length} records`);
		this.elements.getMatchButton().click();
	}

}

export const searchPage = new SearchPage();
