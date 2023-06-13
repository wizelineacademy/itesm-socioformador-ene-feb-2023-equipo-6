describe('template spec', () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });
  it("Login access code exists", () => {
    cy.get()
    cy.get(".text-white").contains("WIZELINE");
  });
})