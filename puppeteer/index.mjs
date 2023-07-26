import puppeteer from "puppeteer";
import runLogin from './login.mjs'
import runArticle from './article.mjs'
import runVideo from './video.mjs'
import {createPage} from './utils.mjs'

(async () => {
    const browser = await puppeteer.launch({
        executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
        headless: false,
        defaultViewport: null,
        args: []
    });

    const page = await createPage(browser)
    {
        await runLogin(page, browser)
    }
    {
        //视频
        await runVideo(page, browser)
    }

    {
        // 文章
        await runArticle(page, browser)
    }

    //await browser.close();

})().catch(err => {
    console.error(err);
    process.exit(1);
});


