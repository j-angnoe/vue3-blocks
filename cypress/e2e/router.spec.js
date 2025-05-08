/// <reference types="cypress" />

context('Actions', () => {
    function navigate(url) {
        var baseUrl = 'http://localhost:8080/cypress/e2e/';
        url = url || '';
        cy.visit(baseUrl + url);
    }
  
    beforeEach(() => {
        navigate('router.html');
    })

    // https://on.cypress.io/interacting-with-elements
  
    it('webserver is working properly', () => {
        cy.get('title').should('contain', 'Vue Blocks (vue3) Router')
    });

    it('can serve to page 1 and page 2', () => {
        cy.get('#link-to-page-index').click();
        cy.get('#app-container').should('contain', 'This is page 1')
        cy.get('#link-to-page-page2').click();
        cy.get('#app-container').should('contain', 'This is page 2')
    });

    it('subpages work', () => {
        cy.get('#link-to-page-page3').click();
        cy.get('#app-container').should('contain', 'This is page 3 which contains subpages')
        cy.get('#app-container').should('contain', 'Subpage for page 3')
        cy.get('#link-to-subpage-page3-page2').click();
        cy.get('#app-container').should('contain', 'Subpage 2 for page 3 ')
        cy.get('#link-to-subpage-page3-index').click();
        cy.get('#app-container').should('contain', 'Subpage for page 3') 
    });

    it('redirect works', () => {
        cy.get('#link-to-page-index').click();
        cy.get('#app-container').should('contain', 'This is page 1')
        cy.get('#link-to-page-redirect').click();
        cy.get('#app-container').should('contain', 'This is page 4')
    })

    it('page with params registered as props works', () => {
        cy.get('#link-to-page-index').click();
        cy.get('#app-container').should('contain', 'This is page 1');
        cy.get('#link-to-page-page5-with-params').click();
        cy.get('#app-container').should('include.text', 'Page 5 props: {"id":"123"}')
        cy.get('#app-container').should('include.text', 'Page 5 route params: {"id":"123"}')
    })

    // @TODO Page Props

    // @TODO SUBPAGES EN PROPS

});