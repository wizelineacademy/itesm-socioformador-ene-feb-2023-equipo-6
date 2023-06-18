describe("Add and delete a question", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/admin");
    cy.wait(200);
  });
  it("Evaluate page", () => {
    cy.get(".text-white").contains("Question").click();
    let minValue = "30";
    let maxValue = "60";
    let val = "5";
    let description = "ADD_TEST";
    let instruction = "ADD_TEST";
    cy.get("button").contains("Add").click();
    cy.get("select#category").select("English");
    cy.get("input#minTime").clear().type(minValue);
    cy.get("input#maxTime").clear().type(maxValue);
    cy.get("input#value").clear().type(val);
    cy.get("input#description").clear().type(description);
    cy.get("textarea#instruction").clear().type(instruction);
    cy.get(".items-center > .bg-wizeblue-100").contains("Add").click();
    cy.wait(2000);
    cy.reload();
    cy.get("table")
      .find("tr")
      .then((rows) => {
        const rowCount = rows.length - 1;
        cy.get("tr").eq(rowCount).find("button").click();
        cy.on("window:alert", (message) => {
          cy.get("button").contains("Aceptar").click();
        });
      });
  });
});
