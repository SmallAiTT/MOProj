/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 13-10-13
 * Time: 下午7:22
 * To change this template use File | Settings | File Templates.
 */

uw.ASprite = cc.Sprite.extend({
    init : function(){
        this._super(Res.a_png);
        return true;
    }
});

uw.ASprite.create = function(args){
    var layer = new uw.ASprite();
    return layer.init() ? layer : null;
};