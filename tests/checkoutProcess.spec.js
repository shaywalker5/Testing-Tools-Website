const { test, expect } = require('@playwright/test');
const { login, navigateToBilling } = require('../utils/reusableFunctions.js');
import { minMaxData, addressData, alphaFields, zipData } from '../utils/testData.js';

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

test('Validate if user is logged in, website displays that customer is already logged in and can proceed.',  async function ({page}) {    
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

test('Validate error message for each field.', async function ({page}) {    
await page.goto('https://with-bugs.practicesoftwaretesting.com/#/');

await page.getByRole('heading',{ name: 'Combination Pliers'}).click();
await page.locator("//button[@id='btn-add-to-cart']").click();

await page.getByRole('link',{ name: 'cart'}).click();

await page.getByRole('button', { name: 'Proceed to checkout'}).click();

await login(page);
await page.getByRole('button', { name: 'Proceed to checkout'}).click();

await page.waitForTimeout(2000);

const requiredFields = [
    { label: 'Your Address *', error: 'Address is Required.' },
    { label: 'Your City *', error: 'City is Required.' },
    { label: 'Your State *', error: 'State is Required.' },
    { label: 'Your Country *', error: 'Country is Required.' },
    { label: 'Your Postcode *', error: 'Postcode is Required.' }
  ];
  
  for (const { label, error } of requiredFields) {
    await page.getByRole('textbox', { name: label }).fill('');
    await expect.soft(page.getByText(error)).toBeVisible();
  };
});

test.describe('Billing information validations ', () => {
    test.describe.only('Validate address, city, state, and country accept a minimum of 3 characters and max of 32 characters', () => {    
        for (const { field, value, shouldBeValid } of minMaxData) {
            test(`Field: ${field} | Value: "${value}" | Expected: ${shouldBeValid ? 'Valid' : 'Invalid'}`, async function ({page}) {
              await page.goto('https://with-bugs.practicesoftwaretesting.com/#/');

              await navigateToBilling(page); 
        
              await page.getByRole('textbox', { name: field }).fill(value);
              await page.locator("//aw-wizard-step[@steptitle='Address']//button[@type='button']").click();
        
              if (shouldBeValid) {
                await expect(page.getByText('is Required')).not.toBeVisible();
              } else {
                await expect(page.getByText('minimum 2 characters')).toBeVisible();
              }
            });
          }
});

    test.describe.only('Validate address field only allows alphabetic and numerical characters', () => {    
        for (const { value, valid } of addressData) {
            test(`Address input "${value}" should be ${valid ? 'valid' : 'invalid'}`, async function ({page}) {
              await navigateToBilling(page);
        
              await page.getByRole('textbox', { name: 'Your Address *' }).fill(value);
              await page.locator("//aw-wizard-step[@steptitle='Address']//button[@type='button']").click();
        
              if (valid) {
                await expect(page.getByText('Invalid characters')).not.toBeVisible();
              } else {
                await expect(page.getByText('Invalid characters')).toBeVisible();
              }
            });
        }
});

    test.describe('Validate city, state, and country fields only accepts alphabetic characters.', () => {    
        for (const { field, value, valid } of alphaFields) {
            test(`${field}: "${value}" should be ${valid ? 'valid' : 'invalid'}`, async function({ page }) {
              await navigateToBilling(page);
        
              await page.getByRole('textbox', { name: field }).fill(value);
              await page.locator("//aw-wizard-step[@steptitle='Address']//button[@type='button']").click();
        
              if (valid) {
                await expect(page.getByText('Invalid')).not.toBeVisible();
              } else {
                await expect(page.getByText('Only letters allowed')).toBeVisible();
              }
            });
          }
});

test.describe('Validate zip code field only accepts 5 numerical characters', () => {
    for (const { value, valid } of zipData) {
      test(`Zip code "${value}" should be ${valid ? 'valid' : 'invalid'}`, async function ({ page }) {
        await navigateToBilling(page);
  
        await page.getByRole('textbox', { name: 'Your Postcode *' }).fill(value);
        await page.locator("//aw-wizard-step[@steptitle='Address']//button[@type='button']").click();
  
        if (valid) {
          await expect(page.getByText('Postcode is Required')).not.toBeVisible();
        } else {
          await expect(page.getByText(/Postcode.*invalid/i)).toBeVisible();
        }
      });
    }
  });
});

test('Validate "Continue" button is disabled if a field is left blank', async function ({page}) {    
    await page.goto('https://with-bugs.practicesoftwaretesting.com/#/');

    await page.getByRole('heading',{ name: 'Combination Pliers'}).click();
    await page.locator("//button[@id='btn-add-to-cart']").click();
    
    await page.getByRole('link',{ name: 'cart'}).click();
    
    await page.getByRole('button', { name: 'Proceed to checkout'}).click();
    
    await login(page);
    await page.getByRole('button', { name: 'Proceed to checkout'}).click();
    
    await page.waitForTimeout(2000);

    const continueButton = await page.locator("//aw-wizard-step[@steptitle='Address']//button[@type='button']");

    await page.getByRole('textbox', { name: 'Your Address *'}).fill('');
    await expect(continueButton).toBeDisabled();
    await page.getByRole('textbox', { name: 'Your Address *'}).fill('123 Strawberry St.');

    await page.getByRole('textbox', { name: 'Your City *'}).fill('');
    await expect(continueButton).toBeDisabled();
    await page.getByRole('textbox', { name: 'Your City *'}).fill('Fruitville');

    await page.getByRole('textbox', { name: 'Your State *'}).fill('');
    await expect(continueButton).toBeDisabled();
    await page.getByRole('textbox', { name: 'Your State *'}).fill('Tennessee');

    await page.getByRole('textbox', { name: 'Your Country *'}).fill('');
    await expect(continueButton).toBeDisabled();
    await page.getByRole('textbox', { name: 'Your Country *'}).fill('US');

    await page.getByRole('textbox', { name: 'Your Postcode *'}).fill('');
    await expect(continueButton).toBeDisabled();
    await page.getByRole('textbox', { name: 'Your Postcode *'}).fill('12345');
});