/**
 * Created by Yang_PC on 2017/10/5.
 */
//页面加载
$(function () {
    $(window).scroll(function () {
        //判断当滚动大于顶部的导航时固定导航
        if ($(this).scrollTop() >= $(".top_nav").height()) {
            $(".nav").css({"position":"fixed", "top" :0, "zIndex" : 300});
            $(".content").css("marginTop", "40px");
        } else {
            $(".nav").css("position", "");
            $(".content").css("marginTop", "");
        }
    });
});