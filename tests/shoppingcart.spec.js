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

test('Validate when user enters quantity on item details page and adds to cart, the correct quantity displays on the shopping cart icon' , async function ({page}) {
    await page.goto('https://with-bugs.practicesoftwaretesting.com/#/');

    await page.getByRole('heading',{ name: 'Bolt Cutters'}).click();

    await page.getByRole('spinbutton', { name: ''}).type('0');

    await page.locator("//button[@id='btn-add-to-cart']").click();

    const cartCount = await page.locator('id=lblCartCount').textContent();
    console.log(cartCount);
    await expect(cartCount === '10').toBeTruthy();
});

test('Validate if the quantity of a product is updated, it updates the total price of that product' , async function ({page}) {
    await page.goto('https://with-bugs.practicesoftwaretesting.com/#/');
  
    await page.getByRole('heading', { name: 'Combination Pliers' }).click();
    await page.locator("#btn-add-to-cart").click();
  
    await page.getByRole('link', { name: 'cart' }).click();
  
    const qty = await page.getByRole('spinbutton');
    await qty.fill('5');
    await page.keyboard.press('Enter');

    const qtyInput = await qty.inputValue();
  
    const priceText = await page.locator("//td[normalize-space()='$14.15']").textContent();
    
    const itemTotalText = await page.locator("//td[normalize-space()='$00.00']").textContent();
 
    const itemPrice = parseFloat(priceText?.replace('$', '') || '0');
    const itemTotal = parseFloat(itemTotalText?.replace('$','') || '0');

    expect(itemTotal).toBeCloseTo(itemPrice * qtyInput, 2);
});

test('Validate if the quantity of a product is updated, it updates the total of the cart.', async ({ page }) => {
    await page.goto('https://with-bugs.practicesoftwaretesting.com/#/');
  
    await page.getByRole('heading', { name: 'Combination Pliers' }).click();
    await page.locator("#btn-add-to-cart").click();
  
    await page.getByRole('link', { name: 'cart' }).click();
  
    const qty = await page.getByRole('spinbutton');
    await qty.fill('5');
    await page.keyboard.press('Enter');

    const qtyInput = await qty.inputValue();
    console.log(qtyInput);
  
    const priceText = await page.locator("//td[normalize-space()='$14.15']").textContent();
    const totalText = await page.locator("//td[@class='col-md-2']").last().textContent();
  
    const itemPrice = parseFloat(priceText?.replace('$', '') || '0');
    console.log(itemPrice);
    const cartTotal = parseFloat(totalText?.replace('$', '') || '0');
    console.log(cartTotal)
    expect(cartTotal).toBeCloseTo(itemPrice * qtyInput, 2);
  });

test('Validate user can remove an item by clicking the red x next to the product.' , async function ({page}) {
    await page.goto('https://with-bugs.practicesoftwaretesting.com/#/');

    await page.getByRole('heading',{ name: 'Combination Pliers'}).click();
    await page.locator("//button[@id='btn-add-to-cart']").click();

    await page.getByRole('link',{ name: 'cart'}).click();

    await page.locator("//a[@class='btn btn-danger']").click();

    const itemName = await page.getByRole('cell', {name: 'Combination Pliers'});
    await expect(itemName).toBeHidden();
});

test('Validate if user removes a product the total of the shopping cart updates.' , async function ({page}) {
    await page.goto('https://with-bugs.practicesoftwaretesting.com/#/');

    await page.getByRole('heading',{ name: 'Combination Pliers'}).click();
    await page.locator("//button[@id='btn-add-to-cart']").click();

    await page.getByRole('link',{ name: 'cart'}).click();

    await page.locator("//a[@class='btn btn-danger']").click();

    const cartTotalText = await page.locator("//td[@class='col-md-2']").last().textContent();
    const cartTotal = parseFloat(cartTotalText?.replace('$', '') || '0');

    await expect(cartTotal).toBe(0.00)
});

test('Validate user can not add item with 0 quantity to cart' , async function ({page}) {
    await page.goto('https://with-bugs.practicesoftwaretesting.com/#/');

    await page.getByRole('heading',{ name: 'Combination Pliers'}).click();

    await page.getByRole('spinbutton', { name: ''}).fill('0');

    await page.locator("//button[@id='btn-add-to-cart']").click();

    const errorMessage = await page.getByText('Oops, something went wrong.');
    await expect(errorMessage).toBeVisible();
});

test('Validate user can not add item with more than 1000 quantity to cart' , async function ({page}) {
    await page.goto('https://with-bugs.practicesoftwaretesting.com/#/');

    await page.getByRole('heading',{ name: 'Combination Pliers'}).click();

    await page.getByRole('spinbutton', { name: ''}).fill('0');

    await page.locator("//button[@id='btn-add-to-cart']").click();

    const shoppingCart = await page.getByRole('link',{ name: 'cart'});
    await expect(shoppingCart).toBeHidden();

    const errorMessage = await page.getByText('Quantity can not exceed 999 items');
    await expect(errorMessage).toBeVisible();
});

test('Validate user can increase and decrease quantity with plus and minus buttons on item detail page' , async function ({page}) {
    await page.goto('https://with-bugs.practicesoftwaretesting.com/#/');

    await page.getByRole('heading',{ name: 'Slip Joint Pliers'}).click();
    await page.getByRole('button' , { name: '+' }).click();

    const quantityField = await page.getByRole('spinbutton', { name: ''});
    await expect(quantityField).toHaveValue('2');
});

test('Validate setting quanity to 0 on the shopping cart detail page for an item removes it from the cart.' , async function ({page}) {
    await page.goto('https://with-bugs.practicesoftwaretesting.com/#/');
  
    await page.getByRole('heading', { name: 'Combination Pliers' }).click();
    await page.locator("#btn-add-to-cart").click();
  
    await page.getByRole('link', { name: 'cart' }).click();
  
    const qty = await page.getByRole('spinbutton');
    await qty.fill('0');
    await page.keyboard.press('Enter');

    const itemName = await page.getByRole('cell', {name: 'Combination Pliers'});
    await expect(itemName).toBeHidden();
});