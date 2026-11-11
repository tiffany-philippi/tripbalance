import 'cypress-real-events/support';
import { environment } from '../../src/environments/environment';

declare global {
    namespace Cypress {
        interface Chainable {
            dataCy(value: string, options?: Partial<Cypress.Loggable & Cypress.Timeoutable & Cypress.Withinable & Cypress.Shadow>): Chainable<JQuery<HTMLElement>>
            login(): Chainable<void>;
            fillLogin(email: string, password: string): Chainable<void>;
        }
    }
}

Cypress.Commands.add('dataCy', (value: string, args?: Partial<Cypress.Loggable & Cypress.Timeoutable & Cypress.Withinable & Cypress.Shadow>) => {
    return cy.get(`[data-cy="${value}"]`, args)
})    

Cypress.Commands.add('fillLogin', (email: string, password: string) => {
    if (email) cy.dataCy('login-email').find('input').type(email);
    if (password) cy.dataCy('login-password').find('input').type(password, { log: false });
});

Cypress.Commands.add('login', () => {
    cy.env(['DEMO_EMAIL', 'DEMO_PASSWORD'], { log: false }).then(({ DEMO_EMAIL, DEMO_PASSWORD }) => {

        cy.session([DEMO_EMAIL], () => {
            cy.intercept('POST', '**/auth/v1/token*').as('signIn');
            cy.visit('/login');
            cy.fillLogin(DEMO_EMAIL, DEMO_PASSWORD);
            cy.dataCy('login-submit').click();
            cy.wait('@signIn').its('response.statusCode').should('eq', 200);
            cy.url().should('include', '/home');
        }, {
            // Logout revokes the session server-side, so a cached one may no longer be valid
            validate() {
                cy.getAllLocalStorage().then((storage) => {
                    const appStorage = storage[Cypress.config('baseUrl')!] ?? {};
                    const tokenKey = Object.keys(appStorage).find((key) => key.endsWith('-auth-token'));
                    const { access_token } = JSON.parse(String(appStorage[tokenKey!] ?? '{}'));

                    cy.request({
                        url: `${environment.supabaseUrl}/auth/v1/user`,
                        headers: { apikey: environment.supabaseKey, Authorization: `Bearer ${access_token}` },
                        log: false,
                    }).its('status').should('eq', 200);
                });
            },
        });
    });
});