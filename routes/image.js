var childProcess = require('child_process');
var phantomjs = require('phantomjs');
var fs = require('fs');
var url = require('url');

var binPath = phantomjs.path;
var render = "phantom/render.js";
var imgDir = "public/screenshot/";
var contentType = "image/png";
var ext = ".png";
var viewWD = 1024;
var viewHD = 768;
var clipWD = 1024;
var clipHD = 768;
var topHD = 0;
var leftWD = 0;
var delayD = 0;
var timeD = Date.now();
var userAgentD = "";

exports.index = function(req, res){
    var targetURL = req.query.url;
    if(targetURL){
        var viewW = Number(req.query.viewW) <= 0 ? viewWD : Number(req.query.viewW);
        var viewH = Number(req.query.viewH) <= 0 ? viewHD : Number(req.query.viewH);
        var clipW = Number(req.query.clipW) < 0 ? clipWD : Number(req.query.clipW);
        var clipH = Number(req.query.clipH) < 0 ? clipHD : Number(req.query.clipH);
        var topH = Number(req.query.topH) < 0 ? topHD : Number(req.query.topH);
        var leftW = Number(req.query.leftW) < 0 ? leftWD : Number(req.query.leftW);
        var delay = Number(req.query.delay) < 0 ? delayD : Number(req.query.delay);
        var time = req.query.time || timeD;
        var userAgent = req.query.ua || userAgentD;
        var parsedURL = url.parse(targetURL);
        if(parsedURL){
            var filename = imgDir + parsedURL.hostname + "_" + time + ext;
            childProcess.execFile(binPath, [
                render, targetURL, filename, viewW, viewH, clipW, clipH, topH, leftW, delay, userAgent
            ], function(error, stdout, stderr){
                var buf = fs.readFileSync(filename);
                res.set("Content-Type", contentType);
                res.send(buf);
            });
        }
    }
};