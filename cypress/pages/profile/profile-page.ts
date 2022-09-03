import { BasePersonPage } from "../base/base-person-page"

class ProfilePage extends BasePersonPage {

	constructor(pageUrl: string = "/customers/single-view/6d7ed1a4") {
		super(pageUrl = pageUrl)
	}

	elements = {
		...this.basePersonElements,
		getProfileTab: () => cy.get('#profile'),
		getJigsawLoginErrorBanner: () => cy.get('[data-testid="jigsawInformationNotDisplayedBanner"]'),
		getCautionaryAlertWarningTitle: () => cy.get('[data-testid="cautionaryAlert-alertCode"]'),
		getCautionaryAlertWarningMessage: () => cy.get('[data-testid="cautionaryAlert-alertMessage"]'),

		getName: () => cy.get('[data-testid="name"]'),
		getPreferredName: () => cy.get('[data-testid="preferredName"]'),
		getDateOfBirth: () => cy.get('[data-testid="dateOfBirth"]'),

		getContactDetail: function() {
			return {
				getContactType: () => cy.get('[data-testid="contactDetailsContactType"]'),
				getDescription: () => cy.get('[data-testid="contactDetailsDescription"]'),
				getValue: () => cy.get('[data-testid="contactDetailsValue"]'),
				getDataSource: () => cy.get('[data-testid="contactDetailsDataSource"]')
			}
		},

		getTenure: function() {
			return {
				getFullAddress: () => cy.get('[data-testid="tenureFullAddress"]'),
				getStartDate: () => cy.get('[data-testid="tenureStartDate"]'),
				getEndDate: () => cy.get('[data-testid="tenureEndDate"]'),
				getDataSource: () => cy.get('[data-testid="tenureDataSource"]')
			}
		},
		
		getTypes: () => cy.get('[data-testid="types"]'),
		getPlaceOfBirth: () => cy.get('[data-testid="placeOfBirth"]'),
		getDateOfDeath: () => cy.get('[data-testid="dateOfDeath"]'),
		getIsMinor: () => cy.get('[data-testid="isMinor"]'),
		getPregnancyDueDate: () => cy.get('[data-testid="pregnancyDueDate"]'),
		getAccommodationType: () => cy.get('[data-testid="accommodationType"]'),
		getHousingCircumstance: () => cy.get('[data-testid="housingCircumstance"]'),
		getIsSettled: () => cy.get('[data-testid="isSettled"]'),
		getSupportWorker: () => cy.get('[data-testid="supportWorker"]'),
		getGender: () => cy.get('[data-testid="gender"]'),

		getSystemIds: function() {
			return {
				getPersonApiId: () => cy.get('[data-testid="PersonApi"]'),
				getJigsawId: () => cy.get('[data-testid="Jigsaw"]'),
				getAcademyCtaxId: () => cy.get('[data-testid="Academy-CouncilTax"]'),
			}
		},

		getCtaxInfo: function() {
			return {
				getAccountRef: () => cy.get('[data-testid="accountRef"]'),
				getAccountBalance: () => cy.get('[data-testid="accountBalance"]'),
				getPaymentMethod: () => cy.get('[data-testid="paymentMethod"]'),
				getPropertyAddress: () => cy.get('[data-testid="propertyAddress"]')
			}
		},

		getEqualityInformation: function() {
			return {
				getGender: () => cy.get('[data-testid="equalityInformationGender"]'),
				getGenderDifferentAtBirth: () => cy.get('[data-testid="genderDifferentAtBirth"]'),
				getEthnicity: () => cy.get('[data-testid="ethnicity"]'),
				getReligionOrBelief: () => cy.get('[data-testid="religionOrBelief"]'),
				getMarried: () => cy.get('[data-testid="married"]'),
				getCivilPartnership: () => cy.get('[data-testid="civilPartnership"]'),
				getPregnancyOrMaternity: () => cy.get('[data-testid="pregnancyOrMaternity"]'),
				getDisabled: () => cy.get('[data-testid="disabled"]'),
				getCommunicationRequirements: () => cy.get('[data-testid="communicationRequirements"]')
			}
		},

		getLandlordDetails: function() {
			return {
				getLandLordName: () => cy.get('[data-testid="landLordName"]'),
				getLandlordAddress: () => cy.get('[data-testid="landlordAddress"]')
			}
		},
	}

}

export const profilePage = new ProfilePage();
