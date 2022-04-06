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
exports.Llamado = void 0;
var Error_1 = require("../Error/Error");
var Expresion_1 = require("./Expresion");
var Llamado = /** @class */ (function (_super) {
    __extends(Llamado, _super);
    function Llamado(nombre, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.nombre = nombre;
        return _this;
    }
    Llamado.prototype.ejecutar = function (ambito) {
        var value = ambito.getVal(this.nombre);
        if (value != null) {
            return { value: value.valor, type: value.tipo };
        }
        else {
            throw new Error_1.ErrorE(this.linea, this.columna, 'Semantico', 'No existe una declaracion de la variable ' + this.nombre + '');
        }
    };
    return Llamado;
}(Expresion_1.Expresion));
exports.Llamado = Llamado;
