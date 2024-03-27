import NavigateHeaders from '../support/pageObjects/navigateHeader'; // Importing the NavigateHeaders class from the correct path
import DashboardLandingPage from '../support/pageObjects/landingPage';

describe('Navigation through website headers', () => {
    const navigateHeaders = new NavigateHeaders();
    const landingPage = new DashboardLandingPage();

    beforeEach(() => {
        landingPage.navigateTheWebPage();
    });

    it('should display elements of the first header row', () => {
        navigateHeaders.navigateToTheFirstHeaderNavAndElement();
    });

    it('should display elements of the second header row', () => {
        navigateHeaders.navigateToTheSecondHeaderNav();
    });
});
