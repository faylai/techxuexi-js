(function () {
    let scrollLength = document.documentElement.scrollHeight / 2;
    let readTime = 100
    let time = 1
    let readingInterval = setInterval(function () {
        time++;
        document.documentElement.scrollTop = scrollLength * time / readTime;
        if (time <= 0) {
            clearInterval(readingInterval);

        }
        console.log("正在阅读")
    }, 1000);

})()
