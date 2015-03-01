(function (global, undefined) {
    "use strict";
    var DrawSomething = global.DrawSomething = global.DrawSomething || {};
    var Models = DrawSomething.Models = DrawSomething.Models || {};


    Models.Point = function (x, y) {
        var me = this;
        me.x = x;
        me.y = y;
        me.date = new Date().getTime();
    };

    Models.Path = function (color, lineWidth) {
        var me = this;
        me.points = [];
        me.color = color;
        me.lineWidth = lineWidth;
    };
    
})(this)
 
 