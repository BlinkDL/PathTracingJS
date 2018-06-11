"use strict";

var Material = function (color, emission) {
    this.color = color;
    this.emission = emission || new Float64Array([0.0, 0.0, 0.0]);
}
Material.prototype = {
    bounce: function (ray, normal) { // cosine weightet bounce

        var u1 = 0;
        var u2 = 0;
        var ux = 0;
        do {
            u1 = Math.random() * 2.0 - 1.0;
            u2 = Math.random() * 2.0 - 1.0;
            ux = u1 * u1 + u2 * u2;
        } while (ux > 1.0);
        var u3 = Math.sqrt(1.0 - ux);

        // rotate to normal axis
        var invert = 0;
        var u = normal[0];
        var v = normal[1];
        var w = normal[2];
        if (w < -0.9) {
            u = -u;
            v = -v;
            w = -w;
            invert = 1;
        }
        var a = w * u1 + (v * v * u1 - u * v * u2) / (1 + w) + u * u3;
        var b = w * u2 + (-u * v * u1 + u * u * u2) / (1 + w) + v * u3;
        var c = w * u3 - u * u1 - v * u2;
        if (invert == 1) {
            a = -a;
            b = -b;
            c = -c;
        }
        ray[3] = a; // no need to normalize again
        ray[4] = b;
        ray[5] = c;
    }
};

var Glass = function (color, ior) {
    this.color = color;
    this.emission = new Float64Array([0.0, 0.0, 0.0]);
    this.ior = ior;
}
Glass.prototype = {
    bounce: function (ray, normal) {
        var ci = Math.abs(ray[3] * normal[0] + ray[4] * normal[1] + ray[5] * normal[2]);
        var cj = ci;
        if (ci >= 0.0) {
            var internalIndex = this.ior;
            var externalIndex = 1.0;
        } else {
            var internalIndex = 1.0;
            var externalIndex = this.ior;
            cj = -ci;
        }
        var eta = externalIndex / internalIndex;
        var ct = 1.0 - (eta * eta) * (1.0 - (cj * cj));

        if (ct > 0) {
            ct = Math.sqrt(ct);
            var rs = (externalIndex * cj - internalIndex * ct) / (externalIndex * cj + internalIndex * ct);
            var rp = (internalIndex * cj - externalIndex * ct) / (internalIndex * cj + externalIndex * ct);
            var reflectance = (rs * rs + rp * rp) / 2.0;
            if (Math.random() < reflectance) { // reflection
                ray[3] += normal[0] * ci * 2.0;
                ray[4] += normal[1] * ci * 2.0;
                ray[5] += normal[2] * ci * 2.0;
            } else { // refraction    
                var tmp = eta * ci - ct;
                ray[3] = ray[3] * eta + normal[0] * tmp;
                ray[4] = ray[4] * eta + normal[1] * tmp;
                ray[5] = ray[5] * eta + normal[2] * tmp;
            }
        } else { // total internal reflection
            ray[3] += normal[0] * ci * 2.0;
            ray[4] += normal[1] * ci * 2.0;
            ray[5] += normal[2] * ci * 2.0;
        }
    }
};

var Metal = function (color, eta, k) {
    this.color = color;
    this.emission = new Float64Array([0.0, 0.0, 0.0]);
    this.eta = eta;
    this.kk = eta * eta + k * k;
}
Metal.prototype = {
    bounce: function (ray, normal) {
        var ci = Math.abs(ray[3] * normal[0] + ray[4] * normal[1] + ray[5] * normal[2]);

        ray[3] += normal[0] * ci * 2.0;
        ray[4] += normal[1] * ci * 2.0;
        ray[5] += normal[2] * ci * 2.0;

        var eta = this.eta;
        var kk = this.kk;

        var t1 = 1.0 + kk * ci * ci;
        var t2 = 2.0 * eta * ci;
        var r1 = (t1 - t2) / (t1 + t2);

        t1 = kk + ci * ci;
        var rr = ((t1 - t2) / (t1 + t2) + r1) / 2.0;

        ray[7] *= rr;
        ray[8] *= rr;
        ray[9] *= rr;
    }
};
