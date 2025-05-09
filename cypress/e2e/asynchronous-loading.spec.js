
context('Actions', () => {
    beforeEach(() => {
        cy.visit('asynchronous-loading.html')
    })
    // https://on.cypress.io/interacting-with-elements
  
    it('webserver is working properly', () => {
        cy.get('title').should('contain', 'Vue Blocks (vue3) Asynchronous loading')
    });

    it('can load a vue sfc file from server', () => {
        cy.get('#load-async-sfc-file').should('contain', 'Success: Showing async-sfc-file')
    });
    
    it('can load an entire vue-blocks module (file)', () => {
        cy.get('#load-async-module').should('contain', 'This is module 1 component 1')
        cy.get('#load-async-module').should('contain', 'This is module 1 component 2')
        
        // async vue-block files can also asynchronously load sfc files
        // and reuse already loaded sfc-files.
        cy.get('#load-async-module').should('contain', 'Success: Showing async-sfc-file')
    });
    
    it('relative paths inside externally loaded resources are handled properly', () => {
        // module2-component1 is shown
        cy.get('#load-async-relative-paths').should('contain', 'This should be color green')
        
        // and it should have color green, defined by a stylesheet which is linked relatively.
        cy.get('#load-async-relative-paths .module2').should('have.css', 'color', 'rgb(0, 128, 0)')
        
        // if the external module references relative modules, those will be resolved correctly.
        cy.get('#load-async-relative-paths').should('contain', 'itWorks can be loaded: it works')

    });
});
