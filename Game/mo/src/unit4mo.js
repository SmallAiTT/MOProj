

var mo = mo || {};
mo.resCfg = mo.resCfg || {};
mo.unit = mo.unit || {};

/**
 * Desc:test for sprite.
 * @param cfgName
 */
mo.testSprite = function(cfgName){

    mo.Layer4Test = mo.Layer4Test || cc.Layer.extend({
        init : function(spriteClazz, args){
            this._super();
            var node = spriteClazz.create(args);
            node.setAnchorPoint(cc.p(0.5, 0.5));
            this.addChild(node);
            var winSize = cc.Director.getInstance().getWinSize();
            node.setPosition(winSize.width/2, winSize.height/2);
            return true;
        }
    });
    mo.Layer4Test.create = mo.Layer4Test.create || function(spriteClazz, args){
        var layer = new mo.Layer4Test();
        return layer.init(spriteClazz, args) ? layer : null;
    };
    var cfg = ResCfg[cfgName];
    cfg.args = cfg.args || {};
    cc.LoaderScene.preload(mo.getLoadRes(cfgName, null, true), function(){
        var scene = cc.Scene.create();
        var clazz = mo.getClazz(cfg.sprite);
        scene.addChild(mo.Layer4Test.create(clazz, cfg.args || {}));
        cc.Director.getInstance().replaceScene(scene);
    });
};
/**
 * Desc: test for layer.
 * @param cfgName
 */
mo.testLayer = function(cfgName){
    var cfg = ResCfg[cfgName];
    cfg.args = cfg.args || {};
    cc.LoaderScene.preload(mo.getLoadRes(cfgName, null, true), function(){
        var scene = cc.Scene.create();
        var clazz = mo.getClazz(cfg.layer);
        scene.addChild(clazz.create(cfg.args || {}));
        cc.Director.getInstance().replaceScene(scene);
    });
};
/**
 * Desc: test for scene.
 * @param cfgName
 */
mo.testScene = function(cfgName){
    var cfg = ResCfg[cfgName];
    cfg.args = cfg.args || {};
    cc.LoaderScene.preload(mo.getLoadRes(cfgName, null, true), function(){
        var clazz = mo.getClazz(cfg.scene);
        var scene = clazz.create(cfg.args || {});
        cc.Director.getInstance().replaceScene(scene);
    });
};
/**
 * Desc: test for ccbi.
 * @param cfgName
 */
mo.testCCBI = function(cfgName){
    var cfg = ResCfg[cfgName];
    cfg.args = cfg.args || {};
    cc.LoaderScene.preload(mo.getLoadRes(cfgName, null, true), function(){
        var node = cc.BuilderReader.load(cfgName);
        var scene = cc.Scene.create();
        if(node != null) scene.addChild(node);
        cc.Director.getInstance().replaceScene(scene);
    });
};

/**
 * Desc: enter point of test unit.
 * @param cfgName
 */
mo.test = function(cfgName){
    var cfg = ResCfg[cfgName];
    if(cfg.scene){
        mo.testScene(cfgName);
    }else if(cfg.layer){
        mo.testLayer(cfgName);
    }else if(cfg.sprite){
        mo.testSprite(cfgName);
    }else{
        mo.testCCBI(cfgName);
    }
};