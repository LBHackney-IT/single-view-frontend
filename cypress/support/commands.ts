// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import { sign } from 'jsonwebtoken';

const dateToUnix = (date: Date): number => Math.floor(date.getTime() / 1000);

const makeToken = ({
  sub = '49516349857314',
  email = 'test@hackney.gov.uk',
  iss = 'Hackney',
  name = 'Testy McTestface',
  groups = ['test-group'],
  iat = new Date(),
}) =>
  sign(
    { sub, email, iss, name, groups, iat: dateToUnix(iat) },'HACKNEY_JWT_SECRET'
  );

export enum AuthRoles {
  UnrestrictedGroup = 'UnrestrictedGroup',
  RestrictedGroup = 'RestrictedGroup',
}

const roleConfigurations: Record<AuthRoles, Array<string>> = {
  UnrestrictedGroup: [Cypress.env('AUTH_ALLOWED_GROUPS')],
  // UnrestrictedGroup: [Cypress.env('AUTH_ALLOWED_GROUPS')],
  RestrictedGroup: []
};

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      visitAs: typeof visitAs;
    }
  }
}

/**
 * Visit the given url
 *
 * @param {string} url The URL to visit. If relative uses `baseUrl`
 * @param {AuthRoles} role The user role to act as for this request
 * @param {VisitOptions} [options] Pass in an options object to change the default behavior of the underlying `cy.visit()` call
 * @example
 *    cy.visitAs('http://localhost:3000', AuthRoles.ChildrensGroup)
 *    cy.visitAs('/somewhere' AuthRoles.AdultsGroup) // opens ${baseUrl}/somewhere
 *    cy.visitAs('/' AuthRoles.AdminDevGroup, {
 *      method: 'POST'
 *    })
 *
 */
const visitAs = (
  url: string,
  role: AuthRoles,
  options?: Partial<Cypress.VisitOptions>
) => {
  cy.clearCookies();  
  cy.setCookie(
    'hackneyToken',
    makeToken({
      groups: roleConfigurations[role],
    })
    
  );
  cy.getCookie('hackneyToken').should(
    'have.property',
    'value',
    makeToken({
      groups: roleConfigurations[role],
    })
  );

  cy.visit(url, options);
};

Cypress.Commands.add('visitAs', visitAs);
