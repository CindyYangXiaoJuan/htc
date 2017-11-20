/**
 * Created by Yang_PC on 2017/10/5.
 */
//页面加载事件
$(function () {
    //点击事件
    $("#bot_img").click(function () {
        //点击让底部显示
        $(".bottom").css({"display" : "block", "bottom" : "-709px"});
        $("#bot_btn").css("diaplay", "block").siblings().css("opacity", 1);
        $("#btn").css("display", "none");
    });
    //点击事件
    $("#bot_img1").click(function () {
        //点击时隐藏
        $(".bottom").css({"display" : "none"});
        $("#bot_btn").css("diaplay", "none").siblings().css("opacity", 0);
        $("#btn").css("display", "block");
    });
});