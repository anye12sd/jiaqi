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
            console.log(result);
            var productName = getUrlParam("serviceId");
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
    console.log(name)
    var aSearch = [];
    result.forEach(function(ele){//循环外层数组
        console.log(ele.id);
        return ele.id.includes("1"); // 过滤符合要求的item数组
    });
    createHtml(aSearch);
    console.log(aSearch);
}

function createHtml(result){
    console.log(result)
    var html = "";
    for(var i = 0; i < result.length; i++){
            html += '<li class="pic1">\n' +
                '                        <a href="product_view.asp?Menuid=2&amp;id=4510" title="'+result[i].title+'">\n' +
                '                            <div class="pic1Img"><img src="'+result[i].imgUrl+'" alt="'+result[i].title+'" height="173" class="PicAuto" style="padding: 1px 0px;"></div>\n' +
                '                            <div class="pic1Hover" style="display: none;">'+result[i].title+'</div>\n' +
                '                        </a>\n' +
                '                    </li>'
        }
    console.log(html)
    $('.mainConList ul').html(html)
}