import {sleep, getActivePage, triggerClick} from "./utils.mjs";

export async function run(page, browser) {
    // 视频选择器
    const videoSelector = "div.menu-list .menu-row:nth-child(2) a:nth-child(3)"
    await page.goto('https://www.xuexi.cn/index.html');
    await page.waitForSelector(videoSelector)
    await page.click(videoSelector)
    await sleep(2)
    const openPage = await getActivePage(browser)
    console.log("学习电视台页面:", openPage.url())
    const hotBtSelector = 'div.hotBox'
    await openPage.waitForSelector(hotBtSelector)
    openPage.click(hotBtSelector)
    await sleep(3)
    const listPage = await getActivePage(browser)
    const videoLinks = await listPage.$$('div.textWrapper[data-link-target]')
    let counter = 0
    for (let link of videoLinks) {
        await listPage.focus('body')
        await triggerClick(listPage, link)
        await sleep(3)
        const videoPage = await getActivePage(browser)
        await sleep(220)
        await videoPage.focus('body')
        await videoPage.close()
        counter++
        // 看四个就可以了
        if (counter > 10) {
            break
        }
    }
    await sleep(2)
    try {
        await listPage.close()
    } catch (err) {
        console.error(err);
    }
    await sleep(1)
    try {
        await openPage.close()
    } catch (err) {
        console.error(err);
    }
}

export default run
