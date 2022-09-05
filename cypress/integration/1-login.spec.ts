import { loginPage } from "../pages/login-page";
import { searchPage } from "../pages/search-page";

import { AuthRoles, JigsawStatuses } from '../support/commands';

describe('login', () => {
	describe('when not logged in', () => {
		before(() => {
			loginPage.visit()
		})

		it('displays the service name', () => {
			loginPage.elements.getServiceName().should('have.text', 'Single View 2.0')
		})


		it('displays appropriate head link', () => {
			loginPage.elements.getHeadLink().should('have.text', 'Sign in')
		})

		it('displays login button', () => {
			loginPage.elements.getHackneyLoginButton().should('have.text', 'Sign in with Google')
		})

	});

	describe('when logged in with wrong group', () => {
		before(() => {
			searchPage.visit(AuthRoles.RestrictedGroup, JigsawStatuses.None)
		})

		it('displays appropriate head link', () => {
			loginPage.elements.getHeadLink().should('have.text', 'Sign in')
		})

		it('displays an error message', () => {
			loginPage.elements.getErrorMessageTitle().should('have.text', 'You may not have permission to use this service. If this is your first time using Single View, please sign in below.');
			loginPage.elements.getErrorMessageBody().should('have.text', 'To request access please complete this form. Request access');
		})

		it('displays login button', () => {
			loginPage.elements.getHackneyLoginButton().should('have.text', 'Sign in with Google')
		})
	});

	describe('when logged in with appropriate group', () => {
		before(() => {
			loginPage.visit(AuthRoles.UnrestrictedGroup, JigsawStatuses.None)
		})

		it('displays appropriate head link', () => {
			loginPage.elements.getSignOutLink().should('have.text', 'Sign out')
		})

		it('displays the user name', () => {
			loginPage.elements.getUserWelcomeMessage().should('have.text', 'Welcome Testy McTestface')
		})

		it('appropriately redirected to jigsaw login', () => {
			cy.location('pathname').should('eq', '/jigsawLogin')
		});

		describe('when jigsaw login is dismissed', () => {
			it('appropriately redirected to search', () => {

				cy.get('[data-testid="dismiss-jigsaw-login"]').should('have.text', "I don’t have access to Jigsaw.").click();

				cy.location().should((location) => {
					expect(location.pathname).to.eq('/search')
				})
			});
		});
	});
});
