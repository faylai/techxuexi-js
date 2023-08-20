import {sleep, getActivePage, triggerClick} from "./utils.mjs";
import path from 'path';
import url from 'url';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function run(page, browser) {
    // 登录
    const myPointSelect = "#page-main div.linkItem:nth-child(6)"
    const index = 'https://www.xuexi.cn/index.html'
    await page.goto(index);
    await page.waitForSelector(myPointSelect)
    await sleep(1)
    await triggerClick(page, await page.$(myPointSelect))
    await sleep(3)
    const myPointPage = await getActivePage(browser)
    const myPointPageUrl = myPointPage.url()
    console.log("我的积分页面:", myPointPageUrl)
    const gotoSeeSelect = 'div.my-points-card:nth-child(4) div.buttonbox .big'
    await myPointPage.waitForSelector(gotoSeeSelect)
    await triggerClick(myPointPage, await myPointPage.$(gotoSeeSelect))
    await sleep(3)
    const examPage = await getActivePage(browser)
    const examUrl = examPage.url()
    if (examUrl != myPointPageUrl) {
        await examPage.addScriptTag({path: path.join(__dirname, 'inject/exam.js')})
        await sleep(70)
        await examPage.close()
    } else {
        console.log("点击我的积分后跳转:", examUrl)
    }
    await myPointPage.close()
}

export default run
