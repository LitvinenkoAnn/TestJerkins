import { test } from "node:test";
import assert from "node:assert";
import LoginPage from "./LoginPage.js";
import { chromium } from "playwright";

let negativeLoginData = [
  {
    email: "emailgmail.com",
    password: "23124124124",
    result: "Oops! Please enter a valid email!",
    locator: '//span[@class="input_error__sghLZ"]',
  },
  {

    email: "emailfg@mail.com",
    password: "23124124124",
    result: "There is no account with this email :(",
    locator: '//span[@class="input_error__sghLZ"]',

  },
  {
    email: "email@gmail.com",
    password: "incorrectpassword",
    result: "Sorry, this isn't the right password!",
    locator: '//span[@class="input_error__sghLZ"]', 
 },
]

negativeLoginData.forEach(({ email, password, result, locator }) => {
  test("Log in check", async () => {
    const browser = await chromium.launch({ headless: true })
    const page = await browser.newPage()
    let loginPage = new LoginPage(page)
    await loginPage.doLogin(email, password, result, locator)
    await page.close()
    await browser.close()
  })
})
