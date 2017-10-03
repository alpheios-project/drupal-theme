window.onload = function() { 
    if (navigator.userAgent.indexOf("Firefox") == -1 ||
            navigator.userAgent.indexOf(FIREFOX_VERSION_TEST) == -1)
        {
            $(".alpheios-check-browser").html(
                 '<div class="error">' +
                 'The Alpheios tools currently require Firefox ' +
                 ' plus the Alpheios Firefox extensions. Make a tax-deductible <a href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=X96XCB66LLKMQ" alt="donate">donation</a> to help us add cross-browser support.</div></li>');
            return;
        }

    var pkgs = getAlpheiosPackages();
    $(".alpheios-install-links").each(
    function()
    {
        var show = false;
        var needs = this.getAttribute("alpheios-requirement").split(/,/);
        for (var i=0; i<needs.length;i++)
        {
            var pkg = needs[i];
            if (! (pkgs[pkg] && pkgs[pkg].metRequirement))
            {
                show = true;
            }
            
        }
        if (show)
        {
            $(this).css("display","block");        
        }
        else
        {
            $(this).css("display","none");        
        }
        
    });
    var cookie = readCookie('alpheios-update-warning');
    if (pkgs.reader.installed.match(/1.0beta1/) && ! cookie)
    { 
        if (confirm("Updated versions of the Alpheios Tools are available for download.\nClick OK to open the installation page."))
       {
           window.open("http://alpheios.net/content/installation");
       }
       createCookie("alpheios-update-warning", true, 1);
    }
};
$(document).ready( function() {
  $("#alpheios-texts-block .tochead").click(
       function(a_e)
       {
            if ($(a_e.target).hasClass('tochead'))
            {
                $(this).toggleClass("openmenu")
                $(this).children().toggle();
                return false;
            }
            
        });
  $("#alpheios-texts-block .tochead:not(.openmenu)").children().hide();
} );

function createCookie(a_name,a_value,a_days) {
    if (a_days) {
	var date = new Date();
	date.setTime(date.getTime()+(a_days*24*60*60*1000));
	var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = a_name+"="+a_value+expires+"; path=/";
}

function readCookie(a_name) {
    var ca = document.cookie.split(';');
    var value = '';
    for(var i=0;i < ca.length;i++) {
 	var c = ca[i];
	c = c.replace(/^\s+/,'');
        if (c.indexOf(a_name+"=") == 0) 
        { 
            value = c.substring(a_name.length+1,c.length);
            break;
        }
    }
    return value;
}

function eraseCookie(a_name) {
    createCookie(a_name,"",-1);
}

