import { expect, test } from "../fixtures";

test("checkout e2e", async ({
  page,
  inventoryPage,
  cartPage,
  checkoutPage,
}) => {
  await page.goto("/inventory.html");
  await inventoryPage.assertOnPage();
  await inventoryPage.addToCart("Test.allTheThings() T-Shirt (Red)");
  await inventoryPage.addToCart("Sauce Labs Fleece Jacket");

  await inventoryPage.clickShoppingCartBadge();
  await cartPage.clickCheckoutButton();
  await checkoutPage.fillUserForm("Mateusz", "Jak", "61131");
  await checkoutPage.clickContinueButton();
  await checkoutPage.clickFinishButton();

  await expect(page).toHaveURL("/checkout-complete.html");

  const completeHeader = page.getByTestId("complete-header");
  await expect(completeHeader).toHaveText("Thank you for your order!");
});
