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
exports.VectorDec1 = void 0;
var Error_1 = require("../Error/Error");
var Expresion_1 = require("./Expresion");
var VectorDec1 = /** @class */ (function (_super) {
    __extends(VectorDec1, _super);
    function VectorDec1(nombre, tipo, contenido, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.nombre = nombre;
        _this.tipo = tipo;
        _this.contenido = contenido;
        return _this;
    }
    VectorDec1.prototype.ejecutar = function (ambito) {
        var datos = [];
        for (var _i = 0, _a = this.contenido; _i < _a.length; _i++) {
            var valor = _a[_i];
            var dato = valor.ejecutar(ambito);
            if (dato.type == this.tipo) {
                datos.push(dato.value);
                continue;
            }
            throw new Error_1.ErrorE(this.linea, this.columna, 'Semantico', 'El dato: ' + dato.value + ' del arreglo: ' + this.nombre + ' no es del tipo correspondiente');
        }
        return { value: datos, type: this.tipo };
    };
    return VectorDec1;
}(Expresion_1.Expresion));
exports.VectorDec1 = VectorDec1;
