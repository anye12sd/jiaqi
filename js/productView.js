var productId = getUrlParam("productId");
var id = getUrlParam("id");

$.ajax({
    //请求方式
    type : "GET",
    //请求的媒体类型
    contentType: "application/json;charset=UTF-8",
    //请求地址
    url : '../json/product.json',
    //请求成功
    success : function(result) {
        createHtml(result);
    },
    //请求失败，包含具体的错误信息
    error : function(e){
        console.log(e.status);
        console.log(e.responseText);
    }
});

function createHtml(result){
    var html = "";
    var aSearch = [];
    result.forEach(function(ele){//循环外层数组
        var aTemp = ele.item.filter(function(i){
            return i.ID.includes(id)&&i.product_id.includes(productId); // 过滤符合要求的item数组
        });
        aSearch = aSearch.concat(aTemp); // 将符合要求的数组合并到aSearch;
    });
    html += '<title>'+aSearch[0].title+'_佳奇网络科技</title>\n' +
        '                <div class="title">'+aSearch[0].title+'</div>\n' +
        '                <div class="pic"><img src="'+aSearch[0].imgUrl+'" alt="群晖 FlashStation FS6400" class="PicLoad" width="600" style="display: inline;"></div>\n' +
        '                <div class="con">\n' +
        '                    <p>\n' +
        '                        详情可参考：<a href="'+aSearch[0].link+'" target="_blank">'+aSearch[0].link+'</a>\n' +
        '                    </p>\n' +
        '                    <p>\n' +
        '                        <img src="'+aSearch[0].moreImgUrl+'" alt="">\n' +
        '                    </p>\n' +
        '                </div>'
    $(".mainContect").html(html)
}