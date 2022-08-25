import { AuthRoles } from '../support/commands';

describe('Back to search', () => {
    describe('Basic Information', () => {
        before(() => {
            cy.intercept('GET', '**/customers*', { fixture: 'person-profile.json' }).as('getPerson');
            cy.visitAs('/customers/single-view/6d7ed1a4', AuthRoles.UnrestrictedGroup);
            cy.setCookie('jigsawToken', 'testValue')
            cy.setCookie('searchResidentPath', '/search?firstName=Luna&lastName=Kitty');
        })

        it('displays the Back to search button', () => {
            cy.get('#back-to-search', { timeout: 10000 }).should('be.visible');

            cy.get('#back-to-search').first().click({ force: true });
            
            cy.location().should((location) => {
                expect(location.pathname).to.eq('/search');
                expect(location.search).to.eq('?firstName=Luna&lastName=Kitty');
            });

            cy.get('#firstName').should('have.value', 'Luna');
            cy.get('#lastName').should('have.value', 'Kitty');
        });

        it('displays the new search button', () => {
            cy.visitAs('/customers/single-view/6d7ed1a4', AuthRoles.UnrestrictedGroup);
            cy.setCookie('jigsawToken', 'testValue')

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
