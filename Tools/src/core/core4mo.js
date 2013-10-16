/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-10-13
 * Time: 下午8:06
 * To change this template use File | Settings | File Templates.
 */

var fs = require("fs");
var path = require("path");

var core4mo = {};
core4mo.trans2Module = function(src, targetDir, requireArr, name){
    if(!fs.existsSync(targetDir)) fs.mkdirSync(targetDir);
    var srcBaseName = path.basename(src);
    name = name || path.basename(src, ".js");
    var content = fs.readFileSync(src).toString();
    var requireStr = "";
    for(var i = 0, li = requireArr.length; i < li; ++i){
        var strs = requireArr[i].split("->");
        requireStr = requireStr + "var " + strs[0] + " = require('" + strs[1] + "');\r\n";
    }
    fs.writeFileSync(targetDir + srcBaseName, requireStr + content + "\r\nmodule.exports = " + name + ";");
};

core4mo.merge2Module = function(srcs, target, requireArr, name){
    var targetDir = path.dirname(target);
    if(!fs.existsSync(targetDir)) fs.mkdirSync(targetDir);
    var content = "";
    for(var i = 0, li = srcs.length; i < li; ++i){
        content += fs.readFileSync(srcs[i]).toString() + "\r\n";
    }
    var requireStr = "";
    for(var i = 0, li = requireArr.length; i < li; ++i){
        var strs = requireArr[i].split("->");
        requireStr = requireStr + "var " + strs[0] + " = require('" + strs[1] + "');\r\n";
    }
    fs.writeFileSync(target, requireStr + content + "\r\nmodule.exports = " + name + ";");
};
core4mo.require = function(js){
    var callerJs = module.parent ? path.dirname(module.parent.filename) : __dirname;
//    var filePath = path.relative(path.relative(toolPath, callerJs), js);
    var filePath = path.relative("src/core", js);
    if(filePath.indexOf(".") != 0) filePath = "./" + filePath;
    return require(filePath);
};
module.exports = core4mo;