describe("Edit a Question", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/admin");
    cy.wait(200);
  });
  it("Edit question", () => {
    cy.get(".text-white").contains("Question").click();
    cy.get('a[href="/admin/questions/7"]').click();
    cy.get("[id='category']").select("English");
    cy.get("input#minTime").clear().type("100");
    cy.get("input#maxTime").clear().type("180");
    cy.get("input#value").clear().type("7");
    cy.get("input#description").clear().type("DESCRIPTION_TEST");
    cy.get("textarea#instruction").clear().type("INSTRUCTION_TEST");
    cy.get("button").contains("Update").click();
    cy.wait(2500);
    cy.reload();
  });
  it('Deletes Question', () => {
    cy.visit("http://localhost:3000/admin/questions")
    cy.contains('ADD_TEST')
      .parents('tr')
      .find('button')
      .click()
    cy.wait(1000);
    cy.reload();  })
});