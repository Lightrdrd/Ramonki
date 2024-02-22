// @ts-check
const { test, expect } = require('@playwright/test');

test('Добавление товара в корзину. Проверка добавленного товара', async ({ page }) => {
    await page.goto('https://ramonki.by/');
    await expect(page.locator('div').filter({ hasText: 'Для удобства пользователей мы используем cookiesПолитика в отношении обработки' }).nth(1)).toBeVisible();
    await page.getByRole('button', { name: 'Принять все' }).click();
    await expect(page.locator("//div[@class='product-list-slider']")).toBeVisible();//ожидание слайдера
    const productName = await page.locator("//div[@class='swiper-slide product-list-slider__slide swiper-slide-active'][1]//div[@class='product-cart-description__title-name']").textContent();
    await page.locator("//div[@class='swiper-slide product-list-slider__slide swiper-slide-active'][1]//div[@class='product-cart-description__buy']").click();
    await expect(page.locator("//div[@class='v-modal__desktop']")).toBeVisible();//ожидание модалки
    await page.getByText('50', { exact: true }).click();
    await expect(page.locator("//li[@class='options-selector__item options-selector__item--active' and text()='50']")).toBeVisible();//кнопка с выбранным размером - активна
    await page.getByRole('button', { name: 'Выбрать' }).click();
    await expect(page.locator("//div[@class='v-modal__desktop']//div[@class='success-add-modal']")).toBeVisible();//ожидание модалки о добавленно товаре
    await page.getByRole('button', { name: 'Оформить заказ' }).click();
    await expect(page.locator("//span[@class='middle-bar__counter' and text()='1']")).toBeVisible();//ожидание модалки о добавленно товаре
    await expect(page.locator('h2')).toContainText('1 товаров');
    const productNameInBusket = await page.locator("//a[@class='cart-item__text']").textContent();
    await expect(page.locator("//a[@class='cart-item__text']")).toHaveText(`${productName}`);
    await expect(page.getByRole('main')).toContainText('Размер 50');
});
