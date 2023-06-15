describe("Edit a Question", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/admin");
    cy.wait(200);
  });
  it("Edit question", () => {
    let minValue = "5";
    let maxValue = "45";
    let val = "10";
    let description = "Your routine working at home.";
    let instruction =
      "For this question, listen to the audio and once it has finished answer what has been asked.";
    cy.get(".text-white").contains("Question").click();
    cy.get('a[href="/admin/questions/7"]').click();
    cy.get("select#category").select("English");
    cy.get("input#minTime").clear().type("100");
    cy.get("input#maxTime").clear().type("180");
    cy.get("input#value").clear().type("7");
    cy.get("input#description").clear().type("DESCRIPTION_TEST");
    cy.get("textarea#instruction").clear().type("INSTRUCTION_TEST");
    cy.get("button").contains("Update").click();
    cy.wait(2500);
    cy.reload();
    cy.get('a[href="/admin/questions/7"]').click();
    cy.get("select#category").select("English");
    cy.get("input#minTime").clear().type(minValue);
    cy.get("input#maxTime").clear().type(maxValue);
    cy.get("input#value").clear().type(val);
    cy.get("input#description").clear().type(description);
    cy.get("textarea#instruction").clear().type(instruction);
    cy.get("button").contains("Update").click();
  });
});
