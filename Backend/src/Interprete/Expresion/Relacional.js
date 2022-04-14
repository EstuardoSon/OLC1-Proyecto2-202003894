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
exports.tipoRelacional = exports.Relacional = void 0;
var Error_1 = require("../Error/Error");
var Expresion_1 = require("./Expresion");
var Relacional = /** @class */ (function (_super) {
    __extends(Relacional, _super);
    function Relacional(izq, der, tipo, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.izq = izq;
        _this.der = der;
        _this.tipo = tipo;
        return _this;
    }
    Relacional.prototype.ejecutar = function (ambito) {
        var valorIzquierda = this.izq.ejecutar(ambito);
        var valorDerecha = this.der.ejecutar(ambito);
        if (typeof (valorIzquierda.value) == 'object') {
            throw new Error_1.ErrorE(this.linea, this.columna, 'Semantico', "No es posible operar ya que ".concat(valorIzquierda.value, " no es un dato primitivo"));
        }
        if (typeof (valorDerecha.value) == 'object') {
            throw new Error_1.ErrorE(this.linea, this.columna, 'Semantico', "No es posible operar ya que ".concat(valorDerecha.value, " no es un dato primitivo"));
        }
        var dominante = this.tipoDominante(6, valorIzquierda.type, valorDerecha.type);
        if (dominante != null) {
            var valorIz = void 0, valorDer = void 0;
            if (valorIzquierda.type == 3) {
                valorIz = valorIzquierda.value.chartCodeAt(0);
            }
            else if (valorIzquierda.type == 2) {
                if (valorIzquierda.value) {
                    valorIz = 1;
                }
                else {
                    valorIz = 0;
                }
            }
            else if (valorIzquierda.type == 4) {
                valorIz = valorIzquierda.value.toString();
            }
            else {
                valorIz = Number(valorIzquierda.value);
            }
            if (valorDerecha.type == 3) {
                valorDer = valorDerecha.value.chartCodeAt(0);
            }
            else if (valorDerecha.type == 2) {
                if (valorDerecha.value) {
                    valorDer = 1;
                }
                else {
                    valorDer = 0;
                }
            }
            else if (valorDerecha.type == 4) {
                valorDer = valorDerecha.value.toString();
            }
            else {
                valorDer = Number(valorDerecha.value);
            }
            if (this.tipo == 0) {
                var result = Boolean(valorIz == valorDer);
                return { value: result, type: dominante };
            }
            else if (this.tipo == 1) {
                var result = Boolean(valorIz != valorDer);
                return { value: result, type: dominante };
            }
            else if (this.tipo == 2) {
                var result = Boolean(valorIz > valorDer);
                return { value: result, type: dominante };
            }
            else if (this.tipo == 3) {
                var result = Boolean(valorIz >= valorDer);
                return { value: result, type: dominante };
            }
            else if (this.tipo == 4) {
                var result = Boolean(valorIz < valorDer);
                return { value: result, type: dominante };
            }
            else if (this.tipo == 5) {
                var result = Boolean(valorIz <= valorDer);
                return { value: result, type: dominante };
            }
            else if (this.tipo == 6) {
                var result = Boolean(valorIz && valorDer);
                return { value: result, type: dominante };
            }
            else if (this.tipo == 7) {
                var result = Boolean(valorIz || valorDer);
                return { value: result, type: dominante };
            }
        }
        throw new Error_1.ErrorE(this.linea, this.columna, 'Semantico', "No es posible realizar la operacion relacional entre {".concat(valorIzquierda.value, "} {").concat(valorDerecha.value, "}"));
    };
    return Relacional;
}(Expresion_1.Expresion));
exports.Relacional = Relacional;
var tipoRelacional;
(function (tipoRelacional) {
    tipoRelacional[tipoRelacional["IGUAL"] = 0] = "IGUAL";
    tipoRelacional[tipoRelacional["DIFERENTE"] = 1] = "DIFERENTE";
    tipoRelacional[tipoRelacional["MAYOR"] = 2] = "MAYOR";
    tipoRelacional[tipoRelacional["MAYORIGUAL"] = 3] = "MAYORIGUAL";
    tipoRelacional[tipoRelacional["MENOR"] = 4] = "MENOR";
    tipoRelacional[tipoRelacional["MENORIGUAL"] = 5] = "MENORIGUAL";
    tipoRelacional[tipoRelacional["AND"] = 6] = "AND";
    tipoRelacional[tipoRelacional["OR"] = 7] = "OR";
})(tipoRelacional = exports.tipoRelacional || (exports.tipoRelacional = {}));
