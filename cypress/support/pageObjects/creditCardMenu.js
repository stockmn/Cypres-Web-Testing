// homePage.js
class HomePage {
  visit() {
      cy.visit('https://www.imbank.com/ke/');
  }

  navigateToHeader(headerText) {
      cy.get('header').contains(headerText).click();
  }

  expandTermsAndConditionsAccordion() {
      cy.contains('Terms and Conditions').click();
  }
}

export default HomePage;
