import loginCredentials from "../../fixtures/loginCredentials.json";

class DashboardLandingPage {
    constructor() {
        // Locators
        this.landingpagetext1='.hero-section-2-text-row.hero-section-2-text-large.font-weight-bold';
        this.landingpagetext2 = '.hero-section-2-text-row.hero-section-2-text-medium.font-weight-light';
       
    }

    navigateTheWebPage() {
        cy.visit(loginCredentials.access_Web.base_URL);
    }
    websiteLandingPage(){
      cy.get(this.landingpagetext1).should('have.text','BANK TO MPESA NI SARE KABISA')
      cy.get(this.landingpagetext2).should('have.text','Download the I&M Bank Mobile App to open your personal account today!')

    }

 
}

export default DashboardLandingPage;
