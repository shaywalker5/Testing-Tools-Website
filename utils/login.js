export async function login(page) {
    try {
        await page.getByRole('textbox', { name: 'Your Email *' }).fill('customer@practicesoftwaretesting.com');
      } catch {
        await page.getByRole('textbox', { name: 'Your E-mail *' }).click();
      }
    await page.getByRole('textbox' , { name: 'Your Password *'}).fill('welcome01');
    await page.getByRole('button', { name: 'Login' }).click();
  };