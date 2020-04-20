$(function(){
    //请求参数
    var list = {};
    //
    $.ajax({
        //请求方式
        type : "GET",
        //请求的媒体类型
        contentType: "application/json;charset=UTF-8",
        //请求地址
        url : "../json/service.json",
        //请求成功
        success : function(result) {
            var productName = getUrlParam("serviceName") || "监控安装";
            if(productName){
                filterProduct(result,productName)
            }else{
                createHtml(result);
            }
        },
        //请求失败，包含具体的错误信息
        error : function(e){
            console.log(e.status);
            console.log(e.responseText);
        }
    });
});

function filterProduct(result,name){
    var aSearch = [];
    result.forEach(function(ele){//循环外层数组
        var aTemp = ele.item.filter(function(i){
            return i.name.includes(name); // 过滤符合要求的item数组
        });
        aSearch = aSearch.concat(aTemp); // 将符合要求的数组合并到aSearch;
    });
    createHtml(aSearch);
}

function createHtml(result){
    var html = "";
    for(var i = 0; i < result.length; i++){
            html += '<p class="service-title">'+result[i].name+'</p>\n' +
                '                <img src=".'+result[i].imgUrl+'" alt="">\n' +
                '                <p class="service-text">'+result[i].content+'</p>'
        }
    $('.service-box').html(html)
}