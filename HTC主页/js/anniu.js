/**
 * Created by Administrator on 2017/10/4 0004.
 */
$(function () {
    $("#btn").click(function () {
        $(this).css("display", "none");
        $(".sb").css("display", "block");
        $(".bot").css("display", "block");
        $("#dvd").animate({"height": "357px", "bottom": "0px"}, 500);
        $(".bot").css("height","332px");
    });
    $(".sb").click(function () {
        $(this).css("display", "none");
        $("#btn").css("display", "block");
        $("#dvd").animate({"height": "25px"}, 500);
        $(".bot").animate({"height": "0px"}, 500,function(){
            $(".bot").css("display", "none");
        });

    });
});