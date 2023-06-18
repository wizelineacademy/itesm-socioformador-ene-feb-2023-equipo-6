describe("Admin main", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/admin");
    cy.wait(200);
  });
  it("Wizetalk logo exists", () => {
    cy.get("img").should("be.visible");
  });
  it("Wizeline header exists", () => {
    cy.get(".text-white").contains("WIZELINE").should("be.visible");
  });
});

describe("Admin Dashboard Testing", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/admin");
    cy.wait(200);
  });
  it("Dasboard button exists", () => {
    cy.get(".text-white").contains("Dashboard").should("be.visible");
  });
  it("Dasboard page link works", () => {
    cy.get(".text-white").contains("Dashboard").click();
    cy.url().should("include", "/admin/dashboard");
  });
});

describe("Admin Questions Testing", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/admin");
    cy.wait(200);
  });
  it("Question button exists", () => {
    cy.get(".text-white").contains("Question").should("be.visible");
  });
  it("Questions page link works", () => {
    cy.get(".text-white").contains("Question").click();
    cy.url().should("include", "/admin/question");
  });
});

describe("Admin Evaluate Testing", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/admin");
    cy.wait(200);
  });
  it("Evaluations button exists", () => {
    cy.get(".text-white").contains("Evaluations").should("be.visible");
  });
  it("Evaluations page link works", () => {
    cy.get(".text-white").contains("Evaluations").click();
    cy.url().should("include", "/admin/evaluate");
  });
  it("Evaluations page title exists", () => {
    cy.get(".text-white").contains("Evaluations").click();
    cy.get("div").contains("Evaluate Users");
  });
  it("Evaluate page table exists", () => {
    cy.get(".text-white").contains("Evaluations").click();
    cy.get("th").contains("Nombre").should("be.visible");
    cy.get("th").contains("Score").should("be.visible");
    cy.get("th").contains("Tipo de Evaluación").should("be.visible");
    cy.get("th").contains("Estado").should("be.visible");
  });
  it("Input search exists", () => {
    cy.get(".text-white").contains("Evaluations").click();
    cy.get("input#simple-search").should("be.visible");
  });
  it("Evaluate page icons exist", () => {
    cy.get(".text-white").contains("Evaluations").click();
    cy.get("button").find("svg").should("be.visible");
  });
});
