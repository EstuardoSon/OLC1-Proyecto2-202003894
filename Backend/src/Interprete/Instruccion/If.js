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
exports.If = void 0;
var Error_1 = require("../Error/Error");
var Instruccion_1 = require("./Instruccion");
var If = /** @class */ (function (_super) {
    __extends(If, _super);
    function If(condicion, entorno, Else, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.condicion = condicion;
        _this.entorno = entorno;
        _this.Else = Else;
        return _this;
    }
    If.prototype.ejecutar = function (ambito) {
        var ejeCondicion = this.condicion.ejecutar(ambito);
        if (ejeCondicion.type != 2 || typeof (ejeCondicion.value) == 'object') {
            throw new Error_1.ErrorE(this.linea, this.columna, 'Semantico', "No es posible operar ya que: {".concat(ejeCondicion.value, "} no es un dato primitivo booleano"));
        }
        if (ejeCondicion.value) {
            var respuesta = this.entorno.ejecutar(ambito);
            if (respuesta != null) {
                if (respuesta.type == 'Break' || respuesta.type == 'Continue' || respuesta.type == 'Return') {
                    return respuesta;
                }
            }
        }
        else if (this.Else != null) {
            var respuesta = this.Else.ejecutar(ambito);
            if (respuesta != null) {
                if (respuesta.type == 'Break' || respuesta.type == 'Continue' || respuesta.type == 'Return') {
                    return respuesta;
                }
            }
        }
    };
    return If;
}(Instruccion_1.Instruccion));
exports.If = If;
