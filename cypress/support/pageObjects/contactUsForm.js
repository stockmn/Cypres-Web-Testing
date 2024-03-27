class ContactUsForm {
    constructor() {
        this.contactForm = '#gform_wrapper_17';
    }

    navigateToTheContactForm(name, email, phoneNumber) {
        // Waiting for page to load
        cy.wait(2000); // Adjust the wait time as necessary

        // Scrolling to the contact form and ensuring it's visible
        cy.get(this.contactForm).scrollIntoView().should('be.visible');

        // Filling the form fields
        cy.get(this.contactForm).within(() => {
            cy.get('input[name="input_2"]').type(name);
            cy.get('input[name="input_3"]').type(email);
            cy.get('input[name="input_4"]').type(phoneNumber);
            cy.get('select[name="input_5"]').select('Spring Valley');
        });

        // Handling reCAPTCHA
        cy.get('iframe[src*="recaptcha"]').then($iframe => {
            const $body = $iframe.contents().find('body');
            cy.wrap($body).find('.recaptcha-checkbox-border').click();
        });

        // Submitting the form
        cy.get('#gform_submit_button_17').click();
    }
}

export default ContactUsForm;
