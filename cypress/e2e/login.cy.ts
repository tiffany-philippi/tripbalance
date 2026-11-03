describe('User login', () => {
  context('Login', () => {
    beforeEach(() => {
      cy.intercept('POST', '**/auth/v1/token*').as('signIn');
      cy.visit('/login');
    })

    it('Should show login form', () => {
      cy.dataCy('login-email').should('be.visible');
      cy.dataCy('login-password').should('be.visible');
      cy.dataCy('login-submit').should('be.visible');
    })

    it('Should login with valid credentials', () => {
      cy.login();
    })

    it('Should not login with invalid credentials', () => {
      cy.fillLogin('invalid-email@email.com', 'invalid-password');
      cy.dataCy('login-submit').click();
      cy.wait('@signIn').its('response.statusCode').should('eq', 400);
      cy.url().should('include', '/login');
      cy.contains('Invalid email or password').should('be.visible');
    })

    it('Should not login with empty fields', () => {
      cy.dataCy('login-submit').click();
      cy.url().should('include', '/login');
      cy.contains('Fill in all fields before continuing').should('be.visible');
      cy.get('@signIn.all').should('have.length', 0);
    })

    it('Should not login with invalid email format', () => {
      cy.fillLogin('invalid-email', 'any-password');
      cy.dataCy('login-submit').click();
      cy.url().should('include', '/login');
      cy.contains('Fill in all fields before continuing').should('be.visible');
      cy.get('@signIn.all').should('have.length', 0);
    })

    it('Should not login with only email filled', () => {
      cy.fillLogin('valid-email@email.com', '');
      cy.dataCy('login-submit').click();
      cy.url().should('include', '/login');
      cy.contains('Fill in all fields before continuing').should('be.visible');
      cy.get('@signIn.all').should('have.length', 0);
    })

    it('Should not login with only password filled', () => {
      cy.fillLogin('', 'any-password');
      cy.dataCy('login-submit').click();
      cy.url().should('include', '/login');
      cy.contains('Fill in all fields before continuing').should('be.visible');
      cy.get('@signIn.all').should('have.length', 0);
    })

    it('Should disable submit button while signing in', () => {
      cy.intercept('POST', '**/auth/v1/token*', (req) => {
        req.on('response', (res) => res.setDelay(1000));
      }).as('delayedSignIn');

      cy.fillLogin('invalid-email@email.com', 'invalid-password');
      cy.dataCy('login-submit').click();
      cy.dataCy('login-submit').should('have.attr', 'disabled');
      cy.wait('@delayedSignIn');
      cy.dataCy('login-submit').should('not.have.attr', 'disabled');
    })
  })

  context('Session', () => {
    it('Should not login without login', () => {
      cy.visit('/home');
      cy.url().should('include', '/login');
    })

    it('Should redirect root to login without login', () => {
      cy.visit('/');
      cy.url().should('include', '/login');
    })

    it('Should keep user on home after reload', () => {
      cy.login();
      cy.visit('/home');
      cy.url().should('include', '/home');
      cy.reload();
      cy.url().should('include', '/home');
    })
  })

  context('Logout', () => {
    beforeEach(() => {
      cy.intercept('POST', '**/auth/v1/logout*').as('signOut');
      cy.login();
      cy.visit('/home');
      cy.url().should('include', '/home');
    })

    it('Should logout and redirect to login', () => {
      cy.dataCy('logout-button').click();
      cy.wait('@signOut').its('response.statusCode').should('eq', 204);
      cy.url().should('include', '/login');
      cy.contains('You have been logged out!').should('be.visible');
    })

    it('Should not access home after logout', () => {
      cy.dataCy('logout-button').click();
      cy.wait('@signOut').its('response.statusCode').should('eq', 204);
      cy.url().should('include', '/login');
      cy.visit('/home');
      cy.url().should('include', '/login');
    })
  })
})
