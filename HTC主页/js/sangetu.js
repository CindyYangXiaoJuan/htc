/**
 * Created by Administrator on 2017/10/14 0014.
 */
$(function(){
    //������,͸���ȱ��0.8.
    $(".content ul>li").mouseenter(function(){
        $(this).css("opacity",0.8).siblings().css("opacity",1);
        //����뿪,͸���ȱ��1.
    }).mouseleave(function(){
        $(this).css("opacity",1);
    });
});