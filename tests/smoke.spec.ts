import type { Credentials } from "../types/auth";
import { expect, test } from "./fixtures";

type Users = { valid: Credentials; invalidPassword: Credentials };

const users: Users = {
  valid: { username: "standard_user", password: "secret_sauce" },
  invalidPassword: { username: "standard_user", password: "secret_sauce123" },
};

test("Logs in and sees products page", async ({ loginPage, inventoryPage }) => {
  await loginPage.login(users.valid);
  await inventoryPage.assertOnPage();
});

test("Shows error for wrong password", async ({ loginPage }) => {
  await loginPage.login(users.invalidPassword);

  await expect(loginPage.loginErrorMessage).toBeVisible();
  await expect(loginPage.loginErrorMessage).toContainText(
    "Epic sadface: Username and password do not match any user in this service",
  );
});

test("Add product to cart", async ({ loginPage, inventoryPage }) => {
  await loginPage.login(users.valid);
  await inventoryPage.assertOnPage();
  await inventoryPage.addToCart("Sauce Labs Fleece Jacket");
  await inventoryPage.expectCartCount(1);
});

test("Remove product from cart", async ({ loginPage, inventoryPage }) => {
  await loginPage.login(users.valid);
  await inventoryPage.assertOnPage();
  await inventoryPage.addToCart("Sauce Labs Onesie");
  await inventoryPage.expectCartCount(1);
  await inventoryPage.removeFromCart("Sauce Labs Onesie");
  await inventoryPage.expectCartCount(0);
});
