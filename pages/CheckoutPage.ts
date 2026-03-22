import { Locator, Page, expect } from "@playwright/test";

export class CheckoutPage {
  private readonly page: Page;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly postalCode: Locator;
  readonly continueButton: Locator;
  readonly cancelButton: Locator;
  readonly finishButton: Locator;
  readonly completeHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstName = page.getByTestId("firstName");
    this.lastName = page.getByTestId("lastName");
    this.postalCode = page.getByTestId("postalCode");
    this.continueButton = page.getByTestId("continue");
    this.cancelButton = page.getByTestId("cancel");
    this.finishButton = page.getByTestId("finish");
    this.completeHeader = page.getByTestId("complete-header");
  }

  async fillUserForm(firstName: string, lastName: string, postalCode: string) {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.postalCode.fill(postalCode);
  }

  async clickContinueButton() {
    await this.continueButton.click();
  }

  async clickFinishButton() {
    await this.finishButton.click();
  }

  async assertCheckoutCompleted() {
    await expect(this.page).toHaveURL("/checkout-complete.html");
    await expect(this.completeHeader).toHaveText("Thank you for your order!");
  }
}
