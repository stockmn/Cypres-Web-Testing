class NavigateHeaders {
    constructor() {
        this.firstHeader = '.page-header-first-row.bg-gray-4.d-flex.align-items-center';
        this.secondHeader = '.page-header-second-row.position-relative';
        this.countriesDropdown = '.dropdown-menu.show';
    }

    navigateToTheFirstHeaderNavAndElement() {
        cy.get(this.firstHeader).find('.mb-0.font-size-sm.mr-3').should('have.text', 'Select Country');
        cy.get(this.firstHeader).find('//*[@id="countries-dropdown-top"]/div[2]/i').click();
        cy.get(this.firstHeader).find(this.countriesDropdown).select('KENYA').click();
        cy.get(this.firstHeader).find('#menu-item-12249').should('have.text', 'Ways to Bank');
        cy.get(this.firstHeader).find('#menu-item-12275').should('have.text', 'Branches , CDMs & ATMs locator');
        cy.get(this.firstHeader).find('#menu-item-15185').should('have.text', 'Help & Support');
    }

    navigateToTheSecondHeaderNav() {
        cy.get(this.secondHeader).find('#menu-item-12092').should('have.text', 'HOME');
        cy.get(this.secondHeader).find('#menu-item-12094').should('have.text', 'PERSONAL');
        cy.get(this.secondHeader).find('#menu-item-12095').should('have.text', 'BUSINESS');
        cy.get(this.secondHeader).find('#menu-item-12093').should('have.text', 'DIASPORA');
        cy.get(this.secondHeader).find('#menu-item-12100').should('have.text', 'ABOUT US');
        cy.get(this.secondHeader).find('.seach-icon-cta.cursor-pointer.text-primary').should('be.visible');
        cy.get(this.secondHeader).find('#online-services-dropdown').should('have.text', 'Online Services');
    }
}

export default NavigateHeaders;
