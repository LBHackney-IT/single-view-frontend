import {AuthRoles, JigsawStatuses} from '../support/commands';
import {searchPage} from '../pages/search-page';

describe('search', () => {
	before(() => {
		searchPage.visit(AuthRoles.UnrestrictedGroup, JigsawStatuses.LoggedIn)
	})

	it('displays the heading', () => {
		searchPage.elements.getSearchPageHeading()
			.should('be.visible')
			.should('have.text', 'Search resident information')
	});

	it('displays the form', () => {
		searchPage.elements.getGetSearchPageForm()
			.should('contain', '* First name or initial')
			.and('contain', '* Last name')
			.and('contain', 'First line of address')
			.and('contain', 'Postcode')
			.and('contain', 'Date of birth');
	});

	it('displays the error messages', () => {
		searchPage.search(null, null, null)

		cy.contains('First name is mandatory');
		cy.contains('Last name is mandatory');
	});

	it('displays the error message when date of birth is in future', () => {
		searchPage.search(null, null, null, null,'2050-12-01')
		cy.contains('Date of birth cannot be in future');
	});

	it('displays search results with first name and last name', () => {
		cy.intercept('GET', '**/search?**', { fixture: 'person-search.json' }).as('getPersons')
		searchPage.visit(AuthRoles.UnrestrictedGroup, JigsawStatuses.LoggedIn)

		searchPage.search('Luna', 'Kitty', null, null, '2050-12-01')

		cy.location().should((location) => {
			expect(location.pathname).to.eq('/search');
			expect(location.search).to.eq('?firstName=Luna&lastName=Kitty&dateOfBirth=2050-12-01');
		});

		searchPage.elements.getSearchResults()
			.should('be.visible')

		searchPage.elements.getResultsCounter()
			.should('have.text', '14 results found')

		searchPage.elements.getResultsDescriptor()
			.should('have.text', 'The following results were merged and saved in single view:')

		searchPage.elements.getResultByIndex(searchPage.resultTypes.Merged, 0)
			.contains('Olivia Kitty');

		searchPage.elements.getResultByIndex(searchPage.resultTypes.Matched, 0)
			.contains('(NI Number Not Set)');

	});

	it('displays merge, confirm and cancel buttons for merged records', () => {
		searchPage.visit(AuthRoles.UnrestrictedGroup, JigsawStatuses.LoggedIn)

		cy.intercept('GET', '**/search?**', { fixture: 'person-search.json' }).as('getPersons')
		searchPage.search('Luna', 'Kitty');

		searchPage.elements.getUnmergeButtonFirst().click();
		searchPage.elements.getConfirmUnmergeButton().should('have.text', "Confirm");
		searchPage.elements.getCancelUnmergeButton().should('have.text', 'Cancel')
	});

	it('displays merged records with multiple data sources', () => {
		searchPage.elements.getResultByIndex(searchPage.resultTypes.Merged, 0).find('[data-testid="mergeCounter-0"]') // Gets counter on first result
			.should('have.text', 'Merged (5)')

		searchPage.elements.getResultByIndex(searchPage.resultTypes.Merged, 0).find('div > span') // Gets labels with system origins
			.children().should('have.length', 3)
	});

	it('displays unmerged records with single data sources', () => {
		searchPage.elements.getResultByIndex(searchPage.resultTypes.Search, 1)
			.contains('Unmerged')

		searchPage.elements.getResultByIndex(searchPage.resultTypes.Search, 1)
			.contains('PersonAPI')
	});

	it('clears search fields', () => {
		cy.intercept('GET', '**/search?**', { fixture: 'person-search.json' }).as('getPersons')
		searchPage.visit(AuthRoles.UnrestrictedGroup, JigsawStatuses.LoggedIn)
		searchPage.search("Olivia", "Kitty", "asdf", "asdf", "2021-11-11")
		searchPage.elements.getClearSearchButton().click()
		searchPage.elements.getFirstNameField().should('have.value', "")
		searchPage.elements.getLastNameField().should('have.value', "")
		searchPage.elements.getFirstLineAddressField().should('have.value', "")
		searchPage.elements.getPostcodeField().should('have.value', "")
		searchPage.elements.getDateOfBirthField().should('have.value', "")
	});

})
