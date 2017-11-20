/**
 * Created by sss on 2017/10/8.
 */
//轮播图-----广告栏
function my$(id) {
    return document.getElementById(id);
}
var box = my$("box");//获取最外边的div
var screen = box.children[0];
var imgWidth = screen.offsetWidth;
var ulObj = screen.children[0];
var list = ulObj.children;
var olObj = screen.children[1];
var arr = my$("arr");
for (var i= 0; i < list.length; i++) {
    var liObj = document.createElement("li");
    olObj.appendChild(liObj);
    liObj.setAttribute("index", i);
    liObj.onmouseover = function () {
        for (var j = 0; j < olObj.children.length; j++) {
            olObj.children[j].removeAttribute("class");
        }
        this.className = "current";
        pic = this.getAttribute("index");
        animate(ulObj, -pic * imgWidth);
    };
    olObj.children[0].className = "current";
}
ulObj.appendChild(ulObj.children[0].cloneNode(true));
//自动播放
var timeId = setInterval(clickHandle, 2000);
//鼠标进入
box.onmouseover = function () {
    clearInterval(timeId);
};
//鼠标离开
box.onmouseout = function () {
    //离开后再自动播放
    timeId = setInterval(clickHandle, 2000);
};
//右边按钮
var pic = 0;
my$("right").onclick = clickHandle;
function clickHandle() {
    if (pic == list.length - 1) {
        pic = 0;
        ulObj.style.left = 0 + "px";
    }
    pic++;
    animate(ulObj, -pic * imgWidth);
    if (pic == list.length - 1) {
        olObj.children[olObj.children.length - 1].className = "";
        olObj.children[0].className = "current";
    } else {
        for (var i = 0; i < olObj.children.length; i++) {
            olObj.children[i].removeAttribute("class");
        }//end for
        olObj.children[pic].className = "current";
    }
}
//左边按钮
my$("left").onclick = function () {
    if (pic == 0) {
        pic = 5;
        ulObj.style.left = -pic * imgWidth + "px";
    }
    pic--;
    animate(ulObj, -pic * imgWidth);
    //排他
    for (var i = 0; i < olObj.children.length; i++) {
        olObj.children[i].removeAttribute("class");
    }
    olObj.children[pic].className = "current";
};
//设置任意一个元素移动到指定的目标位置
function animate(element,target) {
    clearInterval(element.timeId);
    //定时器的id值存储到对象的一个属性中
    element.timeId = setInterval(function () {
        //获取元素的当前位置
        var current = element.offsetLeft;
        var step = 10;//每次移动的距离
        step = current < target ? step : -step;
        current += step;//当前移动到位置
        if (Math.abs(current - target) > Math.abs(step)) {
            element.style.left = current + "px";
        } else {
            clearInterval(element.timeId);//清理定时器
            element.style.left = target + "px";//直接达到目标
        }
    },10);
}
//底部
my$("bot_img").onclick = function () {
    var bottom = document.querySelector(".bottom");
    bottom.style.display = "block";
    my$("bot_btn").style.display = "block";
    my$("btn").style.display = "none";
    var bottom_l = document.querySelector(".bottom_l");
    var bottom_r = document.querySelector(".bottom_r");
    animate(bottom, {"bottom": 0});
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