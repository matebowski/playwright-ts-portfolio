import { test } from "../fixtures";

test("logged in user can complete checkout for two products", async ({
  page,
  inventoryPage,
  cartPage,
  checkoutPage,
}) => {
  await page.goto("/inventory.html");
  await inventoryPage.assertOnPage();
  await inventoryPage.addToCart("Test.allTheThings() T-Shirt (Red)");
  await inventoryPage.addToCart("Sauce Labs Fleece Jacket");
  await inventoryPage.expectCartCount(2);

  await inventoryPage.clickShoppingCartBadge();

  await cartPage.assertProductsInCart([
    "Test.allTheThings() T-Shirt (Red)",
    "Sauce Labs Fleece Jacket",
  ]);

  await cartPage.clickCheckoutButton();
  await checkoutPage.fillUserForm("Mateusz", "Jak", "61131");
  await checkoutPage.clickContinueButton();
  await checkoutPage.clickFinishButton();
  await checkoutPage.assertCheckoutCompleted();
});






