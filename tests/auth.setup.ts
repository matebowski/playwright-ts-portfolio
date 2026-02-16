import { expect, test } from "./fixtures";

const authFile = "playwright/.auth/standard_user.json";

const validCredentials = {
  username: "standard_user",
  password: "secret_sauce",
};

test("setup: authenticate standard_user", async ({
  page,
  loginPage,
  inventoryPage,
}) => {
  await loginPage.login(validCredentials);

  await inventoryPage.assertOnPage();
  await page.context().storageState({ path: authFile });
});
