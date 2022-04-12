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
exports.Ternario = void 0;
var Error_1 = require("../Error/Error");
var Expresion_1 = require("./Expresion");
var Ternario = /** @class */ (function (_super) {
    __extends(Ternario, _super);
    function Ternario(condicion, valor1, valor2, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.condicion = condicion;
        _this.valor1 = valor1;
        _this.valor2 = valor2;
        return _this;
    }
    Ternario.prototype.ejecutar = function (ambito) {
        var condicion = this.condicion.ejecutar(ambito);
        var valor1 = this.valor1.ejecutar(ambito);
        var valor2 = this.valor2.ejecutar(ambito);
        if (typeof (condicion.value) == 'object') {
            throw new Error_1.ErrorE(this.linea, this.columna, 'Semantico', "No es posible operar ya que ".concat(condicion.value, " no es un dato primitivo"));
        }
        if (typeof (valor1.value) == 'object') {
            throw new Error_1.ErrorE(this.linea, this.columna, 'Semantico', "No es posible operar ya que ".concat(valor1.value, " no es un dato primitivo"));
        }
        if (typeof (valor2.value) == 'object') {
            throw new Error_1.ErrorE(this.linea, this.columna, 'Semantico', "No es posible operar ya que ".concat(valor2.value, " no es un dato primitivo"));
        }
        if (valor1.type == valor2.type) {
            if (condicion.type == 2) {
                if (condicion.value) {
                    return { value: valor1.value, type: valor1.type };
                }
                else {
                    return { value: valor2.value, type: valor2.type };
                }
            }
            throw new Error_1.ErrorE(this.linea, this.columna, 'Semantico', ' La condicion no retorna un valor Booleano');
        }
        throw new Error_1.ErrorE(this.linea, this.columna, 'Semantico', ' Los resultados de la operacion ternaria no tienen tipos iguales');
    };
    return Ternario;
}(Expresion_1.Expresion));
exports.Ternario = Ternario;
