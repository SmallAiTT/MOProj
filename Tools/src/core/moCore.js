/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-10-13
 * Time: 下午8:06
 * To change this template use File | Settings | File Templates.
 */

var fs = require("fs");

var moCore = {};
moCore.trans2Module = function(src, target, requireArr, name){
    var content = fs.readFileSync(src).toString();
    var requireStr = "";
    for(var i = 0, li = requireArr.length; i < li; ++i){
        var strs = requireArr[i].split("->");
        requireStr = requireStr + "var " + strs[0] + " = require('" + strs[1] + "');\r\n";
    }
    fs.writeFileSync(target, requireStr + content + "\r\nmodule.exports = " + name + ";");
};

module.exports = moCore;