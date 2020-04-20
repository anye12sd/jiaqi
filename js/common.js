$(function(){
    $(".navgrp li").mouseover(function(){
        $(this).find(".navChild").stop(true).slideDown();
    })

    $(".navgrp li").mouseleave(function(){
        $(this).find(".navChild").stop(true).slideUp();
    })
})

//获取url中的参数
function getUrlParam(name) {
    // 获取参数
    var url = window.location.search;
    // 正则筛选地址栏
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    // 匹配目标参数
    var result = url.substr(1).match(reg);
    //返回参数值
    return result ? decodeURIComponent(result[2]) : null;
}