/**
 * Created by Yang_PC on 2017/10/7.
 */
//获取所有元素
var box = my$("box");
//获取相框
var screen = box.children[0];
//相框宽度
var imgWidth = screen.offsetWidth;
//ul
var ulObj = screen.children[0];
//获取li
var list = ulObj.children;
//获取ol
var olObj = screen.children[1];
//找到div
var arr = my$("arr");
//左边按钮
var left = my$("left");
//右边按钮
var right = my$("right");
//根据ul下的li动态创建小按钮
for (var i =0; i < list.length; i++) {
    var liObj = document.createElement("li");
    liObj.innerHTML = (i + 1);
    olObj.appendChild(liObj);
    //设置索引值
    liObj.setAttribute("index", i);
    //注册鼠标进入事件
    liObj.onmouseover = function () {
        //排他
        for (var j =0; j < olObj.children.length; j++) {
            olObj.children[j].removeAttribute("class");
        }
        //当前的样式改变
        this.className = "current";
        //获取当前的索引ֵ
        var pic = this.getAttribute("index");
        //移动ul
        animates(ulObj, -pic * imgWidth);
    };
}
//默认第一个按钮样式
olObj.children[0].className = "current";
//克隆li
ulObj.appendChild(ulObj.children[0].cloneNode(true));
var timeId = setInterval(clickHandle, 2000);
//鼠标进入事件
box.onmouseover = function () {
    arr.style.display = "block";
    clearInterval(timeId);
};
//鼠标离开事件
box.onmouseout = function () {
    arr.style.display = "none";
    timeId = setInterval(clickHandle, 2000);
};
//右边按钮点击事件
var pic = 0;
right.onclick = clickHandle;
function clickHandle() {
    //判断是否为最后一张图片,如果是让pic值立即转到第一张图对应的值
    if (pic == list.length - 1) {
        pic = 0;
        ulObj.style.left = 0 + "px";
    }
    pic++
    animates(ulObj, -imgWidth * pic);
    if (pic == list.length - 1) {
        ///判断是否为最后一张图片,如果是让其样式与第一张一样
        olObj.children[olObj.children.length - 1].removeAttribute("class");
        olObj.children[0].className = "current";
    } else {
        //按钮的样式随着图片改变
        for (var j =0; j < olObj.children.length; j++) {
            olObj.children[j].removeAttribute("class");
        }
        olObj.children[pic].className = "current";
    }
};
//左边按钮点击事件
my$("left").onclick = function () {
    //如果为第一张图片,让气质与最后一张图片相同
    if (pic == 0) {
        pic = olObj.children.length;
        ulObj.style.left = -imgWidth * pic + "px";
    }
    pic--;
    animates(ulObj, -imgWidth * pic);
    //小按钮样式随着图片改变
    for (var j =0; j < olObj.children.length; j++) {
        olObj.children[j].removeAttribute("class");
    }
    //当前pic下的下按钮样式
    olObj.children[pic].className = "current";
};