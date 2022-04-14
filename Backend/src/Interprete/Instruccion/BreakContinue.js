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
exports.RETURN = exports.BREAK = void 0;
var Instruccion_1 = require("./Instruccion");
var BREAK = /** @class */ (function (_super) {
    __extends(BREAK, _super);
    function BREAK(tipo, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.tipo = tipo;
        return _this;
    }
    BREAK.prototype.ejecutar = function (ambito) {
        return { type: this.tipo, line: this.linea, column: this.columna };
    };
    return BREAK;
}(Instruccion_1.Instruccion));
exports.BREAK = BREAK;
var RETURN = /** @class */ (function (_super) {
    __extends(RETURN, _super);
    function RETURN(valor, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.valor = valor;
        return _this;
    }
    RETURN.prototype.ejecutar = function (ambito) {
        if (this.valor != null) {
            var verValor = this.valor.ejecutar(ambito);
            return { type: "Return", value: verValor, line: this.linea, column: this.columna };
        }
        return { type: "Return", value: null, line: this.linea, column: this.columna };
    };
    return RETURN;
}(Instruccion_1.Instruccion));
exports.RETURN = RETURN;
