import DashboardLandingPage from '../support/pageObjects/landingPage';
import Terms_Conditions from '../support/pageObjects/termsAndConditions';

describe('Navigate the terms and conditions', () => {
    const landingPage = new DashboardLandingPage();
    const termsAndConditions = new Terms_Conditions();

    beforeEach(() => {
        cy.viewport(1920, 1080);
        landingPage.navigateTheWebPage();
    });

    it('User is able to view the terms and condition and expand them', () => {
        termsAndConditions.navigateToTheTermsAndConditions();
    });
});
