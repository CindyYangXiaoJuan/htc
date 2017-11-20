/**
 * Created by Paza on 2014/4/24.
 */
function isWeiXin(){
    var ua = window.navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i) == 'micromessenger'||ua.match(/MQQBrowser/i) == 'mqqbrowser'){
        return true;
    }else{
        return false;
    }
}
var gDebug = true,
    gHTCAccountConfig = {
        accountConfig: {
            appid: HTCACCOUNT_APPID,
            scope: "email birthday",
            authorities: ""
        },
        loginConfig: {
            type: "popup",
            authorities: ""
        }
    },
    HTCAccount_login = function() {
        HTCSSO.Account.login(
            function() {
                showLogout();
            },
            function() {
                showLogin();
            }
        );
    },
    HTCAccount_logout = function() {
        $.post(
            SITEURL + "community/SSOLogout.php?source=" + REFERER_SOURCE,
            function(data) {
                if (isJson(data)) {
                    //switchLoginLogout();
                    HTCSSO.Account.logout(location_index);
                }
            },
            "json"
        );
    },
    HTCAccount_getProfile_success_callback = function(attr) {
        var sso_token_key = HTCSSO.Account.sso_token_key();
        var ssoinfo = $.extend({
            SSOattributes: $.toJSON(attr),
            sso_token_key: sso_token_key
        }, attr);
        $.post(
                SITEURL + "community/SSOSignIn.php?source=" + REFERER_SOURCE,
                ssoinfo,
                function(data) {
                    // alert(data)
                    if (isJson(data)) {
                        // clearInterval(setIntervalGet);
                        switch (data.status) {
                            case -1:
                                if (REFERER_SOURCE === 'htchome') {;
                                } else {
                                    gRBC.dialog.alert("请重新登入", location_reload); //TODO: alert message ?
                                }
                                break;
                            case -101:
                                gRBC.dialog.alert("社区注册失败"); //TODO: alert message ?
                                break;
                            case 1:
                                //gRBC.dialog.alert("登入成功");//TODO: alert message ?
                                if (data.usernameexists === true) {
                                    var uri = parseUri(decodeEntities(window.location.href));
                                    if (typeof uri.queryKey.r == "undefined") {
                                        location_reload();
                                    } else {
                                        window.location.href = uri.query.substring(2);
                                    }
                                } else if (/tw\/app\/new\-year\-lottery/g.test(decodeEntities(window.location.href))) {
                                    window.location.href = parseUri(decodeEntities(window.location.href)).query.substring(2);
                                } else if (/tw\/app\/special\-offer/g.test(decodeEntities(window.location.href))) {
                                    window.location.href = parseUri(decodeEntities(window.location.href)).query.substring(2);
                                } else if (parseUri(decodeEntities(window.location.href)).query.match("mod=event_form&action=apply_form")) {
                                    //news.php?mod=event_form&amp;action=apply_form
                                    window.location.href = parseUri(decodeEntities(window.location.href)).query.substring(2);
                                } else {
                                    window.location.href = "htchome.php?mod=spacecp&ac=profile";
                                }
                                break;
                            default:
                                gRBC.dialog.alert("无法登入Community:" + data.status); //TODO: alert message ?
                        }
                    }
                },
                "json"
            )
            .fail(function() {
                //gRBC.dialog.alert("Error occur when SSOSignIn");//TODO: alert message ?
            })
            .always(function() {
                gRBC.dialog.closeLoading();
            });
    },
    HTCAccount_getProfile_fail_callback = function(attr) {
        if (isJson(attr)) {
            if (attr['ErrorString']) {
                if (attr.ErrorString['description']) {
                    gRBC.dialog.alert(attr.ErrorString.description);
                } else {
                    gRBC.dialog.alert(attr.ErrorString);
                }
            }
            switch (attr.code) {
                case -32601:
                    gRBC.dialog.alert(attr.message, HTCAccount_logout);
                    break;
                case -32099:
                    //gRBC.dialog.alert("Error Code:-32099", HTCAccount_logout);//TODO: alert message ?
                    break;
                default:
                    gRBC.dialog.alert("HTCAccount_getProfile Fail!", HTCAccount_logout); //TODO: alert message ?
            }
        } else {
            gRBC.dialog.alert('HTCAccount_getProfile 失败.', HTCAccount_logout); //TODO: alert message ?
        }
    },
    HTCAccount_excuteAtConnected_callback = function(loginStatus) {
        $.post(

                SITEURL + "community/SSOVerify.php?source=" + REFERER_SOURCE, {
                    AuthKey: loginStatus.authResponse.access_token
                },
                function(data) {
                    if (isJson(data)) {
                        if (data['ErrorString']) {
                            if (data.ErrorString['description']) {
                                gRBC.dialog.alert(data.ErrorString.description);
                            } else {
                                gRBC.dialog.alert(data.ErrorString);
                            }
                        } else if (data.client_id && data.account_id) {
                            if (data.client_id === gHTCAccountConfig.accountConfig.appid) {
                                if (data.sso_token_key) {
                                    HTCSSO.Account.sso_token_key(data.sso_token_key);
                                    if (REFERER_SOURCE === 'htchome' && isJson(data['profile'])) {
                                        HTCAccount_getProfile_success_callback(data['profile']);
                                    } else {
                                        HTCSSO.Account.getProfile(HTCAccount_getProfile_success_callback, HTCAccount_getProfile_fail_callback);
                                    }
                                } else {
                                    gRBC.dialog.alert("无效的 sso token key"); //TODO: alert message ?
                                }
                            } else {
                                gRBC.dialog.alert("无效的 ClientId"); //TODO: alert message ?
                            }
                        } else {
                            debugConsole(data); //TODO: send error msg to server
                            gRBC.dialog.alert("无法取得正确的 token 验证结果"); //TODO: alert message ?
                        }
                    } else {
                        debugConsole(data); //TODO: send error msg to server
                        gRBC.dialog.alert("SSOVerify 发生错误"); //TODO: alert message ?
                    }
                },
                "json"
            )
        .fail(function() {
            //gRBC.dialog.alert("驗證 token 時發生錯誤");//TODO: alert message ? Error occur when verify token
        });
       if(isWeiXin()){
            wechatLogin();

       }
    },
    HTCAccount_excuteAtNotConnected_callback = function(loginStatus) {
        debugConsole(loginStatus); //TODO: send error msg to server
        gRBC.dialog.alert("HTCSSO Account login 无法正确连接"); //TODO: alert message ?
    },
    HTCAccount_register = function() {
        HTCSSO.Account.login(HTCAccount_excuteAtConnected_callback, HTCAccount_excuteAtNotConnected_callback);
    },
    HTCAccount_login = function() {
        HTCAccount_register();
        // var setIntervalGet=setInterval(function(){
        //     HTCAccount_getProfile_success_callback();
        //     location_reload();
        //     alert("登入")
        // },1000)
        

    },
    showLogout = function() {
        //        $(".sso-header-signin").hide();
        //        $(".sso-header-logined").show();
    },
    showLogin = function() {
        //        $(".sso-header-signin").show();
        //        $(".sso-header-logined").hide();
    },
    switchLoginLogout = function(loginStatus) {
        if (isJson(loginStatus)) {
            if (loginStatus.status == "connected") {
                showLogin();
            } else {
                showLogout();
            }
        } else {
            HTCSSO.Account.getLoginStatus(showLogout, showLogin);
        }
    };

