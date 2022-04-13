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
exports.Ciclo = void 0;
var Instruccion_1 = require("./Instruccion");
var Ciclo = /** @class */ (function (_super) {
    __extends(Ciclo, _super);
    function Ciclo(entorno, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.entorno = entorno;
        return _this;
    }
    Ciclo.prototype.ejecutar = function (ambito) {
        var respuesta = this.entorno.ejecutar(ambito);
        if (respuesta != null) {
            if (respuesta.type == "Return") {
                return respuesta;
            }
        }
    };
    return Ciclo;
}(Instruccion_1.Instruccion));
exports.Ciclo = Ciclo;
