/// <reference types="cypress" />

context('Actions', () => {
    function navigate(url) {
        var baseUrl = 'http://localhost:8080/cypress/e2e/emits.html';
        url = url || '';
        cy.visit(baseUrl + url);
    }
    beforeEach(() => navigate());

    it('composition api $emits works', () => {
        cy.get('#app-container').contains('hello from composition api via myEvent')
        cy.get('#app-container').contains('hello from composition api via my-event')
    })

    it('options api this.$emits works', () => {
        cy.get('#app-container').contains('hello from options api via myEvent')
        cy.get('#app-container').contains('hello from options api via my-event')
    })

});