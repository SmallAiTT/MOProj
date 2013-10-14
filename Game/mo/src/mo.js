/**
 * Created with JetBrains WebStorm.
 * User: small
 * Date: 13-10-12
 * Time: 下午5:10
 * To change this template use File | Settings | File Templates.
 */

var mo = mo || {};

/**
 * Desc: put src (Array) into target (Array) from startIndex to endIndex.
 * @param {Array} target
 * @param {Array} src
 * @param {Integer||null} startIndex
 * @param {Integer||null} endIndex
 * @returns {*}
 */
mo.pushArr = function(target, src, startIndex, endIndex){
    startIndex = startIndex == null ? 0 : startIndex;
    endIndex = endIndex == null ? src.length : endIndex;
    for(var i = startIndex; i < endIndex; ++i){
        target.push(src[i]);
    }
    return target;
};


mo.initBase = function(){
    mo.ANCHOR_POINT_TL = cc.p(0, 1);
    mo.ANCHOR_POINT_T = cc.p(0.5, 1);
    mo.ANCHOR_POINT_TR = cc.p(1, 1);
    mo.ANCHOR_POINT_L = cc.p(0, 0.5);
    mo.ANCHOR_POINT_C = cc.p(0.5, 0.5);
    mo.ANCHOR_POINT_R = cc.p(1, 0.5);
    mo.ANCHOR_POINT_BL = cc.p(0, 0);
    mo.ANCHOR_POINT_B = cc.p(0.5, 0);
    mo.ANCHOR_POINT_BR = cc.p(1, 0);

    mo.WIN_SIZE = cc.Director.getInstance().getWinSize();

    mo.WIN_CENTER = cc.p(mo.WIN_SIZE.width/2, mo.WIN_SIZE.height/2);
};