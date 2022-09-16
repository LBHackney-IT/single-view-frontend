import { AuthRoles, JigsawStatuses } from '../support/commands';
import { profilePage } from '../pages/profile/profile-page';
import { searchPage } from '../pages/search-page';

describe('Search links', () => {
  describe('Basic Information', () => {
    const searchResidentPath = 'firstName=Luna&lastName=Kitty';
    before(() => {
      profilePage.visit(AuthRoles.UnrestrictedGroup, JigsawStatuses.LoggedIn, {
        onBeforeLoad: (window) => { window.document.cookie = "searchResidentPath=" + `/search?${searchResidentPath}` }
      });

      cy.intercept('GET', '**/customers*', { fixture: 'person-profile.json' }).as('getPerson');
    })

    it('displays the Back to search results button and loads search page with pre-populated fields', () => {
      profilePage.elements.getBackToSearchButton().click()
      searchPage.elements.getFirstNameField()
        .should('have.value', 'Luna');
      searchPage.elements.getLastNameField()
        .should('have.value', 'Kitty');
    });

    it('displays the new search button and loads search page with empty fields', () => {
      profilePage.visit(AuthRoles.UnrestrictedGroup, JigsawStatuses.LoggedIn)

      profilePage.elements.getNewSearchButton().first().click();

      searchPage.elements.getFirstNameField()
        .should('have.value', '');
      searchPage.elements.getLastNameField()
        .should('have.value', '');
    });

  });
})
