import {AuthRoles, JigsawStatuses} from '../support/commands';
import {profilePage} from '../pages/profile/profile-page';

describe('Shared Plans', () => {
	describe('No Plans Found', () => {
		beforeEach(() => {
			cy.fixture('person-profile.json').then(personFixture => {
				personFixture.sharedPlan = {};
				personFixture.sharedPlan.planIds = [];
				cy.intercept('GET', '**/customers*', personFixture);
			})
			cy.intercept('POST',"**sharedPlan**", {fixture: "shared-plan-creation.json"}).as("PostCreateSharedPlan")
			profilePage.visit(AuthRoles.UnrestrictedGroup, JigsawStatuses.Dismissed)
		});

		it('prompts to create a plan', () => {
			profilePage.elements.getSharedPlans()
				.should('have.text', "NO PLAN FOUND - Create Shared Plan");
		});

		// TODO: Test that correct link in href
		it('creates proper request for shared plan', () => {
			profilePage.elements.getCreateSharedPlanButton().click()
			cy.wait("@PostCreateSharedPlan", {requestTimeout: 10000}).should((obj) => {
				const requestBody = obj.request.body;
				let expectedSystemIds = [
					"e749f036-3183-49cb-8504-59b76c1a8f88",
					"1234",
					"34596507",
					"34596507"
				];
				expect(requestBody.firstName).to.eq("Luna");
				expect(requestBody.lastName).to.eq("Kitty");
				requestBody.systemIds.forEach((systemId, index) => {
					expect(systemId).to.eq(expectedSystemIds[index])
				});
				expect(requestBody.numbers.length).to.eq(0);
				expect(requestBody.emails.length).to.eq(0);
				expect(requestBody.hasPhp).to.eq(false);
			})
		});
	});
});

describe('Plans Found', () => {
	before(() => {
		cy.fixture('person-profile.json').then(personFixture => {
			personFixture.sharedPlan = {};
			personFixture.sharedPlan.planIds = ["plan1", "plan2"];
			cy.intercept('GET', '**/customers*', personFixture);
		})
		profilePage.visit(AuthRoles.UnrestrictedGroup, JigsawStatuses.Dismissed)
	})

	it('displays shared plans', () => {
		profilePage.elements.getSharedPlans()
			.should('have.text', "NO PLAN FOUND - Create Shared Plan");
	});
});
