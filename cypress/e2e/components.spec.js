/// <reference types="cypress" />

context('Actions', () => {
    beforeEach(() => {
        cy.visit('components.html');
    })
    // https://on.cypress.io/interacting-with-elements
  
    it('is on the components page', () => {
        cy.get('title').should('contain', 'Vue Blocks (vue3) Components')
    });

    it('vue3 composition api style components work', () => {
        cy.get('#app-container').should('contain', 'vue3-composition-component: okidoki')
    });
    
    it('vue3 composition api SFC style components work', () => {
        cy.get('#app-container').should('contain', 'vue3-composition-component-variant2: okidoki')
    })
    it('vue3 options api works', () => {
        cy.get('#app-container').should('contain', 'vue3-options-api: okidoki')
    })
    it('vue3 class vue style works', () => {
        cy.get('#app-container').should('contain', 'vue3-class-vue-style: okidoki')
    })

    it('components without script works', () => {
        cy.get('#app-container').should('contain', 'component without script')
    })    
});