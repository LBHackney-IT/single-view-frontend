import { AuthRoles, JigsawStatuses } from '../support/commands';
import { profilePage } from '../pages/profile/profile-page';
import { searchPage } from '../pages/search-page';

describe('Search links', () => {
  describe('Basic Information', () => {
    const searchResidentPath = 'firstName=Luna&lastName=Kitty';
    before(() => {
      profilePage.visit(AuthRoles.UnrestrictedGroup, JigsawStatuses.LoggedIn, {
        onBeforeLoad: (window) => {window.document.cookie = "searchResidentPath=" + `/search?${searchResidentPath}`}
      });

      cy.intercept('GET', '**/customers*', { fixture: 'person-profile.json' }).as('getPerson');
    })

    it('displays the Back to search results button and loads search page with pre-populated fields', () => {
      profilePage.elements.backToSearch()
      .should('be.visible');

      profilePage.elements.backToSearch().click()

      cy.location().should((location) => {
        expect(location.pathname).to.eq('/search');
        expect(location.search).to.eq('?' + searchResidentPath);
      });

      searchPage.elements.getFirstNameField()
      .should('have.value', 'Luna');
      searchPage.elements.getLastNameField()
      .should('have.value', 'Kitty');
    });

    it('displays the new search button and loads search page with empty fields', () => {
      profilePage.visit(AuthRoles.UnrestrictedGroup, JigsawStatuses.LoggedIn)

      cy.get('#new-search', { timeout: 10000 }).should('be.visible');

      cy.get('#new-search').first().click({ force: true });

      cy.location().should((location) => {
        expect(location.pathname).to.eq('/');
      });

      cy.get('#firstName').should('have.value', '');
      cy.get('#lastName').should('have.value', '');
    });
  });
})
