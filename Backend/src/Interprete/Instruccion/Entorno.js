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
exports.EntornoW = exports.EntornoCase = exports.EntornoD = exports.EntornoC = exports.EntornoI = exports.Entorno = void 0;
var Error_1 = require("../Error/Error");
var Relacional_1 = require("../Expresion/Relacional");
var Ambito_1 = require("../Extra/Ambito");
var Instruccion_1 = require("./Instruccion");
var parser = require('../Grammar/grammar');
var Entorno = /** @class */ (function (_super) {
    __extends(Entorno, _super);
    function Entorno(instruccines, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.instruccines = instruccines;
        return _this;
    }
    Entorno.prototype.ejecutar = function (ambito) {
        var nuevoAmbito = new Ambito_1.Ambito(ambito, ambito.nombre + " - Pfor");
        for (var _i = 0, _a = this.instruccines; _i < _a.length; _i++) {
            var i = _a[_i];
            try {
                var respuesta = i.ejecutar(nuevoAmbito);
                if (respuesta != null) {
                    if (respuesta.type == 'Break' || respuesta.type == 'Continue' || respuesta.type == 'Return') {
                        return respuesta;
                    }
                }
            }
            catch (error) {
                parser.Errores.push(error);
            }
        }
    };
    return Entorno;
}(Instruccion_1.Instruccion));
exports.Entorno = Entorno;
var EntornoI = /** @class */ (function (_super) {
    __extends(EntornoI, _super);
    function EntornoI(instruccines, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.instruccines = instruccines;
        return _this;
    }
    EntornoI.prototype.ejecutar = function (ambito) {
        var nuevoAmbito = new Ambito_1.Ambito(ambito, ambito.nombre + " - If");
        for (var _i = 0, _a = this.instruccines; _i < _a.length; _i++) {
            var i = _a[_i];
            try {
                var respuesta = i.ejecutar(nuevoAmbito);
                if (respuesta != null) {
                    if (respuesta.type == 'Break' || respuesta.type == 'Continue' || respuesta.type == 'Return') {
                        return respuesta;
                    }
                }
            }
            catch (error) {
                parser.Errores.push(error);
            }
        }
    };
    return EntornoI;
}(Instruccion_1.Instruccion));
exports.EntornoI = EntornoI;
var EntornoC = /** @class */ (function (_super) {
    __extends(EntornoC, _super);
    function EntornoC(condicion, instruccines, final, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.condicion = condicion;
        _this.instruccines = instruccines;
        _this.final = final;
        return _this;
    }
    EntornoC.prototype.ejecutar = function (ambito) {
        var ejeCondicion = this.condicion.ejecutar(ambito);
        if (ejeCondicion.type != 2 || typeof (ejeCondicion.value) == 'object') {
            throw new Error_1.ErrorE(this.linea, this.columna, 'Semantico', "No es posible operar ya que: {".concat(ejeCondicion.value, "} no es un dato primitivo booleano"));
        }
        var nuevoAmbito = new Ambito_1.Ambito(ambito, ambito.nombre + " - Ciclo");
        while (ejeCondicion.value) {
            for (var _i = 0, _a = this.instruccines; _i < _a.length; _i++) {
                var i = _a[_i];
                try {
                    var respuesta = i.ejecutar(nuevoAmbito);
                    if (respuesta != null) {
                        if (respuesta.type == 'Break' || respuesta.type == 'Return') {
                            return respuesta;
                        }
                        else if (respuesta.type == 'Continue') {
                            break;
                        }
                    }
                }
                catch (error) {
                    parser.Errores.push(error);
                }
            }
            if (this.final != null) {
                this.final.ejecutar(ambito);
            }
            ejeCondicion = this.condicion.ejecutar(ambito);
        }
    };
    return EntornoC;
}(Instruccion_1.Instruccion));
exports.EntornoC = EntornoC;
var EntornoD = /** @class */ (function (_super) {
    __extends(EntornoD, _super);
    function EntornoD(condicion, instruccines, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.condicion = condicion;
        _this.instruccines = instruccines;
        return _this;
    }
    EntornoD.prototype.ejecutar = function (ambito) {
        var ejeCondicion = this.condicion.ejecutar(ambito);
        if (ejeCondicion.type != 2 || typeof (ejeCondicion.value) == 'object') {
            throw new Error_1.ErrorE(this.linea, this.columna, 'Semantico', "No es posible operar ya que: {".concat(ejeCondicion.value, "} no es un dato primitivo booleano"));
        }
        var nuevoAmbito = new Ambito_1.Ambito(ambito, ambito.nombre + " - Ciclo");
        do {
            for (var _i = 0, _a = this.instruccines; _i < _a.length; _i++) {
                var i = _a[_i];
                try {
                    var respuesta = i.ejecutar(nuevoAmbito);
                    if (respuesta != null) {
                        if (respuesta.type == 'Break' || respuesta.type == 'Return') {
                            return respuesta;
                        }
                        else if (respuesta.type == 'Continue') {
                            break;
                        }
                    }
                }
                catch (error) {
                    parser.Errores.push(error);
                }
            }
            ejeCondicion = this.condicion.ejecutar(ambito);
        } while (ejeCondicion.value);
    };
    return EntornoD;
}(Instruccion_1.Instruccion));
exports.EntornoD = EntornoD;
var EntornoCase = /** @class */ (function (_super) {
    __extends(EntornoCase, _super);
    function EntornoCase(valor, instruccines, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.valor = valor;
        _this.instruccines = instruccines;
        return _this;
    }
    EntornoCase.prototype.ejecutar = function (ambito) {
        var nuevoAmbito = new Ambito_1.Ambito(ambito, ambito.nombre + " - Case");
        for (var _i = 0, _a = this.instruccines; _i < _a.length; _i++) {
            var i = _a[_i];
            try {
                var respuesta = i.ejecutar(nuevoAmbito);
                if (respuesta != null) {
                    if (respuesta.type == 'Break' || respuesta.type == 'Return') {
                        return respuesta;
                    }
                    else if (respuesta.type == 'Continue') {
                        return respuesta;
                    }
                }
            }
            catch (error) {
                parser.Errores.push(error);
            }
        }
    };
    return EntornoCase;
}(Instruccion_1.Instruccion));
exports.EntornoCase = EntornoCase;
var EntornoW = /** @class */ (function (_super) {
    __extends(EntornoW, _super);
    function EntornoW(valor, instruccines, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.valor = valor;
        _this.instruccines = instruccines;
        return _this;
    }
    EntornoW.prototype.ejecutar = function (ambito) {
        var nuevoAmbito = new Ambito_1.Ambito(ambito, ambito.nombre + " - Switch");
        for (var _i = 0, _a = this.instruccines; _i < _a.length; _i++) {
            var i = _a[_i];
            try {
                var comparacion = void 0;
                if (i.valor != null) {
                    comparacion = new Relacional_1.Relacional(i.valor, this.valor, 0, this.linea, this.columna);
                }
                else {
                    comparacion = new Relacional_1.Relacional(this.valor, this.valor, 0, this.linea, this.columna);
                }
                if (comparacion) {
                    var respuesta = i.ejecutar(nuevoAmbito);
                    if (respuesta != null) {
                        if (respuesta.type == 'Break') {
                            break;
                        }
                        else if (respuesta.type == 'Continue' || respuesta.type == 'Return') {
                            return respuesta;
                        }
                    }
                }
            }
            catch (error) {
                parser.Errores.push(error);
            }
        }
    };
    return EntornoW;
}(Instruccion_1.Instruccion));
exports.EntornoW = EntornoW;
