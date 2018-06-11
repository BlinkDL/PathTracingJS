"use strict";

var Sphere = function (x, y, z, r) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.r = r;
    this.rr = r * r;
};
Sphere.prototype = {
    // returns distance when ray intersects with sphere surface
    intersect: function (ray) {
        var dx = ray[0] - this.x;
        var dy = ray[1] - this.y;
        var dz = ray[2] - this.z;
        var b = dx * ray[3] + dy * ray[4] + dz * ray[5];
        var c = dx * dx + dy * dy + dz * dz - this.rr;
        var d = b * b - c;
        return d > 0 ? -b - Math.sqrt(d) : -1;
    },
    getNormal: function (x, y, z, out) {
        var vx = x - this.x;
        var vy = y - this.y;
        var vz = z - this.z;
        var vl = 1.0 / Math.sqrt(vx * vx + vy * vy + vz * vz);
        out[0] = vx * vl;
        out[1] = vy * vl;
        out[2] = vz * vl;
    }
};

var Body = function (shape, material) {
    this.shape = shape;
    this.material = material;
}
