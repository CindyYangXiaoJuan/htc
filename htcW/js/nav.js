/**
 * Created by Yang_PC on 2017/10/5.
 */
onscroll = function (){
    var top = document.querySelector(".top_nav");
    if (getScroll().top > top.offsetHeight) {
        my$("nav").style.position = "fixed";
        my$("nav").style.top = 0;
    } else {
        my$("nav").style.position = "";
    }
};