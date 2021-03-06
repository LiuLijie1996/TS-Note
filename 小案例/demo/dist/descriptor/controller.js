"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = void 0;
require("reflect-metadata");
var router_1 = __importDefault(require("../router"));
function controller(root) {
    return function (target) {
        for (var key in target.prototype) {
            // 获取实例中的方法
            var handler = target.prototype[key];
            // 获取路由
            var path = Reflect.getMetadata("path", target.prototype, key);
            // 获取请求方式
            var method = Reflect.getMetadata("method", target.prototype, key);
            // 获取中间件
            var middlewares = Reflect.getMetadata("middlewares", target.prototype, key);
            // 判断路由是否存在，请求方式是否存在
            if (path && method) {
                // 拼接路由
                var fullPath = root === "/" ? path : "" + root + path;
                // 判断中间件是否存在
                if (middlewares && middlewares.length) {
                    router_1.default[method].apply(router_1.default, __spreadArrays([fullPath], middlewares, [handler]));
                }
                else {
                    router_1.default[method](fullPath, handler);
                }
            }
        }
    };
}
exports.controller = controller;
