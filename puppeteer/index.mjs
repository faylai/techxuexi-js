import puppeteer from "puppeteer";
import runLogin from './login.mjs'
import runArticle from './article.mjs'
import runVideo from './video.mjs'
import runExam from './exam.mjs'
import {createPage, sleep} from './utils.mjs'

(async () => {
    const browser = await puppeteer.launch({
        executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
        userDataDir: 'D:\\temp\\puppeteer',
        headless: false,
        defaultViewport: null,
        args: []
    });

    let taskStatus = ['去看看', '去看看', '去看看', '去看看']

    function isTaskDone(index) {
        return taskStatus[index] == '已完成'
    }

    const page = await createPage(browser)
    {
        await runLogin(page, browser)
    }

    {
        // 获取任务状态
        try {
            const pointPage = await browser.newPage()
            await pointPage.goto('https://pc.xuexi.cn/points/my-points.html')
            await sleep(3)
            const pointCardSelector = '.my-points-card div.big'
            await pointPage.waitForSelector(pointCardSelector)
            taskStatus = await pointPage.evaluate(function (selector) {
                let status = []
                document.querySelectorAll(selector).forEach(function name(item) {
                    status.push(String(item.innerText).trim())
                })
                return status
            }, pointCardSelector)
            console.log('任务状态：', taskStatus)
            await pointPage.close()
            await sleep(3)
        } catch (err) {
            console.error(err)
        }
    }

    {
        // 今日答题
        /*
        try {
            if (!isTaskDone(3)) {
                await runExam(page, browser)
            }
        } catch (err) {
            console.error(err)
        }

         */
    }


    {
        //视频
        try {
            if (!isTaskDone(2)) {
                await runVideo(page, browser)
            }
        } catch (err) {
            console.error(err)
        }

    }

    {
        // 文章
        try {
            if (!isTaskDone(1)) {
                await runArticle(page, browser)
            }
        } catch (err) {
            console.error(err)
        }
    }


    //await browser.close();

    console.log("学习完成")

})().catch(err => {
    console.error(err);
    process.exit(1);
});


