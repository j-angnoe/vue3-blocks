/// <reference types="cypress" />

context('Actions', () => {
  
    // https://on.cypress.io/interacting-with-elements
  
    it('webserver is working properly', () => {
        cy.visit('basics.html');
        cy.get('title').should('contain', 'Vue Blocks (vue3) Basics')
    });

    it('vue blocks is loaded property', () => {
        cy.visit('basics.html');
        cy.get('#app-container').should('contain', 'This is the Vue App')
    });
    
    it('component 1 is properly loaded', () => {
        cy.visit('basics.html');
        cy.get('#app-container').should('contain', 'Content for component 1')
    })

    it('component 1 shows a vue variable', () => {
        cy.visit('basics.html');
        cy.get('#app-container').should('contain', 'Test variable display: my message')
    })
});