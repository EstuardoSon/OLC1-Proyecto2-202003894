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
exports.Negacion = void 0;
var Error_1 = require("../Error/Error");
var Expresion_1 = require("./Expresion");
var Negacion = /** @class */ (function (_super) {
    __extends(Negacion, _super);
    function Negacion(valor, tipo, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.valor = valor;
        _this.tipo = tipo;
        return _this;
    }
    Negacion.prototype.ejecutar = function (ambito) {
        var value = this.valor.ejecutar(ambito);
        if (value.type == 2) {
            if (value.value == true) {
                return { value: false, type: 2 };
            }
            return { value: true, type: 2 };
        }
        throw new Error_1.ErrorE(this.linea, this.columna, 'Semantico', 'No se fue posible realizar la negacion de ' + value.value + ' ya que no es booleano');
    };
    return Negacion;
}(Expresion_1.Expresion));
exports.Negacion = Negacion;
