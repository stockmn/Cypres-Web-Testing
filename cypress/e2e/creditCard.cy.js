import DashboardLandingPage from '../support/pageObjects/landingPage';
import CreditCardMenu from '../support/pageObjects/creditCardMenu';

describe('Navigate the website', () => {
    const landingPage = new DashboardLandingPage();
    const creditCardMenu= new CreditCardMenu()

    beforeEach(() => {
        landingPage.navigateTheWebPage();
    });


    it('User visit credit card section of the website and scroll down to credit card page and Click on im-visa-international-gold-card', () => {
        creditCardMenu.creditCardMenuNavigation()
       
    });
});
