/**
 * Created by Yang_PC on 2017/10/5.
 */
function my$ (id) {
    return document.getElementById(id);
}

//动画函数封装
function animates (element, target) {
    clearInterval(element.timeId);
    element.timeId = setInterval(function () {
        var current = element.offsetLeft;
        var step = 10;
        step = current < target ? step : -step;
        current += step;
        if (Math.abs(current - target) > Math.abs(step)) {
            element.style.left = current + "px";
        } else {
            clearInterval(element.timeId);
            element.style.left = target + "px";
        }
    }, 10);
}


//获取任意元素的任意属性
//function getStyle(element, attr) {
//    return window.getComputedStyle ? window.getComputedStyle(element, null)[attr] : element.currentStyle[attr] || 0;
//}

function getStyle(element,attr) {
    //判断浏览器是否支持这个方法
    return window.getComputedStyle? window.getComputedStyle(element,null)[attr]:element.currentStyle[attr];
}


//最终版本的动画函数封装
function animate(element, json, fn) {
    clearInterval(element.timeId);//清除页面中的定时器
    //设置定时器id
    element.timeId = setInterval(function () {
        var flag = true;//假设
        //循环遍历每个属性
        for (var attr in json) {
            //如果为透明度?
            if (attr == "opacity") {
                //将透明度得知100倍
                var current = getStyle(element, attr) * 100;
                //目标值100倍
                var target = json[attr] * 100;
                var step = (target - current) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                current += step;//�ƶ����ֵ
                element.style[attr] = current / 100;
            } else if (attr == "zIndex") { //如果是zIndex
                //zIndex可以直接修改
                element.style[attr] = json[attr];
            } else {
                //否则为普通属性
                //当前值
                var current = parseInt(getStyle(element, attr));
                //目标值
                var target = json[attr];
                //每次移动
                var step = (target - current) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                current += step;//移动后的位置ֵ
                element.style[attr] = current + "px";
            }
            //没有到达目标
            if (current != target) {
                flag = false;
            }
        }
        if (flag) {
            //根据flag的值清除定时器
            clearInterval(element.timeId);
            //可以多次加入
            if (fn) {
                fn();
            }
        }
    }, 10);
}

//页面卷曲的值
function getScroll() {
    return {
        left: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft||0,
        top: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
    };
}

