/**
 * Created by Yang_PC on 2017/10/8.
 */
//页面加载
$(function () {
    $("#prodoct_ul>li").mouseenter(function () {
        //显示边框
        $(this).css({"border" : "2px solid #666"});
        //改变样式
        $(this).find("img").animate({"height" :　"210px", "width" : "210px"}).end().find("span").css("opacity", "1");
    }).mouseleave(function () {
        //隐藏即透明化边框
        $(this).css({"border" : "2px solid transparent"});
        $(this).find("img").animate({"height" :　"200px", "width" : "200px"}).end().find("span").css("opacity", "0");
    });
});
