function my$(id) {
    return document.getElementById(id);
}
onscroll = function (){
    var top = document.querySelector(".top_l");
    if (getScroll().top > 100) {
        my$("top_bj").style.position = "fixed";
        my$("top_bj").style.top = 0;
        my$("top_bj").style.zIndex = 300;
    } else {
        my$("top_bj").style.position = "";
    }
};
my$("bot_img").onclick = function () {
    var bottom = document.querySelector(".bottom");
    bottom.style.display = "block";
    //animate(bottom, {"heigth": 545});
    my$("bot_btn").style.display = "block";
    my$("btn").style.display = "none";
    var bottom_l = document.querySelector(".bottom_l");
    var bottom_r = document.querySelector(".bottom_r");
    animate(bottom, {"bottom": -2500});
    animate(bottom_l, {"opacity": 1});
    animate(bottom_r, {"opacity": 1});

};
my$("bot_img1").onclick = function () {
    //console.log(1)
    var bottom = document.querySelector(".bottom");
    bottom.style.display = "none";
    animate(bottom, {"top": 0});
    my$("bot_btn").style.display = "none";
    my$("btn").style.display = "block";
    var bottom_l = document.querySelector(".bottom_l");
    var bottom_r = document.querySelector(".bottom_r");
    animate(bottom_l, {"opacity": 0});
    animate(bottom_r, {"opacity": 0});
};

var liobjs = my$("yy").getElementsByTagName("li");
for (var i = 0; i < liobjs.length; i++) {
    liobjs[i].onmousemove = function () {
        this.style.borderTop = "6px solid #B7E07D";
        this.style.boxShadow = "rgba(195,209,166,1) 0 10px 30px";
        //animate(this, {"boxShadow" : "rgba(195,209,166,1) 0 10px 30px"});
    };
    liobjs[i].onmouseout = function () {
        this.style.border = "";
        this.style.boxShadow = "";
    };
}
var liobjs = my$("ye").getElementsByTagName("li");
for (var i = 0; i < liobjs.length; i++) {
    liobjs[i].onmousemove = function () {
        this.style.borderTop = "6px solid #B7E07D";
        this.style.boxShadow = "rgba(195,209,166,1) 0 10px 30px";
        //animate(this, {"boxShadow" : "rgba(195,209,166,1) 0 10px 30px"});
    };
    liobjs[i].onmouseout = function () {
        this.style.border = "";
        this.style.boxShadow = "";
    };
}
my$("mb1").onmouseover=function(){
   animate(this,{"opacity" : 0.6});
};
my$("mb2").onmouseover=function(){
    animate(this,{"opacity" : 0.6});
};
my$("mb1").onmouseout=function(){
    animate(this,{"opacity" : 1});
};
my$("mb2").onmouseout=function(){
    animate(this,{"opacity" : 1});
};
    function getStyle(element, attr) {
        return window.getComputedStyle ? window.getComputedStyle(element, null)[attr] : element.currentStyle[attr] || 0;
    }


    function animate(element, json, fn) {
        clearInterval(element.timeId);
        element.timeId = setInterval(function () {
            var flag = true;
            for (var attr in json) {
                if (attr == "opacity") {
                    var current = getStyle(element, attr) * 100;
                    var target = json[attr] * 100;
                    var step = (target - current) / 10;
                    step = step > 0 ? Math.ceil(step) : Math.floor(step);
                    current += step;//�ƶ����ֵ
                    element.style[attr] = current / 100;
                } else if (attr == "zIndex") {
                    element.style[attr] = json[attr];
                } else {
                    var current = parseInt(getStyle(element, attr));
                    var target = json[attr];
                    var step = (target - current) / 10;
                    step = step > 0 ? Math.ceil(step) : Math.floor(step);
                    current += step;
                    element.style[attr] = current + "px";
                }
                if (current != target) {
                    flag = false;
                }
            }
            if (flag) {
                clearInterval(element.timeId);
                if (fn) {
                    fn();
                }
            }
        }, 10);
    }


    function getScroll() {
        return {
            left: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0,
            top: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
        };
    }



