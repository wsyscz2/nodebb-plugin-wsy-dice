(function(Plugin) {
    'use strict';

    var winston = require('winston'),
        seedrandom = require('seedrandom');

    var constant = require('./plugin/constants.js')
    var tempInfo = {};

    //winston.info("load plugin dice");
    Plugin.hooks = {
        parse: function(payload, callback) {
            winston.info("hooks.parse==================================")
            //TODO:change roll formula to roll result, use saved random result if there is any
            winston.info(payload);
            //cut seed tail
            payload.postData.content = payload.postData.content.replace(constant.REG_DICE_SEED, "");

            winston.info(payload);
            winston.info("=============================================");
            callback(null, payload);
        },
        edit: function(payload, callback) {
            winston.info("hooks.edit===================================");
            winston.info(payload);
            winston.info(tempInfo);
            //TODO:add saved random seed to end of the content
            if (tempInfo[payload.post.pid] !== undefined) {
                winston.info("add seed back");
                payload.post.content += tempInfo[payload.post.pid];
                tempInfo[payload.post.pid] = undefined;
            }

            winston.info(payload);
            winston.info("=============================================");
            callback(null, payload);
        },
        create: function(payload, callback) {
            winston.info("hooks.create=================================");
            winston.info(payload);
            //TODO:add a random seed to end of the content
            var rng = seedrandom();
            var $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
            var maxPos = $chars.length;
            var seed = '';
            for (var i = 0; i < 32; i++) {
                seed += $chars.charAt(Math.floor(rng() * maxPos));
            }
            payload.post.content += "\n[diceseed]" + seed + "[/diceseed]";

            winston.info("add dice seed");
            winston.info(payload.post.content);
            winston.info("=============================================");
            callback(null, payload);
        },
        get: function(payload, callback) {
            winston.info("hooks.get====================================");
            winston.info(payload);
            //TODO:save the random seed at the end of the content
            var ret = payload.content.match(constant.REG_DICE_SEED);
            if (ret !== null) {
                tempInfo[payload.pid] = ret[ret.length - 1];
            }

            winston.info(payload);
            winston.info("=============================================");
            callback(null, payload);
        },
        getFields: function(payload, callback) {
            winston.info("hooks.getFields==============================");
            //cut saved random seed at the end of the content
            winston.info(payload);

            for (var i = 0; i < payload.posts.length; ++i) {
                var data = payload.posts[i];
                winston.info(data);
                if (data.content !== undefined) {
                    winston.info("cut dice seed:" + data.content);
                    data.content = data.content.replace(constant.REG_DICE_SEED, "");
                }
            }

            winston.info(payload);

            winston.info("=============================================");
            callback(null, payload);
        }
    };
})(module.exports);