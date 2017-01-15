$(document).ready(function() {
    'use strict';

    $(window).on('action:composer.loaded', function(ev, data) {
        $(window).alert("lalala");
        $(console).log("composer loaded try to add something");
        //data.content += "add something";
    });
});