describe("Session Testing", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.wait(200);
  });
  it("Wizeline header exists", () => {
    cy.get(".text-white").contains("WIZELINE").should("be.visible");
  });
  it("Login button exists", () => {
    cy.get(".text-white").contains("Log In").should("be.visible");
  });
  it("Input exists", () => {
    cy.get('input[name="code"]').should("be.visible");
  });
  it("Wizetalk logo exists", () => {
    cy.get("img").should("be.visible");
  });
  it("Login without code", () => {
    cy.get('button[type="submit"]').click();
    cy.get("h2").contains("An error ocurred.");
    cy.url().should("include", "/?index");
  });
  it("Login with code", () => {
    cy.get('input[name="code"]').type("XXXX-1111");
    cy.get('button[type="submit"]').click();
    cy.get("h1").contains("Verify Your Credentials");
    cy.url().should("include", "/evaluation/verifyID");
  });
  it("Back to safety button", () => {
    cy.get('button[type="submit"]').click();
    cy.get("a").contains("safety").click();
    cy.url().should("eq", "http://localhost:3000/");
  });
  it("Test", () => {
    cy.get('input[name="code"]').type("XXXX-5555");
    cy.get('button[type="submit"]').click();
    cy.get("h1").contains("Verify Your Credentials");
    cy.url().should("include", "/evaluation/verifyID");
    cy.get("button").contains("Validate").click();
    cy.wait(1000);
    cy.url().then((url) => {
      if (url.includes("/evaluation/instructions")) {
        cy.get("a").contains("Test Video").should("be.visible");
        cy.get("h1").contains("Instructions").should("be.visible");
        cy.get("ol").should("be.visible");
        cy.get("button").contains("Start Test").click();
        cy.get("h1").contains("Q").should("be.visible");
        cy.get("button").should("be.visible");
        cy.get('input[type="range"]').should("be.visible");
        cy.get("video").should("be.visible");
        cy.get("button").contains("Next").should("be.visible");
        cy.visit("http://localhost:3000/evaluation/results");
      } else if (url.includes("/evaluation/results")) {
        cy.get(".text-white").contains("WIZELINE").should("be.visible");
        cy.get("div").contains("Grammar").should("be.visible");
        cy.get("div").contains("Vocabulary").should("be.visible");
        cy.get("div").contains("Coherance").should("be.visible");
        cy.get("h1").contains("Your results, ").should("be.visible");
        cy.get("h2").contains("Question Scores").should("be.visible");
        cy.get("h2").contains("Soft Skills Detected").should("be.visible");
        cy.get("h2").contains("Overall Score").should("be.visible");
        cy.get("button").contains("End Test").click();
        cy.url().should("eq", "http://localhost:3000/");
      } else {
        // Handle other cases or skip this block if not needed
      }
    });
  });
});
