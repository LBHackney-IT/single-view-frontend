import { BasePage } from "./base-page"

class SearchPage extends BasePage {

    constructor(pageUrl:string="/search") {
        super(pageUrl=pageUrl)
    }

    elements = {
      getSearchPageHeading: () => cy.get('.lbh-heading-h1'),
      getGetSearchPageForm: () => cy.get('form'),
      getFirstNameField: () => cy.get('#firstName'),
      getLastNameField: () => cy.get('#lastName'),
      getDateOfBirthField: () => cy.get('#dateOfBirth'),
      getSearchButton: () => cy.get('.govuk-button').first(),

      getResultsCounter: () => cy.get('.lbh-heading-h3'),
      getResultsDescriptor: () => cy.get('.lbh-heading-h4'),

      getMergedRecords: () => cy.get('#mergedRecords'),
      getMatchedResults: () => cy.get('#matchedResults'),
      getSearchResults: () => cy.get('#searchResults'),

      getUnmergeButtonFirst: () => cy.get('[data-testid="unmerge"]').first(),
      getConfirmUnmergeButtonFirst: () => cy.get('[data-testid="confirm"]').first(),
      getCancelUnmergeButtonFirst: () => cy.get('[data-testid="cancel"]'),

      getMergedRecordCountFirst: () => cy.get('#mergedRecords > .lbh-body > .sv-result-sub-wrapper > .sv-result > [data-testid="mergeCounter-0"]'),
      getMergedRecordTags: () => cy.get('#mergedRecords > .lbh-body > .sv-result-sub-wrapper > .sv-result > div > span')
    }

}

export const searchPage = new SearchPage();