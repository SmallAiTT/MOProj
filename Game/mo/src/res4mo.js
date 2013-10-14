/**
 * Created with JetBrains WebStorm.
 * User: small
 * Date: 13-10-12
 * Time: 下午5:10
 * To change this template use File | Settings | File Templates.
 */

var mo = mo || {};
mo.resCfg = mo.resCfg || {};

/**
 * Desc: merge res info into target.
 * @param target
 * @param arr
 * @param store
 * @private
 */
mo._mergeResArr = function(target, arr, store){
    arr.forEach(function(value){
        if(value == null) return;
        value = typeof value == "string" ? {src : value} : value;
        if(store[value.src]) return;
        store[value.src] = true;
        target.push(value);
    });
};

/**
 * Desc: merge js path info into target.
 * @param target
 * @param arr
 * @param store
 * @private
 */
mo._mergeJsArr = function(target, arr, store){
    arr.forEach(function(value){
        if(value == null) return;
        store[value] = true;
        target.push(value);
    });
};

/**
 * Desc: get the res for loading.
 * @param loadResName
 * @param store
 * @param isTest
 * @returns {Array}
 */
mo.getLoadRes = function(loadResName, store, isTest){
    if(loadResName == null) return [];
    if(typeof loadResName != "string") throw "Argument should be String!"
    var loadRes = mo.resCfg[loadResName];
    var resArr = [];
    store = store || {};
    if(loadRes){
        if(loadRes.ref != null){
            loadRes.ref.forEach(function(value, index){
                if(typeof value == "string"){
                    if(store[value]) return;
                    mo._mergeResArr(resArr, mo.getLoadRes(value, store, isTest), {});
                }else if(value instanceof Array){
                    mo._mergeResArr(resArr, value, store);
                }
            });
        }
        if(loadRes.res) mo._mergeResArr(resArr, loadRes.res, store);
        if(isTest && loadRes.testRes) mo._mergeResArr(resArr, loadRes.testRes, store);
    }
    if(loadResName.length > 5
        && loadResName.substring(loadResName.length - 5).toLowerCase() == ".ccbi"
        && store[loadResName] != true){
        resArr.push({src : loadResName})
    }
    store[loadResName] = true;
    return resArr;
};
/**
 * Desc: get js array 4 loading.
 * @param loadResName
 * @param type
 * @param store
 * @returns {Array}
 */
mo.getLoadJs = function(loadResName, type, store){
    if(loadResName == null) return [];
    if(typeof loadResName != "string") throw "Argument should be String!"
    var loadRes = mo.resCfg[loadResName];
    var jsArr = [];
    store = store || {};
    if(loadRes != null){
        if(loadRes.ref != null){
            loadRes.ref.forEach(function(value, index){
                if(typeof value == "string"){
                    if(store[value] == true) return;
                    mo._mergeJsArr(jsArr, mo.getLoadJs(value, type, store), {});
                }
            });
        }
        if(loadRes[type] != null) mo._mergeJsArr(jsArr, loadRes[type], store);
    }
    if(type == "appFiles"
        && loadResName.length > 3
        && loadResName.substring(loadResName.length - 3).toLowerCase() == ".js"
        && store[loadResName] != true){
        jsArr.push(loadResName);
    }
    store[loadResName] = true;
    return jsArr;
};

/**
 * Desc: get app files 4 cfg.
 * @param key
 * @param files
 * @param type
 */
mo.getAppFiles = function(key, files, type){
    files = files || [];
    //获取到的数组是有先后顺序的
    var temp = mo.getLoadJs(key, type, {});
    temp.forEach(function(v, i){
        if(files.indexOf(v) < 0){
            files.push(v);
        }
    });
};
/**
 * Desc: init file path with dir.
 * @param arr
 * @param dir
 */
mo.initFilesByDir = function(arr, dir){
    if(!dir) return;
    arr.forEach(function(value, index){
        arr[index] = dir + value;
    });
};
/**
 * Desc: init cfg before loading.
 * @param cfg
 */
mo.initCfg = function(cfg){
    cfg.appFiles = cfg.appFiles || [];
    var moFiles = [], appFiles = [], testFiles = [];
    if(cfg.runMode == "test"){
        moFiles = mo.pushArr(moFiles, mo.getLoadJs(cfg.testCfg, "moFiles"));
        appFiles = mo.pushArr(appFiles, mo.getLoadJs(cfg.testCfg, "appFiles"));
        testFiles = mo.pushArr(testFiles, mo.getLoadJs(cfg.testCfg, "testFiles"));
        mo.initFilesByDir(moFiles, cfg.moDir);
        mo.initFilesByDir(appFiles, cfg.projectDir);
        mo.initFilesByDir(testFiles, cfg.testDir);
    }else{
        for(var key in mo.resCfg){
            if(key == null || typeof key != "string") return;
            mo.getAppFiles(key, moFiles, "moFiles");
        }
        for(var key in mo.resCfg){
            if(key == null || typeof key != "string") return;
            mo.getAppFiles(key, appFiles, "appFiles");
        }
        mo.initFilesByDir(moFiles, cfg.moDir);
        mo.initFilesByDir(appFiles, cfg.projectDir);
    }
    cfg.appFiles = cfg.appFiles.concat(moFiles, appFiles, testFiles);
    if(cfg.gameVersion){
        cfg.appFiles.forEach(function(value, index){
            cfg.appFiles[index] = value + "?v=" + cfg.gameVersion;
        });
    }
};
