import DashboardLandingPage from '../support/pageObjects/landingPage';

describe('Navigate the website', () => {
    const landingPage = new DashboardLandingPage();

    beforeEach(() => {
        landingPage.navigateTheWebPage();
    });

    it('should navigate to website page', () => {
      landingPage.websiteLandingPage()
        
    });
});
