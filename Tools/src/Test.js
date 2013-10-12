/**
 * Created with JetBrains WebStorm.
 * User: small
 * Date: 13-10-12
 * Time: 下午5:47
 * To change this template use File | Settings | File Templates.
 */

var fs = require("fs");

var ResStr = fs.readFileSync("../../Game/cfg/Res.js").toString();

fs.writeFileSync("./Res.js", ResStr + "\r\nmodule.exports = Res");

var ResCfgStr = fs.readFileSync("../../Game/cfg/ResCfg.js").toString();

fs.writeFileSync("./ResCfg.js", "var Res = require('./Res.js');\r\n" + ResCfgStr + "\r\nmodule.exports = ResCfg");

var ResCfg = require("./ResCfg.js");
console.log(ResCfg);