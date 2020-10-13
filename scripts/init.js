/**
 * 加载通用函数
 * init.js
 */

/**
 * replaceALL方法
 * @param {}} s1 
 * @param {*} s2 
 */
if (!"".replaceAll) {
    console.log("我知道你浏览器没有replaceAll方法");
    console.log("这种浏览器因该不是谷歌浏览器");
    console.log("看你怪可怜的, 我就勉为其难的为你浏览器写一个把");
};
String.prototype.replaceAll = function(s1, s2) {
    return this.replace(new RegExp(s1, "gm"), s2);
};

/**
 * 格式化date对象
 * @param {string} fmt 
 */
Date.prototype.format = function(fmt) { 
    var o = { 
       "M+" : this.getMonth()+1,                 //月份 
       "d+" : this.getDate(),                    //日 
       "h+" : this.getHours(),                   //小时 
       "m+" : this.getMinutes(),                 //分 
       "s+" : this.getSeconds(),                 //秒 
       "q+" : Math.floor((this.getMonth()+3)/3), //季度 
       "S"  : this.getMilliseconds()             //毫秒 
   }; 
   if(/(y+)/.test(fmt)) {
           fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
   }
    for(var k in o) {
       if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
   return fmt; 
};

/**
 * 
 * @param {*} func 
 */
function insertAfter(newEl, targetEl){
    var parentEl = targetEl.parentNode;
    if(parentEl.lastChild == targetEl){
        parentEl.appendChild(newEl);
    }else{
        parentEl.insertBefore(newEl,targetEl.nextSibling);
    }            
}



 /**
 * window.onload增加函数
 * @param {function} func A function to be added window.onload
 */
function addLoadEvent(func){
    // console.log("addLoadEvent");
    var oldLoadEvent = window.onload;
    if(typeof window.onload != "function"){
        window.onload = func;
    } else {
        window.onload = function(){
        oldLoadEvent();
        func();
        }
    }
}

function loadElements(){
    commicReader = document.getElementsByClassName("commic-reader")[0];
    functionMenu = document.getElementsByClassName("functions")[0];
    header = document.getElementsByTagName("header")[0];
    mask = document.getElementsByClassName("mask")[0];
    processBar = document.getElementsByClassName("process-bar")[0];
    title = document.getElementsByClassName("title")[0];
    settings = document.getElementsByClassName("settings")[0];
    catalog = document.getElementsByClassName("catalog")[0];
    pictureBox = document.getElementsByClassName("picture-box")[0];
    catalogList = document.getElementsByClassName("catalog-list")[0];
    settingsList = document.getElementsByClassName("settings-list")[0];

    lightBotton = document.getElementsByClassName("light")[0];
    next = document.getElementsByClassName("next")[0];
    prev = document.getElementsByClassName("prev")[0];
}

addLoadEvent(loadElements)