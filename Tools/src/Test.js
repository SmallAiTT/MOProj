/**
 * Created with JetBrains WebStorm.
 * User: small
 * Date: 13-10-12
 * Time: 下午5:47
 * To change this template use File | Settings | File Templates.
 */

var fs = require("fs");
var moCore = require("./core/moCore.js");

moCore.trans2Module("../../Game/cfg/Res.js", "./Res.js", [], "Res");
moCore.trans2Module("../../Game/cfg/ResCfg.js", "./ResCfg.js", ["Res->./Res.js"], "ResCfg");
moCore.trans2Module("../../Game/mo/src/mo.js", "./mo.js", [], "mo");

var Res = require("./tmp/Res.js");
var ResCfg = require("./tmp/ResCfg.js");
var mo = require("./mo.js");
mo.cfg = ResCfg;
var arr = mo.getLoadRes(Res.e_js, null, false);
console.log(arr);