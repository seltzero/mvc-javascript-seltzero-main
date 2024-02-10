describe('Answer Page 1', () => {
    it('Answer Page displays expected header', () => {
        cy.visit('http://localhost:8000');
        cy.contains('Programmatically navigate using React router').click();
        cy.get('#answersHeader').should('contain', 'Programmatically navigate using React router');
        cy.get('#answersHeader').should('contain', '2 answers');
        cy.get('#answersHeader').should('contain', 'Ask a Question');
        cy.get('#sideBarNav').should('contain', 'Questions');
        cy.get('#sideBarNav').should('contain', 'Tags');
    })
})

describe('Answer Page 2', () => {
    it('Answer Page displays expected question text', () => {
        const text = "the alert shows the proper index for the li clicked, and when I alert the variable within the last function I'm calling, moveToNextImage(stepClicked), the same value shows but the animation isn't happening. This works many other ways, but I'm trying to pass the index value of the list item clicked to use for the math to calculate.";
        cy.visit('http://localhost:8000');
        cy.contains('Programmatically navigate using React router').click();
        cy.get('#questionBody').should('contain', '11 views');
        cy.get('#questionBody').should('contain', text);
        cy.get('#questionBody').should('contain', 'JoJi John');
        cy.get('#questionBody').should('contain', 'Dec 17, 2020');
        cy.get('#questionBody').should('contain', '3:24');
    })
})

describe('Answer Page 3', () => {
    it('Answer Page displays expected answers', () => {
        const answers = ["React Router is mostly a wrapper around the history library. history handles interaction with the browser's window.history for you with its browser and hash histories. It also provides a memory history which is useful for environments that don't have a global history. This is particularly useful in mobile app development (react-native) and unit testing with Node.", "On my end, I like to have a single history object that I can carry even outside components. I like to have a single history.js file that I import on demand, and just manipulate it. You just have to change BrowserRouter to Router, and specify the history prop. This doesn't change anything for you, except that you have your own history object that you can manipulate as you want. You need to install history, the library used by react-router."];
        cy.visit('http://localhost:8000');
        cy.contains('Programmatically navigate using React router').click();
        cy.get('.answerText').each(($el, index) => {
            cy.wrap($el).should('contain', answers[index]);
        });
    });
});

describe('Answer Page 4', () => {
    it('Answer Page displays expected authors', () => {
        const authors = ['hamkalo', 'azad'];
        const date = ['Mar 02','Jan 31'];
        const times = ['15:30','15:30'];
        cy.visit('http://localhost:8000');
        cy.contains('Programmatically navigate using React router').click();
        cy.get('.answerAuthor').each(($el, index) => {
            cy.wrap($el).should('contain', authors[index]);
            cy.wrap($el).should('contain', date[index]);
            cy.wrap($el).should('contain', times[index]);
        });
    });
});

describe("Active button verification test", () => {
    it("Adds a question, click active button, verifies the sequence", () => {
      cy.visit("http://localhost:8000");
  
      // add a question
      cy.contains("Ask a Question").click();
      cy.get("#formTitleInput").type("Test Question A");
      cy.get("#formTextInput").type("Test Question A Text");
      cy.get("#formTagInput").type("javascript");
      cy.get("#formUsernameInput").type("mks0");
      cy.contains("Post Question").click();
  
      // add an answer to question of React Router
      cy.contains("Programmatically navigate using React router").click();
      cy.contains("Answer Question").click();
      cy.get("#answerUsernameInput").type("mks1");
      cy.get("#answerTextInput").type("Answer to React Router");
      cy.contains("Post Answer").click();
  
      // go back to main page
      cy.contains("Questions").click();
  
      // add an answer to question of Android Studio
      cy.contains(
        "android studio save string shared preference, start activity and load the saved string"
      ).click();
      cy.contains("Answer Question").click();
      cy.get("#answerUsernameInput").type("mks1");
      cy.get("#answerTextInput").type("Answer to android studio");
      cy.contains("Post Answer").click();
  
      // go back to main page
      cy.contains("Questions").click();
  
      // add an answer to question A
      cy.contains("Test Question A").click();
      cy.contains("Answer Question").click();
      cy.get("#answerUsernameInput").type("mks2");
      cy.get("#answerTextInput").type("Answer Question A");
      cy.contains("Post Answer").click();
  
      // go back to main page
      cy.contains("Questions").click();
  
      // clicks active
      cy.contains("Active").click();
  
      const qTitles = [
        "Test Question A",
        "android studio save string shared preference, start activity and load the saved string",
        "Programmatically navigate using React router"
      ];
      cy.get(".postTitle").each(($el, index, $list) => {
        cy.wrap($el).should("contain", qTitles[index]);
      });
    });
  });

