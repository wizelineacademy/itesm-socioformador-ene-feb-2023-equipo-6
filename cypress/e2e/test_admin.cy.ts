describe('First Test', () => {
  it('Visits Evaluation Page', () => {
    cy.visit('/admin/evaluate')
    cy.get('[id="header"]').should('be.visible')
  })
  it('Selects an Evaluation', () => {
    cy.visit('/admin/evaluate')
    cy.get('table tr').each(($row) => {
      const anchorTag = $row.find('a')
      cy.log(anchorTag.attr('href'))
    })
  })
})