/// <reference types="cypress" />

context('Actions', () => {
    beforeEach(() => cy.visit('emits.html'));

    it('composition api $emits works', () => {
        cy.get('#app-container').contains('hello from composition api via myEvent')
        cy.get('#app-container').contains('hello from composition api via my-event')
    })

    it('options api this.$emits works', () => {
        cy.get('#app-container').contains('hello from options api via myEvent')
        cy.get('#app-container').contains('hello from options api via my-event')
    })

});