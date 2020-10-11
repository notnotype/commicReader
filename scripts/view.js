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
alertCount = 0;       //弹出alert的次数, 如果大于3 就不弹出了

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
 * @description 加载下一张
 */
function loadNextChapter(){
    // 如果不是最后一章或者currentChapter是0
    if ((loadedImgData[String(currentChapter)] && loadedImgData[String(currentChapter + 1)]) || currentChapter == 0) {
        currentChapter++;
        console.log("加载第" + currentChapter + "章");
        loadChapter(currentChapter);
        return;
    }
    
}

/**
 * @description process 进度, 一个坐标用来标识一部作品的图片位置
 * @return process = {"chapter":int, "vi"Link}
 */
function loadProcessFromCookies(){

}

/**
 * @param process 要跳转的进度
 */
function jump(process){

}

/**
 * @param chapterName 
 * @param imgData A list of to be loaded imgs
 */
function loadImg(chapterName, imgData){
    var pictureBox = document.getElementsByClassName("picture-box")[0];

    var newChapter = document.createElement("div");
    newChapter.setAttribute("class", "chapter");
    newChapter.setAttribute("name", chapterName);

    for (let vi = 0; vi < imgData.length; vi++) {
        let src = imgData[vi];
        let newImg = document.createElement("img")
        newImg.setAttribute("src", src);
        newImg.setAttribute("width", "100%");
        newImg.setAttribute("name", chapterName + "-" + String(vi));
        newChapter.appendChild(newImg);
    }

    pictureBox.appendChild(newChapter);
}
        
    

// request = new XMLHttpRequest();
// request.open("GET", "1.txt", true);

// request.onreadystatechange = function(){
//     if(request.readyState == 4){
//         console.log(request.responseText);
//     }
// };

// request.send();