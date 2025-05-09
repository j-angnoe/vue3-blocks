/// <reference types="cypress" />

context('Actions', () => {
    
    it('vue3-blocks umd mode has an automount feature', () => {
        cy.visit('vue3-bundle-umd-automount.html');
        cy.get('#app-container app').should('contain', 'Vue App (UMD) is mounted: hello from vue')
        cy.get('#app-container app').should('contain', 'router works')
    })

    it('vue3-blocks umd automount is disabled when you mount yourself', () => {
        cy.visit('vue3-bundle-umd-mount-yourself.html');
        cy.get('#app-container app').should('contain', 'Show this custom mounted app instead (UMD).')
        cy.get('#app-container app').should('contain', 'with this component')
        cy.get('#app-container app').should('contain', 'router works')
    })

    it('vue3-blocks esm works as expected.', () => {
        cy.visit('vue3-bundle-esm.html');
        cy.get('#app-container app').should('contain', 'Vue App (ESM) is mounted: hello from vue')
        cy.get('#app-container app').should('contain', 'with this component')
        cy.get('#app-container app').should('contain', 'router works')
    })
});