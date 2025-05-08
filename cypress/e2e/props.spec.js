/// <reference types="cypress" />

context('Actions', () => {
    function navigate(url) {
        var baseUrl = 'http://localhost:8080/cypress/e2e/props.html';
        url = url || '';
        cy.visit(baseUrl + url);
    }
    beforeEach(() => navigate());

    it('composition api props works', () => {
        cy.get('#app-container').contains('composition api $attrs: {}')
        cy.get('#app-container').contains('composition api setup($props): { "one": "een", "two": "twee" }')
        cy.get('#app-container').contains('composition api $props: { "one": "een", "two": "twee" }')
    })

    it('options api props works', () => {
        cy.get('#app-container').contains('options api $attrs: {}')
        cy.get('#app-container').contains('options api $props: { "one": "een", "two": "twee" }')
    })

});