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
exports.LENGHT = exports.TOLower = exports.TOUpper = exports.TOString = void 0;
var Error_1 = require("../Error/Error");
var Expresion_1 = require("./Expresion");
var TOString = /** @class */ (function (_super) {
    __extends(TOString, _super);
    function TOString(valor, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.valor = valor;
        return _this;
    }
    TOString.prototype.ejecutar = function (ambito) {
        var value = this.valor.ejecutar(ambito);
        if (value.type == 0 || value.type == 1 || value.type == 3) {
            return { value: String(value.value), type: 4 };
        }
        throw new Error_1.ErrorE(this.linea, this.columna, 'Semantico', 'No es posible la conversion a String de: ' + value.value + " ya que no es Numerico o Booleano");
    };
    return TOString;
}(Expresion_1.Expresion));
exports.TOString = TOString;
var TOUpper = /** @class */ (function (_super) {
    __extends(TOUpper, _super);
    function TOUpper(valor, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.valor = valor;
        return _this;
    }
    TOUpper.prototype.ejecutar = function (ambito) {
        var value = this.valor.ejecutar(ambito);
        if (value.type == 4) {
            return { value: String(value.value).toUpperCase(), type: 4 };
        }
        throw new Error_1.ErrorE(this.linea, this.columna, 'Semantico', 'No es posible ejecutar la funcion ToUpper ya que: ' + value.value + ' no es un String');
    };
    return TOUpper;
}(Expresion_1.Expresion));
exports.TOUpper = TOUpper;
var TOLower = /** @class */ (function (_super) {
    __extends(TOLower, _super);
    function TOLower(valor, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.valor = valor;
        return _this;
    }
    TOLower.prototype.ejecutar = function (ambito) {
        var value = this.valor.ejecutar(ambito);
        if (value.type == 4) {
            return { value: String(value.value).toLowerCase(), type: 4 };
        }
        throw new Error_1.ErrorE(this.linea, this.columna, 'Semantico', 'No es posible ejecutar la funcion ToLower ya que: ' + value.value + ' no es un String');
    };
    return TOLower;
}(Expresion_1.Expresion));
exports.TOLower = TOLower;
var LENGHT = /** @class */ (function (_super) {
    __extends(LENGHT, _super);
    function LENGHT(valor, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.valor = valor;
        return _this;
    }
    LENGHT.prototype.ejecutar = function (ambito) {
        var value = this.valor.ejecutar(ambito);
        if (value.type == 4) {
            return { value: String(value.value).length, type: 0 };
        }
        throw new Error_1.ErrorE(this.linea, this.columna, 'Semantico', 'No es posible ejecutar la funcion ToLower ya que: ' + value.value + ' no es un String');
    };
    return LENGHT;
}(Expresion_1.Expresion));
exports.LENGHT = LENGHT;
