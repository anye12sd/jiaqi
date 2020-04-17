$(function(){
    $(".navgrp li").mouseover(function(){
        $(this).find(".navChild").stop(true).slideDown();
    })

    $(".navgrp li").mouseleave(function(){
        $(this).find(".navChild").stop(true).slideUp();
    })
})
