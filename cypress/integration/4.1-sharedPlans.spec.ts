import { AuthRoles, JigsawStatuses } from '../support/commands';
import { profilePage } from '../pages/profile/profile-page';

describe('Shared Plans', () => {
	describe('No Plans Found', () => {
		before(() => {
			profilePage.visit(AuthRoles.UnrestrictedGroup, JigsawStatuses.Dismissed)

      cy.fixture('person-profile.json').then(personFixture => {
        personFixture.sharedPlans = [];
        cy.intercept('GET', '**/customers*', personFixture);
      })
			
		});

		it('prompts to create a plan', () => {
			profilePage.elements.getSharedPlans()
				.should('have.text', "NO PLAN FOUND - Create Shared Plan");
		});

	});

  describe('Plans Found', () => {
		before(() => {
			profilePage.visit(AuthRoles.UnrestrictedGroup, JigsawStatuses.Dismissed)

			cy.fixture('person-profile.json').then(personFixture => {
        personFixture.sharedPlans = ["plan1", "plan2"];
        cy.intercept('GET', '**/customers*', personFixture);
      })
      })
		});

		it('displays shared plans', () => {
			profilePage.elements.getSharedPlans()
				.should('have.text', "NO PLAN FOUND - Create Shared Plan");
		});

	});

  describe('Plans Found', () => {
		before(() => {
			profilePage.visit(AuthRoles.UnrestrictedGroup, JigsawStatuses.Dismissed)

			cy.fixture('person-profile.json').then(personFixture => {
        personFixture.sharedPlans = ["plan1", "plan2"];
        cy.intercept('GET', '**/customers*', personFixture);
      })
      })
		});

		it('displays shared plans', () => {
			profilePage.elements.getSharedPlans()
				.should('have.text', "NO PLAN FOUND - Create Shared Plan");
		});

	});

})
