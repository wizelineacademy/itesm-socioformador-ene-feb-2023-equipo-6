describe('Session Testing', () => {
  it('Access without Login'), () => {
    cy.visit('http://localhost:3000/evaluation')
    cy.url().should('eq', 'http://localhost:3000/')
    cy.visit('http://localhost:3000/evaluation/instructions')
    cy.url().should('eq', 'http://localhost:3000/')
    cy.visit('http://localhost:3000/evaluation/questions')
    cy.url().should('eq', 'http://localhost:3000/')
    cy.visit('http://localhost:3000/evaluation/results')
    cy.url().should('eq', 'http://localhost:3000/')
  }
})