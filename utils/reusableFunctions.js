export async function login(page) {
  try {
    await page.getByRole('textbox', { name: 'Your Email *' }).fill('customer@practicesoftwaretesting.com');
  } catch {
    await page.getByRole('textbox', { name: 'Your E-mail *' }).click();
  }
  await page.getByRole('textbox', { name: 'Your Password *' }).fill('welcome01');
  await page.getByRole('button', { name: 'Login' }).click();
};

export async function navigateToBilling(page) {
  await page.goto('https://with-bugs.practicesoftwaretesting.com/#/');

  await page.getByRole('heading', { name: 'Combination Pliers' }).click();
  await page.locator("//button[@id='btn-add-to-cart']").click();

  await page.getByRole('link', { name: 'cart' }).click();

  await page.getByRole('button', { name: 'Proceed to checkout' }).click();

  await login(page);
  await page.getByRole('button', { name: 'Proceed to checkout' }).click();

  await page.waitForTimeout(2000);
  await page.getByRole('textbox', { name: 'Your State *'}).fill('Texas');
};