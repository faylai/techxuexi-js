import {sleep, getActivePage, triggerClick, scrollIntoViewIfNeeded} from "./utils.mjs";

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
    for (let counter = 0; counter < 2; counter++) {
        await sleep(6)
        let tabs = await listPage.$$('.tab-item')
        await triggerClick(listPage, tabs[counter])
        await sleep(3)
        let videoLinks = await listPage.$$('div.textWrapper[data-link-target]')
        for (let i = 0; i < Math.min(6, videoLinks.length); i++) {
            let link = videoLinks[i]
            await listPage.focus('body')
            await triggerClick(listPage, link)
            await sleep(3)
            const videoPage = await getActivePage(browser)
            await sleep(3)
            try {
                await scrollIntoViewIfNeeded(['video'], videoPage, 3000)
            } catch (err) {
                console.error(err)
            }

            await sleep(180)
            await videoPage.focus('body')
            await videoPage.close()
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
