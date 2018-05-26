/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./browser-part/AltLayerBrowserAPI.ts":
/*!********************************************!*\
  !*** ./browser-part/AltLayerBrowserAPI.ts ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AltLayerBrowserAPI; });
class AltLayerBrowserAPI {
    constructor(containerId, game) {
        this.containerId = containerId;
        this.game = game;
        this.loaded = false;
    }
    setUnityLoaded() {
        this.loaded = true;
    }
    clearBackground() {
        const element = document.getElementById(this.containerId);
        element.style.backgroundColor = "rgba(0,0,0,0)";
    }
}


/***/ }),

/***/ "./browser-part/UnityLoaderProxy.ts":
/*!******************************************!*\
  !*** ./browser-part/UnityLoaderProxy.ts ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return proxy; });
/* harmony import */ var _AltLayerBrowserAPI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AltLayerBrowserAPI */ "./browser-part/AltLayerBrowserAPI.ts");
///<reference path="./UnityLoader.d.ts"/>

function proxy() {
    const instanciator = window.UnityLoader.instantiate;
    window.UnityLoader.instantiate = (container, path, config) => {
        window.UnityLoader.SystemInfo.mobile = false;
        const game = instanciator(container, path, config);
        let called = false;
        window.altlayer = new _AltLayerBrowserAPI__WEBPACK_IMPORTED_MODULE_0__["default"](container, game);
        window.addEventListener("message", (ev) => {
            if (ev.data.$type !== "altlayer-update" || !window.altlayer.loaded) {
                return;
            }
            game.SendMessage("AltLayerManager", "OnAltLayerUpdate", JSON.stringify(ev.data.state));
            called = true;
        });
        return game;
    };
}


/***/ }),

/***/ "./browser-part/index.ts":
/*!*******************************!*\
  !*** ./browser-part/index.ts ***!
  \*******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _UnityLoaderProxy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UnityLoaderProxy */ "./browser-part/UnityLoaderProxy.ts");
///<reference path="./UnityLoader.d.ts"/>

Object(_UnityLoaderProxy__WEBPACK_IMPORTED_MODULE_0__["default"])();
document.addEventListener("DOMContentLoaded", () => {
});


/***/ }),

/***/ 0:
/*!*************************************!*\
  !*** multi ./browser-part/index.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/kyasbal/altlayer/unity-sdk/browser-part/index.ts */"./browser-part/index.ts");


/***/ })

/******/ });
//# sourceMappingURL=altlayer-unity.js.map