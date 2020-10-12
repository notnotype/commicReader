/**
 * 网页的交互(预加载)
 * @name index-pre.js
 * @author Notype
 * @version 0.1.2
 * @update 20.10.11
 */

isMenuOpened = false;
currentLight = 0;



/**
 * 显示隐藏的元素
 * 把去除<em>hidden</em>class
 * @param {element} elem The HTML element you to be popup
*/
function popupElement(elem){
    elem.setAttribute("class", elem.getAttribute("class").replace("hidden",""));
}

/**
 * 隐藏元素
 * @param {element} elem 
 */
function hiddenElement(elem){
    elem.setAttribute("class", elem.getAttribute("class") + " hidden");
}

/**
 * 单击页面弹出菜单
 * @returns global functionMenu, functionMenu
 */
function popupMenu(){
    popupElement(header);
    popupElement(functionMenu);
    isMenuOpened = true;
}

function hiddenMenu(){
    hiddenElement(header);
    hiddenElement(functionMenu);
    isMenuOpened = false;
}

/**
 * 改变屏幕亮度
 * @param {int} light ranged from 0 to 9
 */
function setLight(light){
    light = parseInt(light)
    mask.style.backgroundColor = "rgba(0,0,0,0." + light +")"
}


addLoadEvent(function(){
        // 开关菜单
        mask.addEventListener("click", function(){
            isMenuOpened?hiddenMenu():popupMenu()
        });
    
        // 夜间模式
        lightBotton.addEventListener("click", function(){
            if (currentLight == 0) {
                currentLight = 3;
            } else if(currentLight == 3) {
                currentLight = 6;
            } else if(currentLight == 6) {
                currentLight = 8;
            } else if(currentLight == 8) {
                currentLight = 0;
            }
            setLight(currentLight);
        })
})
