describe("Session Testing", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });
  it("Wizeline header exists", () => {
    cy.get(".text-white").contains("WIZELINE");
  });
  it("Login button exists", () => {
    cy.get(".text-white").contains("Log In");
  });
  it("Input exists", () => {
    cy.get('input');
  });
});