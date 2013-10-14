/**
 * Desc: log for mo.
 * User: small
 * Date: 13-10-12
 * Time: 下午5:10
 * To change this template use File | Settings | File Templates.
 */

var mo = mo || {};

/**
 * Desc: log position.
 * @param pos
 * @param tag
 */
mo.logPos = function(pos, tag){
    var str = "position--->";
    str = tag == null ? str : "[" + tag + "]" + str;
    str += "(" + pos.x + ", " + pos.y + ")";
    if(cc) cc.log(str);
    else console.log(str);
};

/**
 * Desc: log size.
 * @param size
 * @param tag
 */
mo.logSize = function(size, tag){
    var str = "size--->";
    str = tag == null ? str : "[" + tag + "]" + str;
    str += "(" + size.width + ", " + size.height + ")";
    if(cc) cc.log(str);
    else console.log(str);
};

/**
 * Desc: log array.
 * @param arr
 * @param tag
 */
mo.logArr = function(arr, tag){
    tag = tag || "arr";
    arr.forEach(function(value, index){
        if(cc){
            cc.log(tag + "[" + index + "]--->");
            cc.log(value);
        }else{
            console.log(tag + "[" + index + "]--->");
            console.log(value);
        }
    });
};
