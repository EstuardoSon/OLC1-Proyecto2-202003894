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
exports.TypeOF = exports.LENGHT2 = exports.LENGHT = exports.Redondear = exports.TOLower = exports.TOUpper = exports.TOString = void 0;
var Error_1 = require("../Error/Error");
var Expresion_1 = require("./Expresion");
var TOString = /** @class */ (function (_super) {
    __extends(TOString, _super);
    function TOString(valor, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.valor = valor;
        return _this;
    }
    TOString.prototype.ejecutar = function (ambito) {
        var value = this.valor.ejecutar(ambito);
        if (typeof (value.value) == 'object') {
            throw new Error_1.ErrorE(this.linea, this.columna, 'Semantico', 'No es posible ejecutar la funcion ToLower ya que: [' + value.value + '] no es un dato primitivo apropiado');
        }
        if (value.type == 0 || value.type == 1 || value.type == 3) {
            return { value: String(value.value), type: 4 };
        }
        throw new Error_1.ErrorE(this.linea, this.columna, 'Semantico', 'No es posible la conversion a String de: ' + value.value + " ya que no es Numerico o Booleano");
    };
    return TOString;
}(Expresion_1.Expresion));
exports.TOString = TOString;
var TOUpper = /** @class */ (function (_super) {
    __extends(TOUpper, _super);
    function TOUpper(valor, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.valor = valor;
        return _this;
    }
    TOUpper.prototype.ejecutar = function (ambito) {
        var value = this.valor.ejecutar(ambito);
        if (typeof (value.value) == 'object') {
            throw new Error_1.ErrorE(this.linea, this.columna, 'Semantico', 'No es posible ejecutar la funcion ToLower ya que: [' + value.value + '] no es un String');
        }
        if (value.type == 4) {
            return { value: String(value.value).toUpperCase(), type: 4 };
        }
        throw new Error_1.ErrorE(this.linea, this.columna, 'Semantico', 'No es posible ejecutar la funcion ToUpper ya que: ' + value.value + ' no es un String');
    };
    return TOUpper;
}(Expresion_1.Expresion));
exports.TOUpper = TOUpper;
var TOLower = /** @class */ (function (_super) {
    __extends(TOLower, _super);
    function TOLower(valor, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.valor = valor;
        return _this;
    }
    TOLower.prototype.ejecutar = function (ambito) {
        var value = this.valor.ejecutar(ambito);
        if (typeof (value.value) == 'object') {
            throw new Error_1.ErrorE(this.linea, this.columna, 'Semantico', 'No es posible ejecutar la funcion ToLower ya que: [' + value.value + '] no es un String');
        }
        if (value.type == 4) {
            return { value: String(value.value).toLowerCase(), type: 4 };
        }
        throw new Error_1.ErrorE(this.linea, this.columna, 'Semantico', 'No es posible ejecutar la funcion ToLower ya que: ' + value.value + ' no es un String');
    };
    return TOLower;
}(Expresion_1.Expresion));
exports.TOLower = TOLower;
var Redondear = /** @class */ (function (_super) {
    __extends(Redondear, _super);
    function Redondear(valor, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.valor = valor;
        return _this;
    }
    Redondear.prototype.ejecutar = function (ambito) {
        var value = this.valor.ejecutar(ambito);
        if (typeof (value.value) == 'object') {
            throw new Error_1.ErrorE(this.linea, this.columna, 'Semantico', 'No es posible ejecutar la funcion Round ya que: [' + value.value + '] no es un Int o Double');
        }
        if (value.type == 0 || value.type == 1) {
            return { value: Math.round(value.value), type: 0 };
        }
        throw new Error_1.ErrorE(this.linea, this.columna, 'Semantico', 'No es posible ejecutar la funcion Round ya que: ' + value.value + ' no es un Int o Double');
    };
    return Redondear;
}(Expresion_1.Expresion));
exports.Redondear = Redondear;
var LENGHT = /** @class */ (function (_super) {
    __extends(LENGHT, _super);
    function LENGHT(valor, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.valor = valor;
        return _this;
    }
    LENGHT.prototype.ejecutar = function (ambito) {
        var value = this.valor.ejecutar(ambito);
        if (typeof (value.value) == 'object') {
            return { value: value.value.length, type: 0 };
        }
        if (value.type == 4) {
            return { value: value.value.length, type: 0 };
        }
        throw new Error_1.ErrorE(this.linea, this.columna, 'Semantico', 'No es posible ejecutar la funcion Length ya que: ' + value.value + ' no es un String o un Vector');
    };
    return LENGHT;
}(Expresion_1.Expresion));
exports.LENGHT = LENGHT;
var LENGHT2 = /** @class */ (function (_super) {
    __extends(LENGHT2, _super);
    function LENGHT2(valor, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.valor = valor;
        return _this;
    }
    LENGHT2.prototype.ejecutar = function (ambito) {
        return { value: this.valor.length, type: 0 };
    };
    return LENGHT2;
}(Expresion_1.Expresion));
exports.LENGHT2 = LENGHT2;
var TypeOF = /** @class */ (function (_super) {
    __extends(TypeOF, _super);
    function TypeOF(valor, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.valor = valor;
        return _this;
    }
    TypeOF.prototype.ejecutar = function (ambito) {
        var value = this.valor.ejecutar(ambito);
        if (typeof (value.value) == 'object' && typeof (value.value[0]) == 'object') {
            return { value: "Matriz", type: 4 };
        }
        else if (typeof (value.value) == 'object') {
            return { value: "Vector", type: 4 };
        }
        else if (value.type == 0) {
            return { value: "Int", type: 4 };
        }
        else if (value.type == 1) {
            return { value: "Double", type: 4 };
        }
        else if (value.type == 2) {
            return { value: "Boolean", type: 4 };
        }
        else if (value.type == 3) {
            return { value: "Char", type: 4 };
        }
        else if (value.type == 4) {
            return { value: "String", type: 4 };
        }
        throw new Error_1.ErrorE(this.linea, this.columna, 'Semantico', 'No fue posible reconocer el tipo de: ' + value.value);
    };
    return TypeOF;
}(Expresion_1.Expresion));
exports.TypeOF = TypeOF;
