/**
 * Created by Yang_PC on 2017/10/5.
 */
$(function () {
    $(".hidden").hide();
    $("#li_two>a").mouseenter(function () {
        $(".hidden").show();
    }).mouseleave(function () {
        $(".hidden").show();
    })
    $(".hidden").mouseenter(function () {
        $(".hidden").show();
    });
    $(".hidden").mouseleave(function () {
        $(".hidden").hide();
    });
});
