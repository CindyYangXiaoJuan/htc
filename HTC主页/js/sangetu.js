/**
 * Created by Administrator on 2017/10/14 0014.
 */
$(function(){
    //鼠标进入,透明度变成0.8.
    $(".content ul>li").mouseenter(function(){
        $(this).css("opacity",0.8).siblings().css("opacity",1);
        //鼠标离开,透明度变成1.
    }).mouseleave(function(){
        $(this).css("opacity",1);
    });
});