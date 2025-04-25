const {test,expect} = require('@playwright/test');

test('Validate user can not add out of stock items to their cart.', async function ({page}) {
    await page.goto('https://with-bugs.practicesoftwaretesting.com/#/');
    
    await page.getByRole('heading',{ name: 'Long Nose Pliers' }).click();

    const title = await page.locator("//h1[normalize-space()='Long Nose Pliers']").textContent();

    await expect(title.includes('Long')).toBeTruthy();

    const outOfStock = await page.getByText("Out of stock");

    if(outOfStock.isVisible){
        await expect(page.locator("//button[@id='btn-add-to-cart']")).toBeDisabled();
    } else {
        await expect(page.locator("//button[@id='btn-add-to-cart']")).toBeEnabled();
    }
});

test('Validate when user adds an item to cart, the item is displayed in shopping cart with correct quantity and price.' , async function ({page}) {

    await page.goto('https://with-bugs.practicesoftwaretesting.com/#/');

    await page.getByRole('heading',{ name: 'Combination Pliers'}).click();
    await page.locator("//button[@id='btn-add-to-cart']").click();

    await page.getByRole('link',{ name: 'cart'}).click();

    const itemName = await page.getByRole('cell', {name: 'Combination Pliers'});
    const itemPrice = await page.getByRole('cell', {name: '$14.15'}).first();
    await expect(itemName && itemPrice).toBeVisible();
});

test('Validate when user enters quantity on item page and adds to cart, the number displays on the shopping cart icon' , async function ({page}) {
    await page.goto('https://with-bugs.practicesoftwaretesting.com/#/');

    await page.getByRole('heading',{ name: 'Bolt Cutters'}).click();

    await page.getByRole('spinbutton', { name: ''}).type('0');

    await page.locator("//button[@id='btn-add-to-cart']").click();

    const cartCount = await page.locator('id=lblCartCount').textContent();
    console.log(cartCount);
    await expect(cartCount === '10').toBeTruthy();
})