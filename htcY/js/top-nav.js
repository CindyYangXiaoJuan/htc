/**
 * Created by Yang_PC on 2017/10/5.
 */
//页面加载
$(function () {
    //鼠标进入
    $("#li_two").mouseenter(function () {
        //鼠标进入时显示,离开隐藏
        $(this).addClass("two").find("span").addClass("top_l_ul_hide").removeClass("top_l_ul_show");
        $(".hidden").css({"marginTop" : "0px", "zIndex" : 150}).slideDown(500);
    }).mouseleave(function () {  //鼠标离开
        $(this).find("span").addClass("top_l_ul_show").removeClass("top_l_ul_hide").end().removeClass("two");
        $(".hidden").css({"marginTop" : "36px"}).hide();
    });
});