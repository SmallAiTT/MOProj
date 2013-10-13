/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-10-13
 * Time: 下午8:06
 * To change this template use File | Settings | File Templates.
 */

var fs = require("fs");
var path = require("path");

var moCore = {};
moCore.trans2Module = function(src, targetDir, requireArr, name){
    if(!fs.existsSync(targetDir)) fs.mkdirSync(targetDir);
    var srcBaseName = path.basename(src);
    console.log("fffff")
    console.log(name);
    name = name || path.basename(src, ".js");
    console.log(name);
    var content = fs.readFileSync(src).toString();
    var requireStr = "";
    for(var i = 0, li = requireArr.length; i < li; ++i){
        var strs = requireArr[i].split("->");
        requireStr = requireStr + "var " + strs[0] + " = require('" + strs[1] + "');\r\n";
    }
    fs.writeFileSync(targetDir + srcBaseName, requireStr + content + "\r\nmodule.exports = " + name + ";");
};

module.exports = moCore;