HTCSSO.Account.setConfig(gHTCAccountConfig);
HTCSSO.Account.init();

HTCAccount.Event.subscribe("auth.prompt", function(loginStatus) {
    //gRBC.dialog.loading('<div class="text-center"><img class="margin-bottom-15" src="community/img/loading.gif"></div><p class="text-center">登入中...</p>');
});
HTCAccount.Event.subscribe("auth.login", function(loginStatus) {
    switchLoginLogout();
});
HTCAccount.Event.subscribe("auth.logout", function(loginStatus) {
    switchLoginLogout();
});
HTCAccount.Event.subscribe("auth.authResponseChange", function(loginStatus) {
    if (loginStatus["status"] === "connected") {
        $.getJSON("util_api_whoami.php", function(data) {
            if (data.uid == 0) {
                HTCAccount_excuteAtConnected_callback(loginStatus);
            }
        });
    } else { // loginStatus["status"] === "unknown"
        // show logged out view
    }
    switchLoginLogout();
});

wechatLogin=function(){
    var sso_token_key = HTCSSO.Account.sso_token_key();
    var ssoinfo = $.extend({
        SSOattributes: $.toJSON(attr),
        sso_token_key: sso_token_key
    }, attr);
    $.post(
        SITEURL + "community/SSOSignIn.php?source=" + REFERER_SOURCE,
        ssoinfo,
        function(data) {
            // alert(data)
            if (isJson(data)) {
                // clearInterval(setIntervalGet);
                switch (data.status) {
                    case -1:
                        if (REFERER_SOURCE === 'htchome') {;
                        } else {
                            location_reload
                        }
                        break;
                    case 1:
                        //gRBC.dialog.alert("登入成功");//TODO: alert message ?
                        if (data.usernameexists === true) {
                            var uri = parseUri(decodeEntities(window.location.href));
                            if (typeof uri.queryKey.r == "undefined") {
                                location_reload();
                            } else {
                                window.location.href = uri.query.substring(2);
                            }
                        } else if (/tw\/app\/new\-year\-lottery/g.test(decodeEntities(window.location.href))) {
                            window.location.href = parseUri(decodeEntities(window.location.href)).query.substring(2);
                        } else if (/tw\/app\/special\-offer/g.test(decodeEntities(window.location.href))) {
                            window.location.href = parseUri(decodeEntities(window.location.href)).query.substring(2);
                        } else if (parseUri(decodeEntities(window.location.href)).query.match("mod=event_form&action=apply_form")) {
                            //news.php?mod=event_form&amp;action=apply_form
                            window.location.href = parseUri(decodeEntities(window.location.href)).query.substring(2);
                        } else {
                            window.location.href = "htchome.php?mod=spacecp&ac=profile";
                        }
                        break;
                    default:
                        gRBC.dialog.alert("无法登入Community:" + data.status); //TODO: alert message ?
                }
            }
        },
        "json"
    )
}