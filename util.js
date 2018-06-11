"use strict";

var canvas = document.getElementById('c');
var width = canvas.width;
var height = canvas.height;
var ctx = canvas.getContext('2d');
var image = ctx.getImageData(0, 0, width, height);
var buffer = new Float64Array(width * height * 3);
var variance = new Float64Array(width * height * 3);
var count = new Float64Array(width * height);
var sqrt2 = Math.sqrt(2);

var Camera = function (origin, topleft, topright, bottomleft) {
    this.origin = origin;
    this.topleft = topleft;
    this.topright = topleft;
    this.bottomleft = bottomleft;

    this.xdx = topright[0] - topleft[0];
    this.xdy = topright[1] - topleft[1];
    this.xdz = topright[2] - topleft[2];
    this.ydx = bottomleft[0] - topleft[0];
    this.ydy = bottomleft[1] - topleft[1];
    this.ydz = bottomleft[2] - topleft[2];
};
Camera.prototype = {
    getRay: function (x, y, out) {

        // box sampler is the best
        // notice: in fancy overlapping samplers, a ray shall contribute to multiple samples
        var a = Math.random();
        var b = Math.random();

        var px = this.topleft[0] + this.xdx * (x + a / width) + this.ydx * (y + b / height) - this.origin[0];
        var py = this.topleft[1] + this.xdy * (x + a / width) + this.ydy * (y + b / height) - this.origin[1];
        var pz = this.topleft[2] + this.xdz * (x + a / width) + this.ydz * (y + b / height) - this.origin[2];
        var pf = 1.0 / Math.sqrt(px * px + py * py + pz * pz);

        out[0] = this.origin[0];
        out[1] = this.origin[1];
        out[2] = this.origin[2];
        out[3] = px * pf;
        out[4] = py * pf;
        out[5] = pz * pf;
        out[6] = 1.0; // weight for R.R.
        out[7] = 1.0; // color r
        out[8] = 1.0; // color g
        out[9] = 1.0; // color b
    }
};
var camera = new Camera(
    new Float64Array([0.0, -3.0, 0.25]),
    new Float64Array([-1.6, 1.0, 0.9]),
    new Float64Array([1.6, 1.0, 0.9]),
    new Float64Array([-1.6, 1.0, -0.9])
);
