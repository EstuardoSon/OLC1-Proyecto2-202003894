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
exports.Casteo = void 0;
var Error_1 = require("../Error/Error");
var Expresion_1 = require("./Expresion");
var Casteo = /** @class */ (function (_super) {
    __extends(Casteo, _super);
    function Casteo(valor, tipo, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.valor = valor;
        _this.tipo = tipo;
        return _this;
    }
    Casteo.prototype.ejecutar = function (ambito) {
        var value = this.valor.ejecutar(ambito);
        if (this.tipo == 0) {
            if (value.type == 0) {
                return { value: value.value, type: value.type };
            }
            else if (value.type == 1) {
                return { value: Math.round(value.value), type: 0 };
            }
            else if (value.type == 3) {
                return { value: String(value.value).charCodeAt(0), type: 0 };
            }
            throw new Error_1.ErrorE(this.linea, this.columna, 'Semantico', 'No es posible hacer el casteo de: ' + value.value + " a Int");
        }
        else if (this.tipo == 1) {
            if (value.type == 0) {
                return { value: value.value, type: 1 };
            }
            else if (value.type == 1) {
                return { value: value.value, type: value.type };
            }
            else if (value.type == 3) {
                return { value: String(value.value).charCodeAt(0), type: 1 };
            }
            throw new Error_1.ErrorE(this.linea, this.columna, 'Semantico', 'No es posible hacer el casteo de: ' + value.value + " a Double");
        }
        else if (this.tipo == 3) {
            if (value.type == 0) {
                return { value: String.fromCharCode(value.value), type: 3 };
            }
            throw new Error_1.ErrorE(this.linea, this.columna, 'Semantico', 'No es posible hacer el casteo de: ' + value.value + " a Char");
        }
        else if (this.tipo == 4) {
            if (value.type == 0) {
                return { value: String(value.value), type: 4 };
            }
            else if (value.type == 1) {
                return { value: String(value.value), type: 4 };
            }
            throw new Error_1.ErrorE(this.linea, this.columna, 'Semantico', 'No es posible hacer el casteo de: ' + value.value + " a String");
        }
        throw new Error_1.ErrorE(this.linea, this.columna, 'Semantico', 'No es posible hacer el casteo de: ' + value.value);
    };
    return Casteo;
}(Expresion_1.Expresion));
exports.Casteo = Casteo;
