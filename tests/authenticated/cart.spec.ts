import { expect, test } from "../fixtures";

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

test("Authenticated user can add two products to cart", async ({
  inventoryPage,
}) => {
  await inventoryPage.addToCart(products[0]);
  await inventoryPage.addToCart(products[1]);
  await inventoryPage.expectCartCount(2);
  await inventoryPage.clickShoppingCartBadge();
});

test("Cart total should match sum of product prices", async ({
  inventoryPage,
  cartPage,
}) => {
  await inventoryPage.addToCart(products[0]);
  await inventoryPage.addToCart(products[1]);
  await inventoryPage.expectCartCount(2);
  await inventoryPage.clickShoppingCartBadge();
  const prices = await cartPage.getProductPrices();
  const total = cartPage.calculateCartTotal(prices);

  expect(total).toBe(65.98);
});
