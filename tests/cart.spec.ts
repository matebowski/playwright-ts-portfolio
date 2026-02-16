import { test } from "./fixtures";

test.beforeEach(async ({ page, inventoryPage }) => {
  await page.goto("/inventory.html");
  await inventoryPage.assertOnPage();
});

test("Add product to cart", async ({ page, inventoryPage }) => {
  await inventoryPage.addToCart("Sauce Labs Fleece Jacket");
  await inventoryPage.expectCartCount(1);
});

test("Remove product from cart", async ({ page, inventoryPage }) => {
  await inventoryPage.addToCart("Sauce Labs Onesie");
  await inventoryPage.expectCartCount(1);
  await inventoryPage.removeFromCart("Sauce Labs Onesie");
  await inventoryPage.expectCartCount(0);
});
