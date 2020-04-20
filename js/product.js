var productName = getUrlParam("productName") || "";
var currentPage = getUrlParam("page") || 1;
$(function(){
    //请求参数
    var ajaxUrl;
    if(productName){
        ajaxUrl = "../json/product.json"
    }else{
        ajaxUrl = "../json/product_all.json"
    }
    //
    $.ajax({
        //请求方式
        type : "GET",
        //请求的媒体类型
        contentType: "application/json;charset=UTF-8",
        //请求地址
        url : ajaxUrl,
        //请求成功
        success : function(result) {
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
            return i.title.includes(name); // 过滤符合要求的item数组
        });
        aSearch = aSearch.concat(aTemp); // 将符合要求的数组合并到aSearch;
    });
    createHtml(aSearch);
}

function createHtml(result){
    console.log(result)
    var html = "";
    for(var i = 12*(currentPage - 1); i < (12*currentPage < result.length ? 12*currentPage : result.length) ; i++){
            html += '<li class="pic1">\n' +
                '                        <a href="product_view.html?productId='+result[i].product_id+'&amp;id='+result[i].ID+'" title="'+result[i].title+'">\n' +
                '                            <div class="pic1Img"><img src="'+result[i].imgUrl+'" alt="'+result[i].title+'" height="173" class="PicAuto" style="padding: 1px 0px;"></div>\n' +
                '                            <div class="pic1Hover" style="display: none;">'+result[i].title+'</div>\n' +
                '                        </a>\n' +
                '                    </li>'
        }
    $('.mainConList ul').html(html)

    $(".mainConList li").mouseenter(function(){
        $(this).find(".pic1Hover").stop(true).fadeIn();
    })

    $(".mainConList li").mouseleave(function(){
        $(this).find(".pic1Hover").stop(true).fadeOut();
    })

    createPage(result);
}

var allPage;
function createPage(result){
    var resultPage = result.length;
    allPage = Math.ceil(resultPage/12) || 1;
    var pageHtml = "";
    var pageOption = "";
    for(var i = 1; i <= allPage ; i++){
        if(i == currentPage){
            pageOption += '<option value="'+i+'" selected="true">'+i+'</option>'
        }else{
            pageOption += '<option value="'+i+'">'+i+'</option>'
        }
    }

    pageHtml += '<form style="margin:0;" action="">\n' +
        '                    共<span class="red">'+resultPage+'</span>条记录\n' +
        '                    每页<span class="red">12</span>条记录\n' +
        '                    当前第<span class="red">'+currentPage+'</span>/<span class="red2">'+allPage+'</span>页&nbsp;\n' +
        '                    <span class="gray" onclick="toIndex()">首页</span>&nbsp;&nbsp;<span class="gray" onclick="toPreviout()">上一页</span>&nbsp;\n' +
        '                    <span class="gray" onclick="toNext()">下一页</span>&nbsp;&nbsp;<span class="gray" onclick="toLast()">末页</span>&nbsp;&nbsp;\n' +
        '                    <select onchange="selectToUrl(this)" id="pageNum">\n' +
        '                        '+pageOption+'\n' +
        '                    </select>\n' +
        '                </form>'

    $("#showpage").html(pageHtml)
}

function selectToUrl(obj){
    var selectedPage = $("#pageNum option:selected").val()
    location.href = "product.html?productName="+productName+"&page="+selectedPage+""
}

function toIndex(){
    location.href = "product.html?productName="+productName+"&page=1"
}

function toPreviout(){
    currentPage = currentPage == 1 ? 1 : --currentPage;
    location.href = "product.html?productName="+productName+"&page="+currentPage+""
}

function toNext(){
    currentPage = currentPage == allPage ? allPage : ++currentPage;
    location.href = "product.html?productName="+productName+"&page="+currentPage+""
}

function toLast(){
    location.href = "product.html?productName="+productName+"&page="+allPage+""
}