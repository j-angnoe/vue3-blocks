/// <reference types="cypress" />

context('Actions', () => {
    function navigate(url) {
        var baseUrl = 'http://localhost:8080/cypress/e2e/';
        url = url || '';
        cy.visit(baseUrl + url);
    }
  
    // https://on.cypress.io/interacting-with-elements
  
    it('webserver is working properly', () => {
        navigate('basics.html');
        cy.get('title').should('contain', 'Vue Blocks (vue3) Basics')
    });

    it('vue blocks is loaded property', () => {
        navigate('basics.html');
        cy.get('#app-container').should('contain', 'This is the Vue App')
    });
    
    it('component 1 is properly loaded', () => {
        navigate('basics.html');
        cy.get('#app-container').should('contain', 'Content for component 1')
    })

    it('component 1 shows a vue variable', () => {
        navigate('basics.html');
        cy.get('#app-container').should('contain', 'Test variable display: my message')
    })
});