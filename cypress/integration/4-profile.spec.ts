import { AuthRoles } from '../support/commands';
import { profilePage } from '../pages/profile-page';

describe('Profile', () => {
	describe('Basic Information', () => {
		before(() => {
			var jigsawLoggedIn = false;
			profilePage.visit(AuthRoles.UnrestrictedGroup, jigsawLoggedIn)

			cy.intercept('GET', '**/customers*', { fixture: 'person-profile.json' }).as('getPerson');
		});

		it('displays the profile tab', () => {
			profilePage.elements.getProfileTab()
				.should('be.visible')
		});

		it('displays jigsaw login error', () => {
			profilePage.elements.getJigsawLoginErrorBanner()
				.should('have.text', "Warning");
		});

		it('displays cautionary alert warning title', () => {
			profilePage.elements.getCautionaryAlertWarningTitle()
				.should('have.text', "Warning: Risk to adults");
		});

		it('displays cautionary alert warning message', () => {
			profilePage.elements.getCautionaryAlertWarningMessage()
				.should('have.text', "Added 01 Mar 2018 by Luna Purry. Last reviewed 01 Feb 2020.");
		});

		it('displays name', () => {
			profilePage.elements.getName()
				.should('have.text', "Miss Luna Kitty");
		});

		it('displays preferred name', () => {
			profilePage.elements.getPreferredName()
				.should('have.text', "Miss Luna Purrple");
		});

		it('displays date of birth', () => {
			profilePage.elements.getDateOfBirth()
				.should('have.text', "01/02/1980");
		});

		it('displays contact details', () => {
			const contactDetail = profilePage.elements.getContactDetail()
			contactDetail.getContactType()
				.should('have.text', "phone (mobile)");
			contactDetail.getDescription()
				.should('have.text', " - Personal phone:");
			contactDetail.getValue()
				.should('have.text', "(07700) 900 557");
			contactDetail.getDataSource()
				.should('have.text', "Data Source: PersonAPI");
		});

		it('displays tenure', () => {
			const tenure = profilePage.elements.getTenure()
			tenure.getFullAddress()
				.should('have.text', "123 Cute Street, M3 0W");
			tenure.getStartDate()
				.should('have.text', "Start date: 10/06/1996");
			tenure.getEndDate()
				.should('have.text', "End date: 22/07/1999");
			tenure.getDataSource()
				.should('have.text', "Data Source: PersonAPI");
		});

		it('displays types', () => {
			profilePage.elements.getTypes()
				.should('have.text', "HouseholdMember");
		});

		it('displays place of birth', () => {
			profilePage.elements.getPlaceOfBirth()
				.should('have.text', "Not known");
		});

		it('place of birth is greyed out', () => {
			profilePage.elements.getPlaceOfBirth()
				.should('have.class', 'sv-null-field');
		})

		it('displays date of death', () => {
			profilePage.elements.getDateOfDeath()
				.should('have.text', "Not known");
		});

		it('date of death is greyed out', () => {
			profilePage.elements.getDateOfDeath()
				.should('have.class', 'sv-null-field');
		})

		it('displays is a minor', () => {
			profilePage.elements.getIsMinor()
				.should('have.text', "N");
		});

		it('displays pregnancy due date', () => {
			profilePage.elements.getPregnancyDueDate()
				.should('have.text', "25/12/2022")
		});

		it('displays accommodation type', () => {
			profilePage.elements.getAccommodationType()
				.should('have.text', 'N/A');
		});

		it('displays housing circumstance', () => {
			profilePage.elements.getHousingCircumstance()
				.should('have.text', 'Temporary accommodation');
		});

		it('displays is settled', () => {
			profilePage.elements.getIsSettled()
				.should('have.text', 'N');
		});

		it('displays support worker', () => {
			profilePage.elements.getSupportWorker()
				.should('have.text', 'James Brown 02083568440 james.brown@hackney.gov.uk');
		});

		it('displays gender', () => {
			profilePage.elements.getGender()
				.should('have.text', 'Female');
		});

		it('displays System id\'s', () => {
			const systemIds = profilePage.elements.getSystemIds()
			systemIds.getPersonApiId()
				.should('have.text', "e749f036-3183-49cb-8504-59b76c1a8f88");
			systemIds.getJigsawId()
				.should('have.text', "1234");
			systemIds.getAcademyCtaxId()
				.should('have.text', "34596507");
		});

		it('displays Council Tax Information', () => {
			const ctaxInfo = profilePage.elements.getCtaxInfo()
			ctaxInfo.getAccountRef()
				.should('have.text', "34596507");
			ctaxInfo.getAccountBalance()
				.should('have.text', "15465");
			ctaxInfo.getPaymentMethod()
				.should('have.text', "Direct Debit");
			ctaxInfo.getPropertyAddress()
				.should('have.text', "123 Fake Street Springfield USA  SW19 1AA");
		});

		it('displays equality information', () => {
			const equalityInformation = profilePage.elements.getEqualityInformation()
			equalityInformation.getGender()
				.should('have.text', 'm');
			equalityInformation.getGenderDifferentAtBirth()
				.should('have.text', 'yes');
			equalityInformation.getEthnicity()
				.should('have.text', 'blackOrBlackBritish');
			equalityInformation.getReligionOrBelief()
				.should('have.text', 'atheistOrNoReligiousBelief');
			equalityInformation.getMarried()
				.should('have.text', 'yes');
			equalityInformation.getCivilPartnership()
				.should('have.text', 'no');
			equalityInformation.getPregnancyOrMaternity()
				.should('have.length', 1);
			equalityInformation.getDisabled()
				.should('have.text', 'yes');
			equalityInformation.getCommunicationRequirements().children()
				.should('have.length', 3);
			equalityInformation.getCommunicationRequirements().children().first()
				.should('have.text', 'Communication requirement-1');
		});

		it('displays housing benefits landlord details', () => {
			const landlordDetails = profilePage.elements.getLandlordDetails()
			landlordDetails.getLandLordName()
				.should('have.text', 'ABC FAKE HOUSING TRUST')
			landlordDetails.getLandlordAddress()
				.should('have.text', '111 UPPER ABC RD, LONDON,   E5 9SA')
		});

	});

})
