/**
 * 漫画阅读器
 * 
 * 每次请求一次性加载服务器下的全部json文件
 * 缺陷: 不能阅读其他漫画
 * @name view.js 
 * @description 漫画阅读器js
 * @author Notype
 * @version 0.1
 * @update 20.10.11
 */

nowCommic = "relife";
currentChapter = 0;
loadedImgData = {};   // {chapterIndex:{chapterName:"", imgData:[,,,]},,,}
alertCount = 0;       // 弹出alert的次数, 如果大于3 就不弹出了
currentProcess = {}   // {"chapterIndex":int, "vi": int}
loadedChapter = {}    // 已经加载进html的章节 {"chapterIndex":}

/**
 * 从服务器获得json数据,存入loadedImgData
 * 此方法没有考虑服务器负载
 * 直接把全部json文件下载
 * @param {*} chapterIndex 
 */
function getImgDataFromServer(){
    request = new XMLHttpRequest();
    request.open("GET", "ReLIFE.json", false);

    request.onreadystatechange = function(){
        if(request.readyState == 4){
            recved = request.responseText;
            loadedImgData = JSON.parse(recved);
            // console.log("loaded IMgData: " + loadedImgData);
        }
};
request.send();
}
/**
 * @param chapterName 
 * @param imgData A list of to be loaded imgs
 */
function loadImg(chapterIndex, imgData){
    chapterName = loadedImgData[chapterIndex]["chapterName"];
    var newChapter = document.createElement("div");
    newChapter.setAttribute("class", "chapter");
    newChapter.setAttribute("id", chapterName);

    for (let vi = 0; vi < imgData.length; vi++) {
        let src = imgData[vi];
        let newImg = document.createElement("img")
        newImg.setAttribute("src", src);
        newImg.setAttribute("width", "100%");
        newImg.setAttribute("id", chapterName + "-" + String(vi));
        newChapter.appendChild(newImg);
    }
    // 为图片追踪进度
    addIntersectionObserverForImgs(newChapter.childNodes);

    var chapterId = loadedImgData[currentChapter]["chapterName"];
    var currentChapterElem = document.getElementById(chapterId);

    // 判断插前面还是后面
    if (loadedChapter[chapterIndex]) {
        return;
    }
    if (Math.max(...Object.keys(loadedChapter)) > currentChapter) { 
        insertAfter(newChapter,currentChapterElem);
    } else {
        pictureBox.insertBefore(newChapter, currentChapterElem)
    }

    loadedChapter[String(currentChapter)] = true;
    pictureBox.appendChild(newChapter);
    return true;
}
/**
 * @description 加载 charpterIndex章
 * @param chapterIndex 要加载的章
 */
function loadChapter(chapterIndex){
    if (!loadedImgData[String(currentChapter + 1)]) {
        if(alertCount <= 3){
            alert("完了");
            alertCount ++;
        }
        return;
    }
    if (loadedChapter[chapterIndex]) {
        return;
    }

    
    var imgData = loadedImgData[chapterIndex]["imgData"];
    var newChapter = document.createElement("div");
    var chapterName = loadedImgData[chapterIndex]["chapterName"]
    newChapter.setAttribute("class", "chapter");
    newChapter.setAttribute("id", chapterName);

    for (let vi = 0; vi < imgData.length; vi++) {
        let src = imgData[vi];
        let newImg = document.createElement("img")
        newImg.setAttribute("src", src);
        newImg.setAttribute("width", "100%");
        newImg.setAttribute("id",  chapterName + "-" + String(vi));
        newChapter.appendChild(newImg);
    }
    // 为图片追踪进度
    addIntersectionObserverForImgs(newChapter.childNodes);

    var listOfLoadedChapter = Object.keys(loadedChapter);
    for (let index = 0; index < listOfLoadedChapter.length; index++) {
        var theChapterIndex = listOfLoadedChapter[index];
        // console.log(theChapterIndex +"   " + chapterIndex)
        if (theChapterIndex > chapterIndex) {
            var theNode = 
                document.getElementById(loadedImgData[theChapterIndex]["chapterName"]);
            pictureBox.insertBefore(newChapter, theNode);
            loadedChapter[chapterIndex] = true;
            return true;
        } 
    }
    // console.log("appendChild")
    pictureBox.appendChild(newChapter);
    loadedChapter[chapterIndex] = true;
    
    return true;

}

