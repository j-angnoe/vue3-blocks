/// <reference types="cypress" />

context('Actions', () => {
    beforeEach(() => cy.visit('props.html'));

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