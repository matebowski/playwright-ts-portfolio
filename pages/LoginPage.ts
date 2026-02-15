import type { Page, Locator } from "@playwright/test";
import type { Credentials } from "../types/auth";

export class LoginPage {
  private readonly page: Page;

  readonly usernameField: Locator;
  readonly passwordField: Locator;
  readonly loginButton: Locator;
  readonly loginErrorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameField = page.getByTestId("username");
    this.passwordField = page.getByTestId("password");
    this.loginButton = page.getByTestId("login-button");
    this.loginErrorMessage = page.getByTestId("error");
  }

  async goto() {
    await this.page.goto("/");
  }

  async login(credentials: Credentials) {
    const { username: user, password: pass } = credentials;
    await this.goto();
    await this.usernameField.fill(user);
    await this.passwordField.fill(pass);
    await this.loginButton.click();
  }
}
