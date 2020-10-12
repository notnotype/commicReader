/**
 * 加载通用函数
 * init.js
 */

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
}   

 /**
 * window.onload增加函数
 * @param {function} func A function to be added window.onload
 */
function addLoadEvent(func){
    console.log("addLoadEvent");
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

    lightBotton = document.getElementsByClassName("light")[0];
    next = document.getElementsByClassName("next")[0];
    prev = document.getElementsByClassName("prev")[0];
}

addLoadEvent(loadElements)