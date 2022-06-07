"use strict";

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Color = /*#__PURE__*/_createClass(function Color() {
  _classCallCheck(this, Color);

  _defineProperty(this, "generateColor", function () {
    return console.log("color: rgb(".concat(Math.floor(Math.random() * 255), ", ").concat(Math.floor(Math.random() * 255), ", ").concat(Math.floor(Math.random() * 255), ")"));
  });
});

var colorcito = new Color();
colorcito.generateColor();
