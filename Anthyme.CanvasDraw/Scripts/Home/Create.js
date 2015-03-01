(function (global, undefined) {
    "use strict";
    var Point = DrawSomething.Models.Point;
    var Path = DrawSomething.Models.Path;
    var DrawEngine = DrawSomething.DrawEngine;


    var painting = false;
    var drawEngine;
    var paths = [];
    var currentPath = null;
    var lastPoint = null;

    var ready = function () {
        var canvas = document.getElementById("surface");
        drawEngine = new DrawEngine(canvas);

        $("#surface")
            .mousemove(mouseMove)
            .mousedown(mouseDown)
            .mouseup(stopTracking)
            .mouseout(stopTracking);
        $("form").submit(submit);

        $("#colorPicker").click(colorPicked);
        $("#sizePicker").click(sizePicked);
    };


    var submit = function (e) {
        $("#Data").val(JSON.stringify(paths));
    };

    var colorPicked = function (e) {
        drawEngine.color = $(e.target).css("background-color");
        drawEngine.updateParameters();
    };

    var sizePicked = function (e) {
        drawEngine.lineWidth = e.target.innerHTML;
        drawEngine.updateParameters();
    };

    var mouseDown = function (e) {
        painting = true;

        currentPath = new Path(drawEngine.color, drawEngine.lineWidth);
        lastPoint = new Point(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
        currentPath.points.push(lastPoint);
        drawEngine.draw(lastPoint, lastPoint);
    };

    var mouseMove = function (e) {
        if (painting) {
            var point = new Point(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);

            if (Math.abs(point.date - lastPoint.date) > 100
                    || Math.abs(point.x - lastPoint.x) > 3
                    || Math.abs(point.y - lastPoint.y) > 3) {
                drawEngine.draw(lastPoint, point);
                lastPoint = point;
                currentPath.points.push(point);
            }
        }
    };

    var stopTracking = function (e) {
        painting = false;

        if (currentPath != null) {
            paths.push(currentPath);
            currentPath = null;
        }
    };

    $(document).ready(ready);
})(this)