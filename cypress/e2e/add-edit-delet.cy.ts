describe('App', () => {
  it('should open the site, create a request, edit it, delete it, and go to All Requests tab', () => {
    cy.visit('http://localhost:5173/');
    cy.title().should('eq', 'Holiday Manager');

    // Click on the Create Request tab
    cy.contains('Create Request').click();

    // Fill in the form and submit
    cy.get('input[name="titleInput"]').type('Generic Title');
    cy.get('input[name="descriptionInput"]').type('Generic Description');
    cy.get('input[name="dateInput"]').click();
    cy.contains('Today').click();
    cy.get('input[name="locationInput"]').type('Generic Location');
    cy.get('input[name="participantsInput"]').type('Generic Participants');
    cy.contains('Submit').click();

    // Go to All Requests tab
    cy.contains('All Requests').click();

    // Find the created request in the table and edit it
    cy.contains('tr', 'Generic Title').within(() => {
      cy.contains('Edit').click();
    });

    // Edit the request
    cy.get('input[name="titleInputModal"]').clear().type('Edited Title');
    cy.get('input[name="descriptionInputModal"]').clear().type('Edited Description');
    cy.get('input[name="dateInputModal"]').clear().type('02/23/2026');
    cy.get('input[name="locationInputModal"]').clear().type('Edited Location');
    cy.get('input[name="participantsInputModal"]').clear().type('Edited Participants');
    cy.contains('OK').click();

    // Delete the edited request
    cy.contains('tr', 'Edited Title').within(() => {
      cy.contains('Delete').click();
    });
  });
});
