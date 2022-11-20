let appYear = 2021;
describe("Calendar Test", () => {
  it("Calendar is running", () => {
    cy.visit("http://localhost:3000");
    cy.get(".c-cell-active").contains("7");
  });
  it("Year increased", () => {
    let appYear = 2021;
    cy.visit("http://localhost:3000");
    cy.get("#c-year-increase").click();
    appYear++;
    cy.get(".c-year").contains(appYear);
  });

  it("Month increased", () => {
    cy.visit("http://localhost:3000");
    cy.get("#c-month-increase").click();
    cy.get(".c-month").contains("February");
  });

  it("Change active", () => {
    cy.visit("http://localhost:3000");
    cy.get(".c-cell").contains(20).click();
    cy.get(".c-cell-active").contains(20);
  });

  it("Year decrease x2", () => {
    let appYear = 2021;
    cy.visit("http://localhost:3000");
    cy.get("#c-year-decrease").click();
    cy.get("#c-year-decrease").click();
    appYear--;
    appYear--;
    cy.get(".c-year").contains(appYear);
  });

  it("Click all buttons and change current date", () => {
    let appYear = 2021;
    cy.visit("http://localhost:3000");
    cy.get("#c-year-decrease").click();
    cy.get("#c-year-decrease").click();
    appYear--;
    appYear--;
    cy.get(".c-year").contains(appYear);

    cy.get("#c-year-increase").click();
    cy.get("#c-year-increase").click();
    cy.get("#c-year-increase").click();
    cy.get("#c-year-increase").click();
    appYear++;
    appYear++;
    appYear++;
    appYear++;
    cy.get(".c-year").contains(appYear);

    cy.get("#c-month-increase").click();
    cy.get(".c-month").contains("February");
    cy.get("#c-month-increase").click();
    cy.get(".c-month").contains("March");
    cy.get("#c-month-decrease").click();
    cy.get("#c-month-decrease").click();
    cy.get("#c-month-decrease").click();
    cy.get(".c-month").contains("December");
    
    cy.get(".c-cell").contains(15).click();
    cy.get(".c-cell-active").contains(15);
    cy.get(".c-cell").contains(10).click();
    cy.get(".c-cell-active").contains(10);
  });
});

// describe("My First Test", () => {
//   it('clicks the link "type"', () => {
//     cy.visit("https://example.cypress.io");

//     cy.contains("type").click();

//     // Should be on a new URL which
//     // includes '/commands/actions'
//     cy.url().should("include", "/commands/actions");

//         // Get an input, type into it and verify
//     // that the value has been updated
//     cy.get('.action-email')
//       .type('fake@email.com')
//       .should('have.value', 'fake@email.com')
//   });
// });

// describe("Calendar test", () => {
//   it("go to app", () => {
//     cy.visit("http://localhost:3000/");
//   });
// });
