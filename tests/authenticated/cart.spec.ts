import { test } from "../fixtures";

test.beforeEach(async ({ page, inventoryPage }) => {
  await page.goto("/inventory.html");
  await inventoryPage.assertOnPage();
});

test("Remove product from cart", async ({ inventoryPage }) => {
  await inventoryPage.addToCart("Sauce Labs Onesie");
  await inventoryPage.expectCartCount(1);
  await inventoryPage.removeFromCart("Sauce Labs Onesie");
  await inventoryPage.expectCartCount(0);
});

const products = ["Sauce Labs Fleece Jacket", "Sauce Labs Bolt T-Shirt"];

for (const product of products) {
  test(`Adds to cart: ${product}`, async ({ inventoryPage }) => {
    await inventoryPage.addToCart(product);
    await inventoryPage.expectCartCount(1);
  });
}
