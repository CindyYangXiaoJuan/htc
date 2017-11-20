//v3
if (typeof janrain_share_orientation=="undefined") {
    var janrain_share_orientation = "horizontal";
}
if (typeof janrain_share_formFactor=="undefined") {
    var janrain_share_formFactor = "bar";
}
janrain.settings.appUrl = JANRAIN_APPURL;
janrain.settings.social = {
    providers: [
        "native-facebook",
        "native-googleplus",
        "native-twitter",
        "native-pinterest",
        "native-linkedin"
    ],
    orientation: janrain_share_orientation,//horizontal,vertical
    formFactor: janrain_share_formFactor//bar,drawer
};
janrain.settings.social.providerIcons = {
    "facebook":"inc/img/me/facebook.png",
    "native-googleplus":"inc/img/me/googleplus.png",
    "twitter":"inc/img/me/twitter.png",
    "native-pinterest":"inc/img/me/pintrest.png",
    "linkedin":"inc/img/me/linkedin.png"
};

function janrainSocialOnLoad() {
    // This function is called when the Share v3 widget is loaded

    if (typeof janrain.social.lastShareId=="undefined") {
        return;
    }
    var currentShareCounter = null;
    janrain.social.lastShareId.subscribe(function(newId) {
        // Increment the last share counter on successful share.
        // Note: this count will not persist when the page is refreshed.
        var count = parseInt(currentShareCounter.innerText);
        var newCount =  count + 1;
        currentShareCounter.innerHTML = currentShareCounter.innerHTML.replace(count.toString(), newCount.toString());
    });

    // Function to find the share count element given a parent share container
    var findCountElement = function(parentNode) {
        for (var child = parentNode.firstChild; child; child = child.nextSibling) {
            if (child.className && child.className.match(/janrainShareCountContainer/)) {
                return child;
            }
        }
        return null;
    };

    // Listen to provider button clicks to set the "current" share count element
    var clickListener = function(element) {
        element.addEventListener("click", function(event) {
            currentShareCounter = findCountElement(event.target.parentNode.parentNode.parentNode);
        }, false);
    };

    var providerButtons = document.getElementsByClassName("janrainProvider");
    for (var i = 0; i < providerButtons.length; i++) {
        clickListener(providerButtons[i]);
    }

    $(".janrainDrawerButton").each(function(){
        $(this).text("分享");
    });
};

$(document).ready(function(){
    $(document).on("click", ".janrainDrawerButton", function(event) {
        var lastButton = this;
        $(".janrainDrawerButton").each(function(index) {
            var rootElement = $(this).parent().parent().parent();
            if (this != lastButton && rootElement.hasClass('janrainProviderListOpen')) {
                rootElement.removeClass('janrainProviderListOpen');
            }
        });
    });

    $(document).on("click", ".janrainProvider", function(){
        check_form_act(document.form_act);
    });
});

function check_form_act(form) {
    form.formactsubmit.value = true;
    var data = $(form).serializeObject();
    data = $.extend({}, data, {act:"SharePost"});
    $.ajax({
        url: 'community/creditRule.php',
        data: data,
        type: 'POST',
        success: function(data){
            //console.log(data)
        },
        dataType: "html"
    })
    .done(function() {
        form.formactsubmit.value = false;
    });
    return false;
}