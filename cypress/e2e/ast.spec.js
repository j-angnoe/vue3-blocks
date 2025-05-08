/// <reference types="cypress" />

context('Actions', () => {
    function navigate(url) {
        var baseUrl = 'http://localhost:8080/cypress/e2e/';
        url = url || '';
        cy.visit(baseUrl + url);
    }
  
    beforeEach(() => navigate('ast.html'));

    it('script setup works for real', () => {
        cy.get('#app-container').should('contain','variableWithXXX: xxx');
        cy.get('#app-container').should('contain','destructure1: Destructure1value');
        cy.get('#app-container').should('contain','destructure2: Destructure2value');
        cy.get('#app-container').should('contain','toThis: thisShouldBeInToThis');
        cy.get('#app-container').should('contain','myFunctionResult: not clicked');
        
        cy.get('#click-my-function').click();
        cy.get('#app-container').should('contain','myFunctionResult: has been clicked!');
    })
    
    it('script setup should handle defineProps and defineEmits correctly', () => {
        
        cy.get('#app-container').should('contain','Prop een: EEN');
        cy.get('#app-container').should('contain','Prop twee: TWEE');
        cy.get('#app-container').should('contain','emit myEvent from define-emits');
        cy.get('#app-container').should('contain','emit my-event from define-emits');
    })
    
    it('script can import vue components from server', () => {
        cy.get('#app-container').should('contain','Button Counter loaded from server:');
        cy.get('#app-container').should('contain','You clicked me 0 times');
        
        cy.get('#button-counter-action').click();
        cy.get('#app-container').should('contain','You clicked me 1 times');

        cy.get('#button-counter-action').click();
        cy.get('#app-container').should('contain','You clicked me 2 times');
    })
});