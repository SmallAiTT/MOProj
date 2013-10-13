/**
 * Created with JetBrains WebStorm.
 * User: small
 * Date: 13-10-12
 * Time: 下午5:47
 * To change this template use File | Settings | File Templates.
 */

var moCore = require("./core/moCore.js");

moCore.trans2Module("../../Game/cfg/Res.js", "./tmp/Res.js", [], "Res");
moCore.trans2Module("../../Game/cfg/ResCfg.js", "./tmp/ResCfg.js", ["Res->./Res.js"], "ResCfg");
moCore.trans2Module("../../Game/cfg/ResModule.js", "./tmp/ResModule.js", ["Res->./Res.js"], "ResModule");
moCore.trans2Module("../../Game/mo/src/MOResUtils.js", "./tmp/mo.js", [], "mo");

var Res = require("./tmp/Res.js");
var ResCfg = require("./tmp/ResCfg.js");
var ResModule = require("./tmp/ResModule.js");
var mo = require("./tmp/mo.js");
mo.resCfg = ResCfg;

for(var i = 0, li = ResModule.length; i < li; ++i){
    console.log("--------------------------");
    console.log("模块" + ResModule[i] + "所用的资源如下：");
    console.log(mo.getLoadRes(ResModule[i], null, false));
    console.log("--------------------------");
}

var cfg = {};
mo.initCfg(cfg);
console.log("所有的js文件列表如下：");
console.log(cfg);

