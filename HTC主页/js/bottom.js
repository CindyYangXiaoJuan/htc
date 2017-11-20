/**
 * Created by Administrator on 2017/10/4 0004.
 */
$(function(){
    for(var i=0;i<3;i++){
        $(".bm>ul>li:eq("+i+")").mouseenter(function(){

          $(this).find(".tb").css("marginLeft",-85);
        }).mouseleave(function(){
            $(this).find(".tb").css("marginLeft",0);
        });
    }
    for(var i=3;i<6;i++){
        $(".bm>ul>li:eq("+i+")").mouseenter(function(){
            $(this).css("opacity",0.8).siblings().css("opacity",1);
        }).mouseleave(function(){
            $(this).css("opacity",1);
        });
    }
    $(".bm").find("input").mouseenter(function(){
        $(this).css("backgroundColor","#333").css("color","#fff");
    }).mouseleave(function(){
        $(this).css("backgroundColor","#bbc5ac").css("color","#333");
    });

});
