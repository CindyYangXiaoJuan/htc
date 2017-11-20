$(document).ready(function() {
    'use strict';
    if (location.pathname === '/cn/' || location.pathname.indexOf('/cn/smartphones/') > -1 || location.pathname.indexOf('/cn/cameras/') > -1 || location.pathname.indexOf('/cn/accessories/') > -1) {
        $('body').prepend('<div style="color:#868585;font-size: xx-small;position: relative;text-align: right;padding-right: 2%;padding-bottom:2px; width:100%; background-color: #fff; z-index: 99990000;box-sizing: border-box;">[广告]</div>');
    }
});