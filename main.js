"use strict";

function main() {
    var renderer = new Renderer(scene);
    var animFrame = window.requestAnimationFrame;
    var start = new Date();

    function main_loop() {

        renderer.iterate();
        var n = renderer.iterations;

        for (var j = 0, k = 0, l = 0; k < width * height * 4;) {
            image.data[k++] = Math.round(Math.pow(buffer[j++] / count[l], 1.00 / 2.20) * 255.0);
            image.data[k++] = Math.round(Math.pow(buffer[j++] / count[l], 1.00 / 2.20) * 255.0);
            image.data[k++] = Math.round(Math.pow(buffer[j++] / count[l], 1.00 / 2.20) * 255.0);
            image.data[k++] = 255;
            l++;
        }
        ctx.putImageData(image, 0, 0);

        animFrame(main_loop);

        var td = new Date() - start;
        document.title = n + ' - ' + Math.round(td / n) / 1000 + ' s';
        document.getElementById("loading").style.display = 'none';
    };

    animFrame(main_loop);
}