/**
 * @description 加载下一章
 */
function loadNextChapter(){
    // 如果不是最后一章或者currentChapter是0
    if ((loadedImgData[String(currentChapter)] && loadedImgData[String(currentChapter + 1)]) || currentChapter == 0) {
        currentChapter++;
        console.log("加载第" + currentChapter + "章");
        if (!loadChapter(currentChapter)){
            return;
        }
        loadedChapter[String(currentChapter)] = true;
        return;
    }
}

/**
 * @description process 进度, 一个坐标用来标识一部作品的图片位置
 * @return process = {"chapterIndex":int, "vi": int}
 */
function loadProcessFromCookies(){

}

/**
 * @param process 要跳转的进度
 */
function jump(process){
    var chapterIndex = process["chapterIndex"];
    var vi = process["vi"];

    loadChapter(chapterIndex);    

    var imgData = loadedImgData[chapterIndex]
    var imgId = imgData["chapterName"] + "-" + vi;
    // console.log(imgId);
    targetImg = document.getElementById(imgId);
    targetImg.scrollIntoView({"behavior":"smooth","block":"start"});
}

/**
 * 追踪vi更新当前进度
 * @param {list}} imgs 
 */
function addIntersectionObserverForImgs(imgs){
    if(!IntersectionObserver){
        alert("傻逼,你浏览器太垃圾了,给老子滚!");
        return;
    }

    var options = {
        threshold: 0.6, 
    };
    var callback = function(entries, observer) { 
        entries.forEach(entry => {
            var img = entries[entries.length-1].target;
            // console.log(img)

            // 更新进度
            id = img.getAttribute("id");
            temp = id.indexOf("-");
            currentProcess = {"chapterIndex": parseInt(id.substring('6')),
             "vi": id.substring(temp + 1,id.length + 1)};
             var currentChapterIndex = currentProcess["chapterIndex"]
        });
    };
    var observer = new IntersectionObserver(callback, options);
    imgs.forEach(function(img){
        observer.observe(img);
    });
}

/**
 * 网页的滚动事件处理
 * @name scroll.js
 * @author Notype
 * @version 0.1.0
 * @update 20.10.11
 */

/**
 * 滚动加载
 */
function scrollBottomOrTop() {
    var clientsHeight = 
    window.innerHeight ||
     document.documentElement.clientHeight ||
      document.body.clientHeight;

    var scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);

    var wholeHeight = document.documentElement.scrollHeight;

    if ((clientsHeight + scrollTop + 100)  >= wholeHeight) {
        console.log("scroll to bottom");
        loadChapter(currentProcess["chapterIndex"] + 1);
    }

    if (scrollTop == 0) {
        console.log("scroll to top");
    }
}



// 注册事件
window.onscroll = function () {
    scrollBottomOrTop();
}
// 加载imgData
addLoadEvent(getImgDataFromServer);
// 加载第一章
addLoadEvent(function(){
    loadChapter(1);
})
// 下滑动画
addLoadEvent(function(){
    var img1 = document.getElementById("report1 海崎新太(27)无业 -0");
    var img2 = document.getElementById("report1 海崎新太(27)无业 -2");
    // console.log("img1: " + img1);
    // console.log("img2: " + img2);
    img2.scrollIntoView({"behavior":"smooth","block":"start"});

    sign = 0;
    job = setInterval(() => {
        if(sign >= 1){
            img1.scrollIntoView({"behavior":"smooth","block":"start"});
            clearInterval(job);
        } else {
            img2.scrollIntoView({"behavior":"smooth","block":"start"});
            sign++;
        }
    }, 300);
})