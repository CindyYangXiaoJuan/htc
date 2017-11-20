/**
 * Created by Administrator on 2017/10/14 0014.
 */
$(function(){
    //鼠标进入,透明度变成0.8.
    $(".big #dv ul>li").mouseenter(function(){
        $(this).css("opacity",1).siblings().css("opacity",0.8);
    });
    //鼠标离开,透明度恢复到1.
    $(".big #dv ul>li").mouseleave(function(){
        $(this).css("opacity",0.8);
    });

    $(".min input").mouseenter(function(){
        $(this).css("backgroundColor","#333").css("color","#fff");
    }).mouseleave(function(){
        $(this).css("backgroundColor","#ccc").css("color","#333");
    });

});