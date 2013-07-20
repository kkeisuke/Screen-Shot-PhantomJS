var page = require('webpage').create();

var url = phantom.args[0];
var filename = phantom.args[1];
var viewW = phantom.args[2];
var viewH = phantom.args[3];
var clipW = phantom.args[4];
var clipH = phantom.args[5];
var topH = phantom.args[6];
var leftW = phantom.args[7];
var delay = phantom.args[8];
var userAgent = phantom.args[9];

switch(userAgent.toLowerCase()){
    case "iphone":
        page.settings.userAgent = "Mozilla/5.0 (iPhone; CPU iPhone OS 6_0_1 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A525 Safari/8536.25";
        break;
    case "android":
        page.settings.userAgent = "Mozilla/5.0 (Linux; U; Android 4.0.4; ja-jp; Nexus S Build/IMM76D) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30";
        break;
    default :
        break;
}

page.viewportSize = {width:viewW, height:viewH};
page.clipRect = {top:topH, left:leftW, width:clipW, height:clipH};
page.open(url, function(status){
    setTimeout(function(){
        page.render(filename);
        page.close();
        phantom.exit();
    }, delay);
});