import { expect } from "@playwright/test";
import type { Locator, Page } from "@playwright/test";

export class InventoryPage {
  private readonly page: Page;
  readonly title: Locator;
  readonly items: Locator;
  readonly itemName: Locator;
  readonly shoppingCartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.getByTestId("title");
    this.items = page.getByTestId("inventory-item");
    this.itemName = page.getByTestId("inventory-item-name");
    this.shoppingCartBadge = page.getByTestId("shopping-cart-badge");
  }

  async assertOnPage() {
    await expect(this.page).toHaveURL("/inventory.html");
    await expect(this.title).toHaveText("Products");
  }

  private getItemCard(productName: string): Locator {
    const item = this.itemName.filter({ hasText: productName });
    const itemCard = this.items.filter({ has: item });
    return itemCard;
  }

  async addToCart(productName: string) {
    const itemCard = this.getItemCard(productName);
    const addButton = itemCard.getByRole("button", { name: "Add to cart" });
    await expect(addButton).toBeVisible();
    await addButton.click();
  }

  async removeFromCart(productName: string) {
    const itemCard = this.getItemCard(productName);
    const removeButton = itemCard.getByRole("button", { name: "Remove" });
    await expect(removeButton).toBeVisible();
    await removeButton.click();
  }

  async expectCartCount(count: number) {
    if (count === 0) {
      await expect(this.shoppingCartBadge).toHaveCount(0);
      return;
    }
    await expect(this.shoppingCartBadge).toHaveCount(1);
    await expect(this.shoppingCartBadge).toHaveText(String(count));
  }

  async clickShoppingCartBadge() {
    await this.shoppingCartBadge.click();
  }
}
