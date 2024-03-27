// LoginPage.ts
import { Page, Locator } from '@playwright/test';

export class ContactForm {
  private page: Page;
  private contactFormSelector = '#gform_fields_17';
  private firstNameSelector = 'input[name="input_2"]';
  private emailAddressSelector = 'input[name="input_3"]';
  private phoneNumberSelector = 'input[name="input_4"]';
  private selectBranchSelector = 'select[name="input_5"]';
  private submitButtonSelector = '#input_17_5';

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToContactUsForm() {
        await this.page.locator('#menu-item-15185').click()
        await this.page.waitForLoadState();
    // Define locators for form elements
    const contactForm = this.page.locator(this.contactFormSelector);
    const firstNameInput = this.page.locator(this.firstNameSelector);
    const emailAddressInput = this.page.locator(this.emailAddressSelector);
    const phoneNumberInput = this.page.locator(this.phoneNumberSelector);
    const selectBranchDropdown = this.page.locator(this.selectBranchSelector);
    const submitButton = this.page.locator(this.submitButtonSelector);

    // Fill out form fields
    try {
        await firstNameInput.type('Your desired input');
        await emailAddressInput.type('example@example.com');
        await phoneNumberInput.type('1234567890');

        // Select the branch
        await selectBranchDropdown.selectOption({ label: 'Kisumu' });

        // Check the checkbox
        const checkbox = await this.page.locator('input[type="checkbox"]').first();
        await checkbox.check();
    } catch (error) {
        console.error('Error filling out form fields:', error);
        return; // Exit method if filling out form fields fails
    }

    // Ensure the page is still open before scrolling and clicking
    if (!this.page.isClosed()) {
        // Scroll to the submit button to ensure it's in view
        await submitButton.scrollIntoViewIfNeeded();

        // Click the submit button
        try {
            await submitButton.click();
        } catch (error) {
            console.error('Error clicking submit button:', error);
        }
    } else {
        console.error('Page is closed.');
    }
  }}
