/**
 * Created with JetBrains WebStorm.
 * User: small
 * Date: 13-10-12
 * Time: 下午5:47
 * To change this template use File | Settings | File Templates.
 */

var core4mo = require("./core/core4mo.js");

var projPath = "../../";
var gamePath = projPath + "Game/"
var tmpPath = "./tmp/";

core4mo.trans2Module(gamePath + "cfg/Res.js", tmpPath, [], "Res");
core4mo.trans2Module(gamePath + "cfg/ResCfg.js", tmpPath, ["Res->./Res.js"], "ResCfg");
core4mo.trans2Module(gamePath + "cfg/ResModule.js", tmpPath, ["Res->./Res.js"], "ResModule");
core4mo.merge2Module([gamePath + "mo/src/mo.js", gamePath + "mo/src/res4mo.js"], tmpPath + "mo.js", [], "mo");

var Res = require(tmpPath + "Res.js");
var ResCfg = require(tmpPath + "ResCfg.js");
var ResModule = require(tmpPath + "ResModule.js");
var mo = require(tmpPath + "mo.js");
mo.resCfg = ResCfg;

for(var i = 0, li = ResModule.length; i < li; ++i){
    console.log("--------------------------");
    console.log("模块" + ResModule[i] + "所用的JS文件如下：");
    console.log(mo.getLoadJs(ResModule[i], "appFiles", {}));
    console.log("模块" + ResModule[i] + "所用的资源如下：");
    console.log(mo.getLoadRes(ResModule[i], null, false));
    console.log("--------------------------");
}

var cfg = {};
cfg.runMode = "test";
mo.initCfg(cfg);
console.log("所有的js文件列表如下：");
console.log(cfg);

//var a = mo.getLoadJs(Res.a_js, "appFiles");
//console.log(a);

