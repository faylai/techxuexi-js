(function () {
    //获取答题按钮
    function getNextButton() {
        return new Promise(function (resolve) {
            let nextInterVal = setInterval(() => {
                let nextAll = document.querySelectorAll(".ant-btn");
                let next = nextAll[0];
                if (nextAll.length == 2) {
                    next = nextAll[1];
                }
                if (next.textContent) {
                    clearInterval(nextInterVal);//停止定时器
                    resolve(next);
                }
            }, 800);
        })
    }

    //暂停锁
    function doingPause() {
        return new Promise(function (resolve) {
            setTimeout(function () {
                console.log("等待")
                resolve('done');
            }, 500);
        })
    }

    /**
     * 随机等待最小到最大之间几秒, 需要await
     * @param {number} minSecond 最短时长
     * @param {number} MaxSecond 最长时长
     * @returns Promise
     */
    function waitRandomBetween(minSecond = 2, MaxSecond = 5) {
        if (MaxSecond <= minSecond) {
            MaxSecond = minSecond + 3
        }

        let waitTime = Math.floor(Math.random() * (MaxSecond * 1000 - minSecond * 1000) + minSecond * 1000)
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log(`随机等待${waitTime / 1000}秒`)
                resolve()
            }, waitTime)
        })
    }

    async function doingExam() {
        let nextButton = null;
        let qNum = 0;//题号,第一题从0开始算
        let shouldSaveAnswer = false;
        while (true) {
            //先等等再开始做题
            await waitRandomBetween(3, 8);
            await doingPause();
            nextButton = await getNextButton();
            if (document.getElementsByClassName('nc_iconfont btn_slide')[0] != null) {
                throw new Error("机器验证检测出现，退出")
            }
            if (nextButton.textContent == "再练一次" || nextButton.textContent == "再来一组" || nextButton.textContent == "查看解析") {
                break;
            }
            try {
                document.querySelector(".tips").click();
            } catch (e) {
                console.log(e);
            }
            //所有提示
            let allTips = document.querySelectorAll("font[color=red]");
            await waitRandomBetween(2, 3);
            //选项按钮
            let allbuttons = document.querySelectorAll(".q-answer");
            //获取所有填空
            let blanks = document.querySelectorAll("input[type=text][class=blank]");
            try {
                //获取问题类型
                var questionType = document.querySelector(".q-header").textContent;
                questionType = questionType.substr(0, 3)
            } catch (e) {
            }
            let results = [];
            switch (questionType) {
                case "填空题": {
                    //第几个填空
                    let inputBubblesEvent = new Event('input', {bubbles: true});
                    if (blanks.length > 1) {//如果有多个填空
                        if (allTips.length == 0) {//
                            // 如果没有提示，先获取看看有没有答案
                            console.log("没有答案提示")
                        } else if (allTips.length == blanks.length) {
                            //如果填空数量和提示数量一致
                            for (let i = 0; i < allTips.length; i++) {
                                //将答案填写到对应的空中
                                let answer = allTips[i].textContent;
                                if (answer && answer.length > 0) {
                                    blanks[i].setAttribute("value", answer);
                                    blanks[i].dispatchEvent(inputBubblesEvent);
                                } else {
                                    //发生了错误，只好随便填一下
                                    blanks[i].setAttribute("value", i);
                                    blanks[i].dispatchEvent(inputBubblesEvent);
                                }
                            }
                        } else if (allTips.length > blanks.length) {
                            //若提示数量比填空的数量多
                            //直接将所有答案整合填进去
                            let answer = "";
                            for (let i = 0; i < allTips.length; allTips++) {
                                answer += allTips[i].textContent();
                            }
                            for (let j = 0; j < blanks.length; j++) {
                                blanks[j].setAttribute("value", answer);
                                blanks[j].dispatchEvent(inputBubblesEvent);
                            }
                        } else {
                            //一般不会跑到这，如果到这了输出一下，表示惊讶
                            console.log("居然跑到了这里")
                        }
                    } else if (blanks.length == 1) {//只有一个空，直接把所有tips合并。
                        let answer = "";
                        if (allTips.length != 0) {//如果有提示
                            for (let i = 0; i < allTips.length; i++) {
                                answer += allTips[i].textContent;
                            }
                        } else {
                            console.log("没有答案提示")
                        }
                        blanks[0].setAttribute("value", answer);
                        blanks[0].dispatchEvent(inputBubblesEvent);
                        break;
                    } else {
                        //怕有没空白的情况。
                    }
                    break;
                }
                case "多选题": {
                    results = [];
                    let hasButton = false;
                    for (let i = 0; i < allTips.length; i++) {
                        let tip = allTips[i];
                        let answer = tip.textContent;
                        if (answer && answer.length > 0) {
                            for (let j = 0; j < allbuttons.length; j++) {
                                //获取按钮
                                let selectButton = allbuttons[j];
                                //获取按钮的上的答案
                                let buttonAnswer = selectButton.textContent;
                                if (buttonAnswer == answer || buttonAnswer.indexOf(answer) != -1 || answer.indexOf(buttonAnswer) != -1) {
                                    hasButton = true;
                                    if (selectButton.className.indexOf("chosen") < 0) {
                                        selectButton.click();
                                    }
                                    break;
                                }
                            }
                        }
                    }
                    if (!hasButton) {
                        allbuttons[0].click();
                    }
                    break;
                }
                case "单选题": {
                    let results = [];
                    let answer = "";
                    for (let i = 0; i < allTips.length; i++) {
                        answer += allTips[i].textContent;
                    }
                    if (answer && answer.length > 0) {
                        let hasButton = false;
                        for (let i = 0; i < allbuttons.length; i++) {
                            let radioButton = allbuttons[i];
                            let buttonAnswer = radioButton.textContent;
                            //对比答案
                            if (buttonAnswer == answer || buttonAnswer.indexOf(answer) != -1 || answer.indexOf(buttonAnswer) != -1) {
                                hasButton = true;
                                radioButton.click();
                                break;
                            }
                        }
                        if (!hasButton) {
                            //没找到按钮，随便选一个
                            allbuttons[0].click();
                        }
                    } else {
                        //没答案，随便选一个
                        try {
                            allbuttons[0].click();
                        } catch (e) {
                            console.log(e);
                        }
                    }
                    break;
                }
                default:
                    break;
            }
            qNum++;
            nextButton = await getNextButton();
            if (nextButton.textContent != "再练一次" && nextButton.textContent != "再来一组" && nextButton.textContent != "查看解析") {
                nextButton.click();
                if (shouldSaveAnswer) {//如果应该保存答案
                    let answerTemp = document.getElementsByClassName("answer")[0].innerText;
                    let reg = new RegExp(' ', "g")
                    let answer = "";
                    try {//从字符串中拿出答案
                        answer = answerTemp.split("：")[1];
                        answer = answer.replace(reg, ";");
                    } catch (e) {
                        answer = answerTemp;
                    }
                    shouldSaveAnswer = false;
                }
            } else {
                //已经做完，跳出循环
                break;
            }
        }
    }

    doingExam()
})()

