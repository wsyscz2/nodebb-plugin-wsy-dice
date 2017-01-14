(function(Plugin) {
    'use strict';

    var winston = require('winston');
    //winston.info("load plugin dice");
    Plugin.hooks = {
        filter: function(payload, callback) {
            winston.info(payload);
            callback(null, payload);
        },
        action: function(postData) {
            //winston.info(postData);
        }
    };
})(module.exports);