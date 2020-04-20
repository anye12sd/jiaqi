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
        url : "./json/service.json",
        //请求成功
        success : function(result) {
            console.log(result);
            createHtml(result);
        },
        //请求失败，包含具体的错误信息
        error : function(e){
            console.log(e.status);
            console.log(e.responseText);
        }
    });
});

function createHtml(result){
    var html = "";
    for(var i = 0; i < result.length; i++){
        html += '<li>\n' +
            '                        <a href="./pages/service.html?serviceName='+result[i].item[0].name+'">\n' +
            '                            <div class="pic">\n' +
            '                                <img src="'+result[i].item[0].imgUrl+'" alt="'+result[i].item[0].name+'" width="316" height="233" class="PicAuto" style="padding: 0px;">\n' +
            '                                <div class="picHover">'+result[i].item[0].name+'</div>\n' +
            '                            </div>\n' +
            '                        </a>\n' +
            '                    </li>'
    }
    $('.product-ul ul').html(html)
}