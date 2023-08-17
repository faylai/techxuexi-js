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
    for (let counter = 0; counter < 10; counter++) {
        await sleep(6)
        let tabs = await listPage.$$('.tab-item')
        await triggerClick(listPage, tabs[counter])
        await sleep(3)
        let videoLinks = await listPage.$$('div.textWrapper[data-link-target]')
        if (videoLinks.length > 0) {
            const randomIndex = Math.floor(Math.random() * 10000) % videoLinks.length
            for (let i = randomIndex; i <= Math.max(0, Math.min(randomIndex, videoLinks.length - 1)); i++) {
                let link = videoLinks[i]
                await listPage.focus('body')
                await triggerClick(listPage, link)
                await sleep(3)
                const videoPage = await getActivePage(browser)
                await sleep(3)
                let duration = 180
                try {
                    await videoPage.waitForSelector('video')
                    await sleep(3)
                    duration = await videoPage.evaluate(function () {
                        return document.querySelector('video').player._duration
                    })
                    // 让视频滚动到中间
                    await videoPage.evaluate(function () {
                        document.documentElement.scrollTop = document.querySelector('video').offsetTop
                        return null
                    })
                } catch (err) {
                    console.error(err)
                }
                console.log('video duration is ', duration)
                //最多看3分钟
                await sleep(Math.min(duration, 180))
                try {
                    await videoPage.focus('body')
                    await videoPage.close()
                } catch (err) {
                    console.log(err)
                }
            }
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
