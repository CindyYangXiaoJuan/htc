/**
 * Created by sss on 2017/10/8.
 */
//固定导航栏
$(function () {
    $(window).scroll(function () {
        if ($(this).scrollTop() >= $("#nav").height()) {
            $("#topBar").css("position", "fixed").css("top", 0);
            $("#box").css("marginTop", $("#topBar").height());
        } else {
            $("#topBar").css("position", "").css("top", "");
            $("#box").css("marginTop", 0);
        }
    });
});
//六件事
$(function () {
    $(".six").find("img").mouseenter(function () {
        $(this).css("opacity",1);
    }).mouseleave(function () {
        $(this).css("opacity",0.75);
    });
    $(".six").find("a").mouseenter(function(){
        $(this).css("color","#69b40f");
    }).mouseleave(function () {
        $(this).css("color","");
    });
});


//<!--话题栏-->
$(function () {
    //隔行变色
    $(".article dd:odd").css("backgroundColor", "#f9f9f9");
    $(".article dd:even").css("backgroundColor", "");
    //鼠标进入高亮显示
    $("#color").find("dd").mouseenter(function () {
        $(this).css("color", "#69b40f");
    }).mouseleave(function () {
        $(this).css("color", "");
    });
});

