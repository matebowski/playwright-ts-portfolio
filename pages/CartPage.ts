import type { Locator, Page } from "@playwright/test";

export class CartPage {
  private readonly page: Page;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutButton = page.getByTestId("checkout");
  }

  async clickCheckoutButton() {
    await this.checkoutButton.click();
  }
}
