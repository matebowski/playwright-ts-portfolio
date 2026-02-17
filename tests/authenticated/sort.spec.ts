import { expect, test } from "../fixtures";

test.beforeEach(async ({ page, inventoryPage }) => {
  await page.goto("/inventory.html");
  await inventoryPage.assertOnPage();
});

test("Sort products", async ({ page }) => {
  const sort = page.getByTestId("product-sort-container");
  await sort.selectOption("lohi");

  const priceLocator = page.getByTestId("inventory-item-price");
  const prices = await priceLocator.allTextContents();
  const priceNumbers = prices.map((text) =>
    Number(text.replace("$", "").replace(",", ".")),
  );

  const sorted = [...priceNumbers].sort((a, b) => a - b);
  await expect(priceNumbers).toEqual(sorted);
});
