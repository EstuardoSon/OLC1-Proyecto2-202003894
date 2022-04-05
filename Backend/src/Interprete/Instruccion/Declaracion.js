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
exports.Declaracion = void 0;
var Instruccion_1 = require("../Instruccion/Instruccion");
var Declaracion = /** @class */ (function (_super) {
    __extends(Declaracion, _super);
    function Declaracion(linea, columna, nombre, valor) {
        var _this = _super.call(this, linea, columna) || this;
        _this.nombre = nombre;
        _this.valor = valor;
        return _this;
    }
    Declaracion.prototype.ejecutar = function (ambito) {
        var valorAnterior = this.valor.ejecutar();
        ambito.setVal(this.nombre, valorAnterior.value, valorAnterior.type, this.linea, this.columna);
    };
    Declaracion.prototype.setValor = function (valor) {
        this.valor = valor;
    };
    Declaracion.prototype.realizarComprobacion = function (tipo) {
        if (this.valor != null) {
            if (this.valor.ejecutar().type == tipo) {
                return true;
            }
            return false;
        }
        else {
            return true;
        }
    };
    return Declaracion;
}(Instruccion_1.Instruccion));
exports.Declaracion = Declaracion;
