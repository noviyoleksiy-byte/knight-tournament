// scale fixed 1920x1080 stage for tv
// we use plain es5 for android webview
(function () {
'use strict';

// dimensions and overscan safe factor
// we keep 3 percent margin for tv bezels
var DESIGN_W = 1920;
var DESIGN_H = 1080;
var SAFE = 0.97;

// stage container element
// we check existence before running
var stage =
document.getElementById('tvStage');
if (!stage) {
return;
}

// read viewport width safely
// we fallback through dom elements
function getVw() {
return (
window.innerWidth ||
document.documentElement.clientWidth ||
document.body.clientWidth ||
1920
);
}

// read viewport height safely
// we fallback through dom elements
function getVh() {
return (
window.innerHeight ||
document.documentElement.clientHeight ||
document.body.clientHeight ||
1080
);
}

// scale and center stage in window
// we set transform scale and left top
function rescale() {
var vw = getVw();
var vh = getVh();
var scale =
Math.min(
vw / DESIGN_W,
vh / DESIGN_H
) * SAFE;
var left =
(vw - DESIGN_W * scale) / 2;
var top =
(vh - DESIGN_H * scale) / 2;
stage.style.position = 'absolute';
stage.style.left = left + 'px';
stage.style.top = top + 'px';
stage.style.webkitTransform =
'scale(' + scale + ')';
stage.style.transform =
'scale(' + scale + ')';
}

// attach resize and orientation listeners
// we recalculate on every screen change
window.addEventListener(
'resize',
rescale
);
window.addEventListener(
'orientationchange',
rescale
);

// run initial scale after dom load
// we invoke function immediately
rescale();
})();
