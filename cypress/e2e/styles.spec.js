/// <reference types="cypress" />

context('Actions', () => {
    beforeEach(() => {
        cy.visit('styles.html');
    })
    // https://on.cypress.io/interacting-with-elements
  
    it('is on the components page', () => {
        cy.get('title').should('contain', 'Vue Blocks (vue3) Styles')
    });

    it('global styling works', () => {
        cy.get('#app-container .global-style-component').should('have.css', 'color', 'rgb(0, 128, 0)')
    });
    
    it('scoped styling works', () => {
        cy.get('#app-container .scoped-style-component').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
    it('root:after works', () => {
        cy.get('#app-container .root-after-component').should('have.css', 'color', 'rgb(0, 0, 255)')
    })    
});