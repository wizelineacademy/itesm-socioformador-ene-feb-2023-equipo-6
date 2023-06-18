import { contains } from "cypress/types/jquery";

describe('Test Evaluation on User', () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/admin/evaluate");
    cy.wait(200);
  });
  it('Visits Evaluation Page', () => {
    cy.get('[id="header"]').should('be.visible')
  })
  it('Test user is filled successfully', () => {
    cy.get('table tr').contains('td', 'Jon Snow').should('be.visible');
  })
  it('Access to user evaluation review', () => {
    cy.contains('Jon Snow')
      .parents('tr')
      .find('a')
      .click()
    cy.url().should("include", "/evaluate/4");
    cy.get('h2').contains('Jon Snow').should('be.visible');
  })
  it('General view of evaluation review load correctly', () => {
    cy.visit("http://localhost:3000/admin/evaluate/4");
    cy.get("div").contains("General Score").should("be.visible");
    cy.get("div").contains("Grammar Grade").should("be.visible");
    cy.get("div").contains("Coherence Grade").should("be.visible");
    cy.get("div").contains("Main Soft Skills").should("be.visible");
    cy.get("button").contains("Question 1").should("be.visible");
    cy.get("button").contains("Question 2").should("be.visible");
    cy.get("p").contains("Question 1").should("be.visible");
    cy.get("span").contains("Question Description").should("be.visible");
    cy.get("button").contains("Show Transcript").should("be.visible");
    cy.get("p").contains("Score").should("be.visible");
    cy.get('button').contains("Save").should("be.visible");
    cy.get('button').contains("Finish Grading").should("be.visible");
    cy.get("p").contains("English Section").should("be.visible");
  })
  it('General score loads correctly', () => {
    cy.visit("http://localhost:3000/admin/evaluate/4");
    cy.get("div").contains("General Score").get("h3").contains("100")
  })
  it('Grammar score loads correctly', () => {
    cy.visit("http://localhost:3000/admin/evaluate/4");
    cy.get("div").contains("Grammar Grade").get("h3").contains("100/100")
  })
  it('Coherance score loads correctly', () => {
    cy.visit("http://localhost:3000/admin/evaluate/4");
    cy.get("div").contains("Grammar Grade").get("h3").contains("100/100")
  })
  it('Softskills load correctly', () => {
    cy.visit("http://localhost:3000/admin/evaluate/4");
    cy.get("div").contains("Main Soft Skills").get("div").contains("Leadership")
  })
  it('Question section loads correctly', () => {
    cy.visit("http://localhost:3000/admin/evaluate/4");
    cy.get("button").contains("Question 3").click();
    cy.get("p").contains("Backend Section").should("be.visible");
  })
  it('Question score loads correctly', () => {
    cy.visit("http://localhost:3000/admin/evaluate/4");
    cy.get("button").contains("Question 2").click();
    cy.get('[name="score"').should("have.value", "10");
  })
  it('Question transcript works correctly', () => {
    cy.visit("http://localhost:3000/admin/evaluate/4");
    cy.get("button").contains("Question 2").click();
    cy.get('button').contains("Show Transcript").click();
    cy.get("p").contains("Transcript").should("be.visible");
    cy.get('button').contains('x').click();
    cy.get('[id = "ev_modal"]').should("not.exist");
  })
  it('Question transcript loads correctly', () => {
    cy.visit("http://localhost:3000/admin/evaluate/4");
    cy.get("button").contains("Question 7").click();
    cy.get('button').contains("Show Transcript").click();
    cy.get("div").contains
      ("So RESTful API design allows you to communicate instance and data between web pages in a much easier and efficient way. And well, it is an excellent method to handle the communication between services, also databases, which is really helpful.")
      .should("be.visible");
  })
  it('Plays loads correctly', () => {
    cy.visit("http://localhost:3000/admin/evaluate/4");
    cy.get('video')
      .should('have.prop', 'paused', true)
      .and('have.prop', 'ended', false)
      .then(($video) => {
        $video[0].play()
      })
  })
  it('Finished Grading', () => {
    cy.visit("http://localhost:3000/admin/evaluate/4");
    cy.get('button').contains("Finish Grading").click();
    cy.url().should("eq", "http://localhost:3000/admin/evaluate");
  })
  it('Evaluation without answers has no score', () => {
    cy.visit("http://localhost:3000/admin/evaluate/21");
    cy.get("div").contains("General Score").get("h3").contains("N/A")
    cy.get("div").contains("Grammar Grade").get("h3").contains("/100")
    cy.get("div").contains("Coherence Grade").get("h3").contains("/100")
    cy.get("div").contains("Main Soft Skills").get("div").contains("N/A")
  })
  it('Evaluation without answers does not display video.', () => {
    cy.visit("http://localhost:3000/admin/evaluate/21");
    cy.get("p").contains("No question was selected or no response has been recorded yet.")
  })
  it('Evaluation without answers cannot be graded.', () => {
    cy.visit("http://localhost:3000/admin/evaluate/21");
    cy.get("button").contains("Finish Grading").should("not.exist");
  })
})