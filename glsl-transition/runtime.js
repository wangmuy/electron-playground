module.exports = exec

function exec() {
var baboon = require("baboon-image");
var lena = require("lena");
var createTexture = require("gl-texture2d");
var createTransition = require("glsl-transition");
var trans1 = require("./cube.js");
var trans2 = require("./transitions"); // length=71
var transitions = trans1.concat(trans2); // length=72
var instance = transitions[0];

var transition, from, to;
var shell = require("gl-now")();
shell.on("gl-init", function() {
  var gl = shell.gl;
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  transition = createTransition(gl, instance.glsl);
  to = createTexture(gl, baboon.transpose(1, 0));
  from = createTexture(gl, lena.transpose(1, 0));
});

shell.on("gl-render", function () {
  transition.render((Date.now() / 2000) % 1, from, to, instance.uniforms);
});
}