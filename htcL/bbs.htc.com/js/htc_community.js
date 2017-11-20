/**
 * Created by Paza on 2014/3/17.
 *
 * dialog
 * http://getbootstrap.com/javascript/#modals
 * http://nakupanda.github.io/bootstrap3-dialog/
 *
 */

if (!gRBC) {
    var gRBC = {};
}

gRBC.dialog = new function() {
    var loadinginstance;
    function init() {
        BootstrapDialog.alert = function() {
            var options = {};
            var defaultOptions = {
                type: BootstrapDialog.TYPE_PRIMARY,
                title: "HTC Community",
                message: null,
                closable: true,
                buttonLabel: glang.ok,
                callback: null
            };

            if (typeof arguments[0] === 'object' && arguments[0].constructor === {}.constructor) {
                options = $.extend(true, defaultOptions, arguments[0]);
            } else {
                options = $.extend(true, defaultOptions, {
                    message: arguments[0],
                    closable: true,
                    buttonLabel: glang.ok,
                    callback: typeof arguments[1] !== 'undefined' ? arguments[1] : null
                });
            }

            return new BootstrapDialog({
                type: options.type,
                title: options.title,
                message: options.message,
                closable: options.closable,
                data: {
                    callback: options.callback
                },
                onhide: function(dialog) {
                    !dialog.getData('btnClicked') && dialog.isClosable() && typeof dialog.getData('callback') === 'function' && dialog.getData('callback')(false);
                },
                buttons: [{
                    cssClass: 'btn btn-success font-15',
                    autospin: false,
                    label: options.buttonLabel,
                    action: function(dialog) {
                        dialog.setData('btnClicked', true);
                        typeof dialog.getData('callback') === 'function' && dialog.getData('callback')(true);
                        dialog.close();
                    }
                }]
            }).open();
        };

        BootstrapDialog.confirm = function() {
            var options = {};
            var defaultOptions = {
                type: BootstrapDialog.TYPE_WARNING,
                title: "htc Community",
                message: null,
                closable: false,
                buttonLabel: glang.ok,
                callback: null
            };

            if (typeof arguments[0] === 'object' && arguments[0].constructor === {}.constructor) {
                options = $.extend(true, defaultOptions, arguments[0]);
            } else {
                options = $.extend(true, defaultOptions, {
                    message: arguments[0],
                    closable: false,
                    buttonLabel: glang.ok,
                    callback: typeof arguments[1] !== 'undefined' ? arguments[1] : null
                });
            }

            return new BootstrapDialog({
                type: options.type,
                title: options.title,
                message: options.message,
                closable: options.closable,
                data: {
                    callback: options.callback
                },
                buttons: [{
                    label: glang.cancel,
                    cssClass: 'btn btn-danger font-15',
                    action: function(dialog) {
                        typeof dialog.getData('callback') === 'function' && dialog.getData('callback')(false);
                        dialog.close();
                    }
                }, {
                    label: glang.ok,
                    cssClass: 'btn btn-success font-15',
                    action: function(dialog) {
                        typeof dialog.getData('callback') === 'function' && dialog.getData('callback')(true);
                        dialog.close();
                    }
                }]
            }).open();
        };

        BootstrapDialog.loading = function() {
            var options = {};
            var defaultOptions = {
                type: BootstrapDialog.TYPE_WARNING,
                title: "htc Community",
                message: null,
                closable: false,
                callback: null
            };

            if (typeof arguments[0] === 'object' && arguments[0].constructor === {}.constructor) {
                options = $.extend(true, defaultOptions, arguments[0]);
            } else {
                options = $.extend(true, defaultOptions, {
                    message: arguments[0],
                    closable: false,
                    callback: typeof arguments[1] !== 'undefined' ? arguments[1] : null
                });
            }

            return new BootstrapDialog({
                type: options.type,
                title: options.title,
                message: options.message,
                closable: options.closable,
                data: {
                    callback: options.callback
                }
            }).open();
        };
    }

    BootstrapDialog && init();

    return {
        toast : function(msg, closetime, func) {
            if (typeof func !== 'function') {
                func = null;
            }
            if (typeof closetime === 'undefined') {
                closetime = 3;
            }
            clearTimeout(showDialogST);
            showPrompt(null, null, '<i>' + msg + '</i>', closetime * 1000, 'popuptext');
            if (func) {
                showDialogST = setTimeout(func, closetime * 1000);
            }
        },
        alert : function(setting, callback) {
            BootstrapDialog.alert( setting, callback );
        },
        confirm : function(setting, callback) {
            BootstrapDialog.confirm( setting, callback );
        },
        loading : function(setting, callback) {
            loadinginstance = BootstrapDialog.loading(setting, callback);
        },
        closeLoading : function() {
          loadinginstance && typeof loadinginstance.close === 'function' && loadinginstance.close();
        },
        closeAll : function() {
            $.each(BootstrapDialog.dialogs, function(id, dialog){
                dialog.close();
            });
        }
    };
};

gRBC.fire = new function() {
    return {
        login : function() {
            HTCAccount_login();
        },
        logout : function() {
            HTCAccount_logout();
        }
    };
};

function location_index() {
    if( REFERER_SOURCE != '') {
        window.location.href = SITEURL+"hero.php?source="+REFERER_SOURCE;
    } else {
        window.location.href = SITEURL+"hero.php";
    }
}
function location_reload() {
    window.location.reload(true);
}
function fire_login() {
	
  if (REFERER_SOURCE==="htchome") {
    window.HtcHomeLoginInterface.loginRequest();
  } else {
    gRBC.fire.login();
  }
}
function fire_logout() {
  if (REFERER_SOURCE==="htchome") {
    window.HtcHomeLoginInterface.logoutRequest();
  } else {
    gRBC.fire.logout();
  }
}
function loginByToken(token) {
  var loginStatus = {
    authResponse : {
      access_token : token
    }
  };
  HTCAccount_excuteAtConnected_callback(loginStatus);
}
function loginFail(errorCode) {
  window.HtcHomeLoginInterface.loginFail(errorCode);
}
function logoutHtcAccount() {
  fire_logout();
}
function uprofile(uid) {
    window.location.href = "htchome.php?mod=user&ac=profile&uid="+uid;
}
/**
 * Trigger a callback when 'this' image is loaded:
 * @param {Function} callback
 */
(function($){
    $.fn.imgLoad = function(callback) {
        return this.each(function() {
            if (callback) {
                if (this.complete || /*for IE 10-*/ $(this).height() > 0) {
                    callback.apply(this);
                }
                else {
                    $(this).on('load', function(){
                        callback.apply(this);
                    });
                }
            }
        });
    };

  $.fn.center = function (topOffset, leftOffset) {
    var height = $.isNumeric(this.outerHeight()) ? this.outerHeight() : $(this).height(),
        width = $.isNumeric(this.outerWidth()) ? this.outerWidth() : $(this).width(),
        top = ($(window).height() / 2) - (height / 2),
        left = ($(window).width() / 2) - (width / 2);
    if ($.isNumeric(topOffset)) {
      top += topOffset;
    }
    if ($.isNumeric(leftOffset)) {
      left += leftOffset;
    }
    this.css("position","fixed");
    this.css("top", top);
    this.css("left", left);
    if ($(this).attr("id").length > 0) {
      $(this).css('top', top + "px");
    }
    return this;
  }
})(jQuery);
