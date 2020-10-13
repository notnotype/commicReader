/**
 * onload网页的交互(加载之后)
 * @name index-aft.js
 * @author Notype
 * @version 0.1.2
 * @update 20.10.11
 */

 /**
  * 生成catalog-list
  */
 function generateCatalogList(){
    var innerHtml = "";
    for (const key in loadedImgData) {
        if (loadedImgData.hasOwnProperty(key)) {
            // <li><a href="javascript:jump({'chapterIndex': 1, 'vi':0});">第一章</a></li>
            const theChapter = loadedImgData[key];
            var theChapterName = theChapter["chapterName"];
            var theChapterIndex = key;
            var theInnerHtml = "<li><a href=\"javascript:jump({\'chapterIndex\': "+
            theChapterIndex+
            ", \'vi\':0});\"> "+
            theChapterName +
            "</a></li>";
            innerHtml = innerHtml + theInnerHtml;
        }
    }
    // console.log(innerHtml);
    catalogList.innerHTML = innerHtml;
 }

/**
 * @description 更新进度条
 */
function updateProcessBarAndTitle(){
    date = new Date;
    processBar.textContent = 
    loadedImgData[currentProcess["chapterIndex"]]["chapterName"] +
    "(" + (parseInt(currentProcess["vi"]) + 1) + "/" + 
    loadedImgData[currentProcess["chapterIndex"]]["imgData"].length +
    ") " +
    date.format("hh:mm:ss");

    title.textContent = loadedImgData[currentProcess["chapterIndex"]]["chapterName"];
}

addLoadEvent(function(){
    setInterval(updateProcessBarAndTitle, 100);
})

addLoadEvent(function(){
    next.addEventListener("click", function(){
        jump({"chapterIndex": currentProcess["chapterIndex"] + 1, "vi":0});
    })
})

addLoadEvent(function(){
    prev.addEventListener("click", function(){
        jump({"chapterIndex": currentProcess["chapterIndex"] - 1, "vi":0});
    })
})

addLoadEvent(generateCatalogList);