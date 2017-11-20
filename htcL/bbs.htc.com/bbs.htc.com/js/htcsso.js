/**
 * Created by Paza on 2014/3/6.
 */
if (!HTCSSO) {
    var HTCSSO = {};
}

HTCSSO.Account = new function() {
    var _cfg;
    var _sso_token_key = '';

    return {
        setConfig : function(setting) {
            _cfg = setting;
        },
        setConfigValue : function(key, val) {
            _cfg[key] = val;
        },
        getConfigValue : function(key) {
            return _cfg[key];
        },
        init : function() {
            HTCAccount.init(_cfg.accountConfig);
        },
        asyncInit : function(asyncFunction) {
            window.htcAccountAsyncInit = asyncFunction();
        },
        getLoginStatus : function(excuteAtConnected, excuteAtNotConnected, refresh) {
            refresh = refresh===true ? true : false;
            HTCAccount.getLoginStatus(
                function(loginStatus) {
                    if (loginStatus.status==="connected") {
                        typeof excuteAtConnected==="function" && excuteAtConnected(loginStatus);
                    } else {
                        typeof excuteAtNotConnected==="function" && excuteAtNotConnected(loginStatus);
                    }
                },
                refresh
            );
        },
        getProfile : function(success_callback, fail_callback) {
            HTCAccount.getProfile(success_callback, fail_callback);
        },
        getAuthResponse : function() {
            return HTCAccount.getAuthResponse();
        },
        login : function(excuteAtConnected, excuteAtNotConnected, loginConfig) {
            loginConfig = loginConfig ? loginConfig : _cfg.loginConfig;
            HTCAccount.login(
                function(loginStatus) {
                    if (loginStatus.status==="connected") {
                        typeof excuteAtConnected==="function" && excuteAtConnected(loginStatus);
                    } else {
                        typeof excuteAtNotConnected==="function" && excuteAtNotConnected(loginStatus);
                    }
                },
                loginConfig
            );
        },
        logout : function(excuteAtDisConnected) {
            HTCAccount.logout(function(loginStatus) {
                typeof excuteAtDisConnected==="function" && excuteAtDisConnected(loginStatus);
            });
        },
        sso_token_key : function(key) {
          if (arguments.length===1) {
            _sso_token_key = key;
          } else {
            return _sso_token_key;
          }
        }
    };
};
