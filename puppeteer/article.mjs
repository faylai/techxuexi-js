import {sleep, getActivePage} from "./utils.mjs";
import path from 'path';
import url from 'url';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function run(page, browser) {
    // 重要新闻选择器
    const articleOpenSelector = "div[data-data-id=zonghe-news-title] span.linkSpan"
    await page.goto('https://www.xuexi.cn/index.html');
    await page.waitForSelector(articleOpenSelector)
    await page.click(articleOpenSelector)
    await sleep(3)
    const openListPage = await getActivePage(browser)
    console.log("综合新闻新闻的页面:", openListPage.url())
    const articleLinkSelector = 'div.text-link-item-title'
    await openListPage.waitForSelector(articleLinkSelector)
    const articleLinks = await openListPage.$$(articleLinkSelector)
    let counter = 0
    for (let link of articleLinks) {
        await openListPage.focus('body')
        await link.click()
        await sleep(3)
        const articlePage = await getActivePage(browser)
        await articlePage.addScriptTag({path: path.join(__dirname, 'inject/article.js')})
        await sleep(123)
        await articlePage.focus('body')
        await articlePage.close()
        counter++
        if (counter > 6) {
            break
        }
    }
    await sleep(3)
    try {
        await openListPage.close()
    } catch (err) {
        console.error(err);
    }
}

export default run
