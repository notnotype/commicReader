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
            console.log("loaded IMgData: " + loadedImgData);
        }
};

request.send();
}

/**
 * @description 加载到 charpterIndex章
 * @param chapterIndex 要加载的章
 */
function loadChapter(chapterIndex){
    if (!loadedImgData[String(currentChapter + 1)]) {
        if(alertCount <= 3){
            alert("完了");
            alertCount ++;
        }
        return null;
    }

    if (loadedImgData) {
        var imgData = loadedImgData[String(chapterIndex)];
        var chapterName = imgData["chapterName"];
        var imgData = imgData["imgData"];
        loadImg(chapterName, imgData)
    }else{
        alert("未从服务器加载ImgData.json")
    }

}

/**
 * @description 加载下一章
 */
function loadNextChapter(){
    // 如果不是最后一章或者currentChapter是0
    if ((loadedImgData[String(currentChapter)] && loadedImgData[String(currentChapter + 1)]) || currentChapter == 0) {
        currentChapter++;
        console.log("加载第" + currentChapter + "章");
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
    chapterIndex = process["chapterIndex"];
    vi = process["vi"];

    

    var imgData = loadedImgData[chapterIndex]
    var imgId = imgData["chapterName"] + "-" + vi;
    console.log(imgId);
    targetImg = document.getElementById(imgId);
    targetImg.scrollIntoView({"behavior":"smooth","block":"start"});
}

/**
 * 追踪更新当前进度
 * @param {list}} imgs 
 */
function addIntersectionObserverForImgs(imgs){
    if(!IntersectionObserver){
        alert("傻逼,你浏览器太垃圾了,给老子滚");
        return;
    }

    var options = {
        threshold: 0.6, 
    };
    var callback = function(entries, observer) { 
        entries.forEach(entry => {
            img = entries[entries.length-1].target;
            console.log(img.getAttribute("id"));

            // 更新进度
            id = img.getAttribute("id");
            temp = id.indexOf("-");
            currentProcess = {"chapterIndex": currentChapter,
             "vi": id.substring(temp + 1,id.length + 1)};
        });
    };
    var observer = new IntersectionObserver(callback, options);
    imgs.forEach(function(img){
        observer.observe(img);
    });
}

/**
 * @param chapterName 
 * @param imgData A list of to be loaded imgs
 */
function loadImg(chapterName, imgData){
    var pictureBox = document.getElementsByClassName("picture-box")[0];

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

    pictureBox.appendChild(newChapter);
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

    var wholeHeight = Math.max(document.body.scrollHeight + document.documentElement.scrollHeight);

    if ((clientsHeight + scrollTop) * 3 >= wholeHeight) {
        console.log("scroll to bottom");
        loadNextChapter();
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
addLoadEvent(loadNextChapter)