describe('Search 1', () => {
    it('Search string in question text', () => {
        const qTitles = ['android studio save string shared preference, start activity and load the saved string'];
        cy.visit('http://localhost:8000');
        cy.get('#searchBar').type('navigation{enter}');
        cy.get('.postTitle').each(($el, index, $list) => {
            cy.wrap($el).should('contain', qTitles[index]);
        })
    })
})

describe('Search 2', () => {
    it('Search string matches tag and text', () => {
        const qTitles = ['android studio save string shared preference, start activity and load the saved string', "Programmatically navigate using React router"];
        cy.visit('http://localhost:8000');
        cy.get('#searchBar').type('navigation [React]{enter}');
        cy.get('.postTitle').each(($el, index, $list) => {
            cy.wrap($el).should('contain', qTitles[index]);
        })
    })
})

describe('Search 3', () => {
    it('Output of the search should be in newest order by default', () => {
        const qTitles = ['android studio save string shared preference, start activity and load the saved string', "Programmatically navigate using React router"];
        cy.visit('http://localhost:8000');
        cy.get('#searchBar').type('android [react]{enter}');
        cy.get('.postTitle').each(($el, index, $list) => {
            cy.wrap($el).should('contain', qTitles[index]);
        });
    });
});

describe('Search 4', () => {
    it('Output of the search should show number of results found', () => {
        const qTitles = ["Programmatically navigate using React router", 'android studio save string shared preference, start activity and load the saved string'];
        cy.visit('http://localhost:8000');
        cy.get('#searchBar').type('android [react]{enter}');
        cy.contains(qTitles.length+" questions");
    });
});

describe('Search 5', () => {
    it('Output of the empty search should show all results ', () => {
        const qTitles = ["Programmatically navigate using React router", 'android studio save string shared preference, start activity and load the saved string'];
        cy.visit('http://localhost:8000');
        cy.get('#searchBar').type('{enter}');
        cy.contains(qTitles.length+" questions");
    });
});

describe('Search 6', () => {
    it('Search string with non-existing tag and non-tag word', () => {
        cy.visit('http://localhost:8000');
        cy.get('#searchBar').type('[NonExistingTag] nonexistingword{enter}');
        cy.contains('No Questions Found');
    });
});

describe("Search 7", () => {
    it("Search a question by tag case insensitive", () => {
      const qTitles = [
        "android studio save string shared preference, start activity and load the saved string",
        "Programmatically navigate using React router",
      ];
      cy.visit("http://localhost:8000");
      cy.get("#searchBar").type("[JavaScript]{enter}");
      cy.get(".postTitle").each(($el, index, $list) => {
        cy.wrap($el).should("contain", qTitles[index]);
      });
    });
  });

  describe("Search 8", () => {
    it("Search for a question using a tag that does not exist", () => {
      const nonExistentTag = "nonExistingTag";
  
      cy.visit("http://localhost:8000");
      cy.get("#searchBar").type(`[nonExistentTag]{enter}`);
      cy.get(".postTitle").should("have.length", 0);
    });
  });