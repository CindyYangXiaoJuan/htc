/**
 * Created by Yang_PC on 2017/10/5.
 */
function my$ (id) {
    return document.getElementById(id);
}


//��ȡ����һ��Ԫ�ص�����һ�����Եĵ�ǰ��ֵ---��ǰ���Ե�λ��ֵ
function getStyle(element, attr) {
    return window.getComputedStyle ? window.getComputedStyle(element, null)[attr] : element.currentStyle[attr] || 0;
}


//��������
function animate(element, json, fn) {
    clearInterval(element.timeId);//����ʱ��
    //��ʱ��,���ص��Ƕ�ʱ����id
    element.timeId = setInterval(function () {
        var flag = true;//Ĭ��,����,ȫ������Ŀ��
        //����json�����е�ÿ�����Ի������Զ�Ӧ��Ŀ��ֵ
        for (var attr in json) {
            //�ж��������attr���ǲ���opacity
            if (attr == "opacity") {
                //��ȡԪ�صĵ�ǰ��͸����,��ǰ��͸���ȷŴ�100��
                var current = getStyle(element, attr) * 100;
                //Ŀ���͸���ȷŴ�100��
                var target = json[attr] * 100;
                var step = (target - current) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                current += step;//�ƶ����ֵ
                element.style[attr] = current / 100;
            } else if (attr == "zIndex") { //�ж��������attr���ǲ���zIndex
                //�㼶�ı����ֱ�Ӹı�������Ե�ֵ
                element.style[attr] = json[attr];
            } else {
                //��ͨ������
                //��ȡԪ��������Եĵ�ǰ��ֵ
                var current = parseInt(getStyle(element, attr));
                //��ǰ�����Զ�Ӧ��Ŀ��ֵ
                var target = json[attr];
                //�ƶ��Ĳ���
                var step = (target - current) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                current += step;//�ƶ����ֵ
                element.style[attr] = current + "px";
            }
            //�Ƿ񵽴�Ŀ��
            if (current != target) {
                flag = false;
            }
        }
        if (flag) {
            //����ʱ��
            clearInterval(element.timeId);
            //���е����Ե���Ŀ�����ʹ���������,ǰ�����û��������������
            if (fn) {
                fn();
            }
        }
    }, 10);
}

//��ȡҳ�����ϻ������������ȥ�ľ����ֵ
function getScroll() {
    return {
        left: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft||0,
        top: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
    };
}

