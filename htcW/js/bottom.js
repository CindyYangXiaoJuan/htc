/**
 * Created by Yang_PC on 2017/10/5.
 */
my$("bot_img").onclick = function () {
    var bottom = document.querySelector(".bottom");
    bottom.style.display = "block";
    //animate(bottom, {"heigth": 545});
    my$("bot_btn").style.display = "block";
    my$("btn").style.display = "none";
    var bottom_l = document.querySelector(".bottom_l");
    var bottom_r = document.querySelector(".bottom_r");
    animate(bottom, {"bottom": -709});
    animate(bottom_l, {"opacity" : 1});
    animate(bottom_r, {"opacity" : 1});

};
my$("bot_img1").onclick = function () {
    var bottom = document.querySelector(".bottom");
    bottom.style.display = "none";
    animate(bottom, {"top": 0});
    my$("bot_btn").style.display = "none";
    my$("btn").style.display = "block";
    var bottom_l = document.querySelector(".bottom_l");
    var bottom_r = document.querySelector(".bottom_r");
    animate(bottom_l, {"opacity" : 0});
    animate(bottom_r, {"opacity" : 0});
};