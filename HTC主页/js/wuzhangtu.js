/**
 * Created by Administrator on 2017/10/14 0014.
 */
$(function(){
    //������,͸���ȱ��0.8.
    $(".big #dv ul>li").mouseenter(function(){
        $(this).css("opacity",1).siblings().css("opacity",0.8);
    });
    //����뿪,͸���Ȼָ���1.
    $(".big #dv ul>li").mouseleave(function(){
        $(this).css("opacity",0.8);
    });

    $(".min input").mouseenter(function(){
        $(this).css("backgroundColor","#333").css("color","#fff");
    }).mouseleave(function(){
        $(this).css("backgroundColor","#ccc").css("color","#333");
    });

});