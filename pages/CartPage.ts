import { expect, type Locator, type Page } from "@playwright/test";

export class CartPage {
  readonly checkoutButton: Locator;
  readonly cartItemNames: Locator;
  readonly cartItemPrices: Locator;

  constructor(page: Page) {
    this.checkoutButton = page.getByTestId("checkout");
    this.cartItemNames = page.getByTestId("inventory-item-name");
    this.cartItemPrices = page.getByTestId("inventory-item-price");
  }

  async clickCheckoutButton() {
    await this.checkoutButton.click();
  }

  async assertProductsInCart(productNames: string[]) {
    const actualProducts = (await this.cartItemNames.allTextContents())
      .map((name) => name.trim())
      .sort();
    const expectedProducts = [...productNames].sort();
    expect(actualProducts).toEqual(expectedProducts);
  }

  async getProductPrices() {
    const pricesText = await this.cartItemPrices.allTextContents();
    return pricesText.map((price) => Number(price.replace("$", "").trim()));
  }

  calculateCartTotal(prices: number[]): number {
    let sum: number = 0;
    for (const price of prices) {
      sum += price;
    }
    return sum;
  }
}
