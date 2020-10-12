/**
 * onload网页的交互(加载之后)
 * @name index-aft.js
 * @author Notype
 * @version 0.1.2
 * @update 20.10.11
 */


/**
 * @description 更新进度条
 */
function updateProcessBarAndTitle(){
    date = new Date;
    processBar.textContent = 
    "第" + currentChapter + "章: " +
    loadedImgData[currentChapter]["chapterName"] +
    "(" + currentProcess["vi"] + "/" + 
    loadedImgData[currentChapter]["imgData"].length +
    ") " +
    date.format("MM-dd hh:mm:ss");

    title.textContent = loadedImgData[currentChapter]["chapterName"];
}

addLoadEvent(function(){
    setInterval(updateProcessBarAndTitle, 1000);
})

