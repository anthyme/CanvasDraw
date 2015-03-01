(function (global, undefined) {
    "use strict";
    var DrawSomething = global.DrawSomething = global.DrawSomething || {};
    

    DrawSomething.DrawEngine = function (canvas) {
        var me = this;
        me.canvas = canvas;
        me.context = canvas.getContext("2d");

        me.color = "#000000";
        me.lineJoin = "round";
        me.lineWidth = 10;

        me.updateParameters = function () {
            me.context.lineJoin = me.lineJoin;
            me.context.strokeStyle = me.color;
            me.context.lineWidth = me.lineWidth;
        };

        me.draw = function (from, to) {
            me.context.beginPath();
            me.context.moveTo(from.x, from.y);
            me.context.lineTo(to.x, to.y);
            me.context.closePath();
            me.context.stroke();
        };

        me.updateParameters();
    };

})(this)