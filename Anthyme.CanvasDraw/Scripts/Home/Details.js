(function (global, undefined) {
    "use strict";
    var DrawEngine = DrawSomething.DrawEngine;
    
    var paths = [];
    var pathIndex = 0;
    var pointIndex = 0;
    var previousPoint = null;
    var key;

    var drawEngine;

    var ready = function () {
        $("#validTip").hide();

        var canvas = document.getElementById("surface");
        drawEngine = new DrawEngine(canvas);

        var jsonData = $("#Data").val();
        paths = JSON.parse(jsonData);

        $("#keyInput").keyup(keyTyped);
        key = $("#Key").val();

        next();
    };

    var getCurrentPoint = function () {
        return paths[pathIndex].points[pointIndex];
    };

    var keyTyped = function (e) {
        var input = $("#keyInput");
        if (input.val() == key) {
            input.hide();
            $("#validTip").show();
        }
    };

    var next;
    next = function () {

        var currentPoint = getCurrentPoint();
        var path = paths[pathIndex];

        if (pointIndex == 0) {
            drawEngine.color = path.color;
            drawEngine.lineWidth = path.lineWidth;
            drawEngine.updateParameters();
        } else {
            drawEngine.draw(previousPoint, currentPoint);
        }

        previousPoint = currentPoint;

        if (pointIndex == path.points.length - 1) {
            pointIndex = 0;
            pathIndex += 1;
        } else {
            pointIndex += 1;
        }

        if (pathIndex != paths.length) {
            var nextPoint = getCurrentPoint();

            setTimeout(next, nextPoint.date - currentPoint.date);
        }

        previousPoint = currentPoint;
    };

    $(document).ready(ready);
})(this)