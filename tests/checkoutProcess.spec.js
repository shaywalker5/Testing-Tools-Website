const { test, expect } = require('@playwright/test');
const { login } = require('../utils/login');


test('Validate if quantity is 0, Proceed to checkout button can not clicked' , async function ({page}) {
    await page.goto('https://with-bugs.practicesoftwaretesting.com/#/');

    await page.getByRole('heading',{ name: 'Combination Pliers'}).click();
    await page.locator("//button[@id='btn-add-to-cart']").click();

    await page.getByRole('link',{ name: 'cart'}).click();

    const qty = await page.getByRole('spinbutton');
    await qty.fill('0');
    await page.keyboard.press('Enter');

    const proceedToCheckout = await page.getByRole('button', { name: 'Proceed to checkout'})
    await expect(proceedToCheckout).toBeDisabled();
});

test('Validate the "Proceed to Checkout" Button navigates to the next page' , async function ({page}) {
    await page.goto('https://with-bugs.practicesoftwaretesting.com/#/');

    await page.getByRole('heading',{ name: 'Combination Pliers'}).click();
    await page.locator("//button[@id='btn-add-to-cart']").click();

    await page.getByRole('link',{ name: 'cart'}).click();

    const qty = await page.getByRole('spinbutton');
    await qty.fill('0');
    await page.keyboard.press('Enter');

    await page.getByRole('button', { name: 'Proceed to checkout'}).click();

    await expect(page).toHaveURL('https://with-bugs.practicesoftwaretesting.com/#/checkout');
});

test('Validate user is able to login to complete checkout process.' , async function ({page}) {
    await page.goto('https://with-bugs.practicesoftwaretesting.com/#/');

    await page.getByRole('heading',{ name: 'Combination Pliers'}).click();
    await page.locator("//button[@id='btn-add-to-cart']").click();

    await page.getByRole('link',{ name: 'cart'}).click();

    await page.getByRole('button', { name: 'Proceed to checkout'}).click();

    await login(page);
});

test.only('Validate if user is logged in, website displays that customer is already logged in and can proceed.',  async function ({page}) {    
await page.goto('https://with-bugs.practicesoftwaretesting.com/#/');
await page.getByRole('link',{ name : 'Sign in'}).click();
await login(page);

await page.getByRole('button', { name: 'Categories'}).click();
await page.getByRole('link', { name: 'Hand Tools'}).click();

await page.getByRole('heading',{ name: 'Combination Pliers'}).click();
await page.locator("//button[@id='btn-add-to-cart']").click();

await page.getByRole('link',{ name: 'cart'}).click();

await page.getByRole('button', { name: 'Proceed to checkout'}).click();

const alreadySignedInMessage = await page.getByText("Hello Jane Doe, you are already logged in. You can proceed to checkout.");
await expect(alreadySignedInMessage).toBeVisible();
});

test('Validate website autofills the billing address accurately with information from user profile', async function ({page}) {    

});

test('Validate user can not leave any field for billing address blank.(Validate error message for each field.)', async function ({page}) {    

});

test('Validate address field only allows alphabetic and numerical characters', async function ({page}) {    

});

test('Validate city, state, and country fields only accepts alphabetic characters.', async function ({page}) {    

});

test('Validate state field only accepts alphabetic characters', async function ({page}) {    

});

test('Validate zip code field only accepts 5 numerical characters', async function ({page}) {    

});

test('Validate "Continue" button is disabled if a field is left blank', async function ({page}) {    

});