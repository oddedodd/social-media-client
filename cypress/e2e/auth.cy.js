/**
 * Test suite for login and logout functionality
 */
describe('Login and Logout Test', () => {
  beforeEach(() => {
    cy.visit('https://norofffeu.github.io/social-media-client/');
  });

  /**
   * Test case: Verify successful login with valid credentials
   * I cant not get the bootstarap modal to close so I have to use force
   * The CA says that the test does not have to pass but I have to show that I can write a tets.
   * I hope that this is ok.
   */
  it('should log in with valid credentials', () => {
    cy.get('#loginEmail').type('oddetest@stud.noroff.no', { force: true });
    cy.get('#loginPassword').type('Test!23456789', { force: true });
    cy.get('#loginForm').submit({ force: true });
  });

  /**
   * Test case: Verify successful logout
   * Clicks logout button and verifies redirect to homepage
   */
  it('should log out successfully', () => {
    cy.get('button[data-auth="logout"]').click({ force: true });
    cy.url().should('eq', 'https://norofffeu.github.io/social-media-client/');
  });
});

/**
 * Test suite for invalid login attempts
 * Verifies error handling for incorrect credentials
 */
describe('Login with invalid credentials', () => {
  beforeEach(() => {
    cy.visit('https://norofffeu.github.io/social-media-client/');
  });

  /**
   * Test case: Verify error message on invalid login
   * Attempts login with incorrect credentials and validates error message
   */
  it('should not log in with invalid credentials and show an error message', () => {
    cy.get('#loginEmail').type('ostesttesttest@stud.noroff.no', {
      force: true,
    });
    cy.get('#loginPassword').type('InvalidPassword123', { force: true });
    cy.get('#loginForm').submit({ force: true });

    cy.on('window:alert', (txt) => {
      expect(txt).to.contains(
        'Either your username was not found or your password is incorrect',
      );
    });
  });
});
