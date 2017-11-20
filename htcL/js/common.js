/**
 * Created by sss on 2017/9/18.
 */

/**
 * 根据id属性的值,返回对应的标签元素
 * @param id id属性的值,string类型的
 * @returns {Element} 元素对象
 */

function my$(id) {
    return document.getElementById(id);
}
//设置任意的标签中间的任意文本内容
function setInnerText(element,text){
    //
    if(typeof element.textContent=="undefined"){
        element.innerText=text;
    }
    else{
        element.textContent=text;
    }
}
//获取任意标签中间的文本内容
function getInnerText(element){
    if(typeof element.textContent=="undefined"){
        return element.innerText;
    }else{
        return element.textConten;
    }
}
