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
exports.Println = exports.Print = void 0;
var Instruccion_1 = require("../Instruccion/Instruccion");
var Impresion = require("../Grammar/grammar");
var Print = /** @class */ (function (_super) {
    __extends(Print, _super);
    function Print(linea, columna, valor) {
        var _this = _super.call(this, linea, columna) || this;
        _this.valor = valor;
        return _this;
    }
    Print.prototype.ejecutar = function (ambito) {
        var dato = this.valor.ejecutar(ambito);
        if (dato.value != null) {
            Impresion.Impresion += dato.value.toString();
        }
        else {
            Impresion.Impresion += "Null";
        }
    };
    return Print;
}(Instruccion_1.Instruccion));
exports.Print = Print;
var Println = /** @class */ (function (_super) {
    __extends(Println, _super);
    function Println(linea, columna, valor) {
        var _this = _super.call(this, linea, columna) || this;
        _this.valor = valor;
        return _this;
    }
    Println.prototype.ejecutar = function (ambito) {
        var dato = this.valor.ejecutar(ambito);
        if (dato.value != null) {
            Impresion.Impresion += dato.value.toString() + "\n";
        }
        else {
            Impresion.Impresion += "Null" + "\n";
        }
    };
    return Println;
}(Instruccion_1.Instruccion));
exports.Println = Println;
