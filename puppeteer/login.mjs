import {sleep,getActivePage} from "./utils.mjs";

export async function run(page, browser) {
    // 登录
    const loginBt = "a.icon.login-icon"
    const mainSelect = "div#page-main"
    const index = 'https://www.xuexi.cn/index.html'
    await page.goto(index);
    await page.waitForSelector(mainSelect)
    await sleep(3)
    const isLogin = await page.evaluate(function (selector) {
        console.log(selector, document.querySelectorAll(selector).length)
        return document.querySelectorAll(selector).length == 0
    }, loginBt)
    if (!isLogin) {
        await page.click(loginBt)
        await sleep(3)
        const loginPage = await getActivePage(browser)
        while (true) {
            await sleep(3)
            console.log(loginPage.url())
            if (loginPage.url().indexOf('login.html') < 0) {
                break
            }
        }
        await loginPage.close()
        await sleep(1)
        // await page.reload()
        await sleep(1)
    }
}

export default run
