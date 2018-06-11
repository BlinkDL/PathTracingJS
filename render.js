"use strict";

// TODO: webworker
// TODO: tent sampler
// TODO: faster diffuse sampler
// TODO: correct mirror and fresnel

var Renderer = function () {
    this.iterations = 0;
}

Renderer.prototype = {
    iterate: function () {
        this.iterations++;
        var ray = new Float64Array(10);
        var normal = new Float64Array(3);

        for (var y = 0; y < height; y++) {
            for (var x = 0; x < width; x++) {

                var segment = 0;
                var prob = 1.0;

                var zz = y * width + x;
                var z = zz * 3;
                //var vvv = 0;
                camera.getRay(x / width, y / height, ray); // get random ray through pixel

                var hit_light = false;

                while (true) {

                    var dist = Infinity;
                    var hit = null;
                    for (var i = 0; i < scene.length; i++) {
                        var o = scene[i];
                        var t = o.shape.intersect(ray); // distance
                        if (t > 1e-6 && t < dist) {
                            dist = t;
                            hit = o;
                        }
                    }

                    if (hit == null) {
                        break;
                    }
                    if ((hit.material.emission[0] != 0) || (hit.material.emission[1] != 0) || (hit.material.emission[2] != 0)) {
                        hit_light = true;
                        ray[7] *= hit.material.emission[0];
                        ray[8] *= hit.material.emission[1];
                        ray[9] *= hit.material.emission[2];
                        break;
                    }

                    var px = ray[0] + ray[3] * dist;
                    var py = ray[1] + ray[4] * dist;
                    var pz = ray[2] + ray[5] * dist;
                    hit.shape.getNormal(px, py, pz, normal);

                    hit.material.bounce(ray, normal);

                    ray[0] = px;
                    ray[1] = py;
                    ray[2] = pz;

                    ray[7] *= hit.material.color[0];
                    ray[8] *= hit.material.color[1];
                    ray[9] *= hit.material.color[2];

                    segment++;

                    if (segment > 3) prob = 0.7; //shouldnt weight by ray color, otherwise will have low-quality shadow and other artifacts
                    ray[6] /= prob;
                    if (Math.random() > prob) {
                        break;
                    }
                }

                if (hit_light) {
                    buffer[z + 0] += ray[7] * ray[6];
                    buffer[z + 1] += ray[8] * ray[6];
                    buffer[z + 2] += ray[9] * ray[6];
                }


                count[zz] += 1.0;
            }
        }
    }
}
