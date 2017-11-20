/**
 * Created by Administrator on 2017/9/26 0026.
 */
$(function(){
    //根据ul中li的个数,创建ol中的li
    for(var i=0;i<$("#big>#img>ul>li").length;i++){
        $("<li></li>").appendTo($("#big>#img>ol")).css("backgroundColor","#ccc");
    }

    //设置span的样式
    var index=0
    $("#big>#img>ol>li").click(function(){
        $(this).css("backgroundColor","").siblings().css("backgroundColor","#ccc");
        //获取当前的索引值
        index=$(this).index();
        $("#big>#img>ul").animate({"left":(-index*$("#img").width())},500);

    });
    $("#big>#img>ol>li:eq(0)").css("backgroundColor","");


    //点击有点按钮
    //先克隆一个ul中的第一个li放在ul的最后
    $("#big>#img>ul>li:first").clone().appendTo($("#big>#img>ul"));

    $("#arr>#right").click(clickHandle);
    //封装点击右边按钮的函数
   function clickHandle(){
       if(index==$("#big>#img>ul>li").length-1){
           index=0;
           $("#big>#img>ul").css("left",0);
       }
        index++;
        $("#big>#img>ul").animate({"left":(-index*$("#img").width())},500);
        //当索引值是最后一个的时候,ol中最后一个子元素的样式变成#ccc颜色,让第一个元素的颜色变成空心的颜色
        if(index==$("#big>#img>ul>li").length-1){
            $("#big>#img>ol>li:last").css("backgroundColor","#ccc");
            $("#big>#img>ol>li:first").css("backgroundColor","");
        }else{
            $("#big>#img>ol>li:eq("+index+")").css("backgroundColor","").siblings().css("backgroundColor","#ccc");
        }
    };

    //点击左边按钮
    $("#arr>#left").click(function(){
        if(index==0){
            index=$("#big>#img>ul>li").length-1;
            $("#big>#img>ul").css("left",(-index*$("#img").width()));
        }
        index--;
        $("#big>#img>ul").animate({"left":(-index*$("#img").width())},500);
        $("#big>#img>ol>li:eq("+index+")").css("backgroundColor","").siblings().css("backgroundColor","#ccc");
    });

    //鼠标进入和鼠标离开事件
    $("#big").mouseenter(function(){
        $("#arr").show();
        clearInterval(timeId);
    }).mouseleave(function(){
        $("#arr").hide();
        timeId=setInterval(clickHandle,1500);
    });

    //自动轮播效果
    var timeId=setInterval(clickHandle,1500);

    //鼠标进入左右焦点的时候,左右键点按钮有透明度的变化
    $("#arr").mouseenter(function(){
        $(this).css("opacity",0.7);
    }).mouseleave(function(){
        $(this).css("opacity",1);
    });
});



















