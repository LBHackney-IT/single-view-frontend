import { AuthRoles } from '../support/commands';

// TODO: Put this in a helpers/utils file
function setCookie (window,name,value) {
    const assignment = `${name}=${value}`;
    window.document.cookie = assignment;
};

describe('Search links', () => {
    describe('Basic Information', () => {
        before(() => {

            var jigsawLoggedIn = true;
            cy.visitAs('/customers/single-view/6d7ed1a4', AuthRoles.UnrestrictedGroup, jigsawLoggedIn, {
                onBeforeLoad: (window) => setCookie(window, 'searchResidentPath', '/search?firstName=Luna&lastName=Kitty')
            });
            cy.intercept('GET', '**/customers*', { fixture: 'person-profile.json' }).as('getPerson');           
        })

        it('displays the Back to search results button and loads search page with pre-populated fields', () => {
            cy.get('#back-to-search', { timeout: 10000 }).should('be.visible');

            cy.get('#back-to-search').first().click({ force: true });
            
            cy.location().should((location) => {
                expect(location.pathname).to.eq('/search');
                expect(location.search).to.eq('?firstName=Luna&lastName=Kitty');
            });

            cy.get('#firstName').should('have.value', 'Luna');
            cy.get('#lastName').should('have.value', 'Kitty');
        });

        it('displays the new search button and loads search page with empty fields', () => {
            var jigsawLoggedIn = true;
            cy.visitAs('/customers/single-view/6d7ed1a4', AuthRoles.UnrestrictedGroup, jigsawLoggedIn);

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
