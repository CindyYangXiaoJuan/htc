/**
 * Created by Yang_PC on 2017/10/7.
 */
$(function () {
    //图片宽度
    var imgWidth = $(".screen>ul>li>img").width();
    //索引值
    var index = 0;
    //根据ul下的li动态创建小按钮
    for (var i = 0; i <$(".screen>ul>li").length; i++) {
        //创建小按钮
        $("<li>" + (i + 1) + "</li>").appendTo($(".screen>ol"));
    }
    //鼠标进入事件
    var flag=true;
    $(".screen>ol>li").mouseenter(function () {
        //执行完毕之后,在继续下次执行
        if (flag) {
            flag = false;
            index = $(this).index();
            //当前改变样式,其他兄弟元素不改变
            $(this).addClass("current").siblings("li").removeClass("current");
            $(".screen>ul").animate({"left":-index * imgWidth},500);
            flag = true;
        }
    });

    //默认第一个按钮的样式
    $(".screen>ol>li:eq(0)").addClass("current");
    //克隆一张图片
    $(".screen>ul>li:eq(0)").clone().appendTo($(".screen>ul"));
    //设置自动播放
    var timeId = setInterval(clickHandle, 2000);
    //鼠标进入显示按钮,离开隐藏
    $("#box").mouseenter(function () {
        $("#arr").css("display", "block");
        clearInterval(timeId);
    }).mouseleave(function () {
        $("#arr").css("display", "none");
        timeId = setInterval(clickHandle, 2000);
    });
    //点击右边按钮移动图片
    $("#right").click(clickHandle);
    //获取小按钮的索引值
    var pic = 0;
    function clickHandle () {
        //判断是否为最后一张图片,如果是让pic值立即转到第一张图对应的值
        if (pic == $(".screen>ul>li:last").index()) {
            pic = 0;
            $(".screen>ul").css("left", "0px");
        }
        pic++;
        $(".screen>ul").animate({"left" : -pic * imgWidth}, 500);
        //判断是否为最后一张图片,如果是让其样式与第一张一样,设置小按钮
        if (pic == $(".screen>ul>li:last").index()) {
            $(".screen>ol>li:last").removeClass("current");
            $(".screen>ol>li:first").addClass("current");
        } else {
            $(".screen>ol>li:eq(" + pic + ")").addClass("current").siblings("li").removeClass("current");
        } //end if
    } //end click function
    //点击左边按钮,移动图片
    $("#left").click(function () {
        //判断是否为第一张,立即跳转到最后一张
        if (pic == $(".screen>ul>li:first").index()) {
            pic = $(".screen>ul>li:last").index();
            $(".screen>ul").css("left", -pic*imgWidth + "px");
        }
        pic--;
        $(".screen>ul").animate({"left":-pic*imgWidth + "px"},500);
        //设置小按钮
        $(".screen>ol>li:eq(" + pic + ")").addClass("current").siblings("li").removeClass("current");
    });
});