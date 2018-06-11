"use strict";

var scene = [
    // center sphere
    new Body(new Sphere(0.0, 3.0, 0.0, 0.5), new Metal(new Float64Array([1.0, 1.0, 1.0]), 0.8, 2.0)),
    // left sphere
    new Body(new Sphere(-1.1, 2.8, 0.0, 0.5), new Metal(new Float64Array([1.0, 1.0, 1.0]), 0.8, 2.0)),
    // right sphere
    new Body(new Sphere(1.0, 2.0, -0.15, 0.35), new Glass(new Float64Array([1.0, 1.0, 1.0]), 1.5)),
    // floor
    new Body(new Sphere(0.0, 3.5, -10e6, 10e6 - 0.5), new Material(new Float64Array([0.9, 0.9, 0.9]))),
    // back
    new Body(new Sphere(0.0, 10e6, 0.0, 10e6 - 4.5), new Metal(new Float64Array([1.0, 1.0, 1.0]), 0.8, 2.0)),
    // left
    new Body(new Sphere(-10e6, 3.5, 0.0, 10e6 - 1.9), new Material(new Float64Array([0.9, 0.3, 0.3]))),
    // right
    new Body(new Sphere(10e6, 3.5, 0.0, 10e6 - 1.9), new Material(new Float64Array([0.3, 0.3, 0.9]))),
    // top light, the emmision should be close to that of warm sunlight (~5400k)
    new Body(new Sphere(0.0, 0.0, 10e6, 10e6 - 2.5), new Material(new Float64Array([0.0, 0.0, 0.0]), new Float64Array([1.5, 1.5, 1.5]))),
    // front
    new Body(new Sphere(0.0, -10e6, 0.0, 10e6 - 1.0), new Material(new Float64Array([0.3, 0.9, 0.3]))),
];
