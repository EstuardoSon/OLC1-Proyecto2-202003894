"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.Literal = void 0;
var Expresion_1 = require("./Expresion");
var Literal = /** @class */ (function (_super) {
    __extends(Literal, _super);
    function Literal(valor, tipo, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.valor = valor;
        _this.tipo = tipo;
        return _this;
    }
    Literal.prototype.ejecutar = function () {
        if (this.tipo == 0) {
            return { value: Number(this.valor), type: 0 };
        }
        else if (this.tipo == 1) {
            return { value: Number(this.valor), type: 1 };
        }
        else if (this.tipo == 2) {
            return { value: this.valor, type: 2 };
        }
        else if (this.tipo == 3) {
            return { value: String(this.valor), type: 3 };
        }
        else if (this.tipo == 4) {
            return { value: String(this.valor), type: 4 };
        }
        return { value: null, type: 4 };
    };
    return Literal;
}(Expresion_1.Expresion));
exports.Literal = Literal;
