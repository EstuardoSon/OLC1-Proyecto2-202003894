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
exports.LlamadoFuncion = exports.Run = exports.Funcion = void 0;
var Error_1 = require("../Error/Error");
var Ambito_1 = require("../Extra/Ambito");
var Instruccion_1 = require("./Instruccion");
var Funcion = /** @class */ (function (_super) {
    __extends(Funcion, _super);
    function Funcion(nombre, entorno, parametros, retorno, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.nombre = nombre;
        _this.entorno = entorno;
        _this.parametros = parametros;
        _this.retorno = retorno;
        return _this;
    }
    Funcion.prototype.ejecutar = function (ambito) {
        var duplicado = [];
        var _loop_1 = function (param) {
            var comprobacion = duplicado.find(function (element) { return element == param.nombre; });
            if (comprobacion != null) {
                throw new Error_1.ErrorE(this_1.linea, this_1.columna, "Semantico", "El parametro: " + param.nombre + " esta duplicado");
            }
            else {
                duplicado.push(param.nombre);
            }
        };
        var this_1 = this;
        for (var _i = 0, _a = this.parametros; _i < _a.length; _i++) {
            var param = _a[_i];
            _loop_1(param);
        }
        ambito.setFunc(this.nombre, this, this.linea, this.columna);
    };
    return Funcion;
}(Instruccion_1.Instruccion));
exports.Funcion = Funcion;
var Run = /** @class */ (function (_super) {
    __extends(Run, _super);
    function Run(llamado, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.llamado = llamado;
        return _this;
    }
    Run.prototype.ejecutar = function (ambito) {
        this.llamado.ejecutar(ambito);
    };
    return Run;
}(Instruccion_1.Instruccion));
exports.Run = Run;
var LlamadoFuncion = /** @class */ (function (_super) {
    __extends(LlamadoFuncion, _super);
    function LlamadoFuncion(nombre, parametros, fila, columna) {
        var _this = _super.call(this, fila, columna) || this;
        _this.nombre = nombre;
        _this.parametros = parametros;
        return _this;
    }
    LlamadoFuncion.prototype.ejecutar = function (ambito) {
        var busqueda = ambito.getFunc(this.nombre);
        if (busqueda != null) {
            if (this.parametros.length == busqueda.parametros.length) {
                var global_1 = ambito.getGlobal();
                var nuevo = new Ambito_1.Ambito(global_1, "".concat(global_1.nombre, " - funcion(").concat(this.nombre, ")"), true);
                for (var i in this.parametros) {
                    var param = this.parametros[i].ejecutar(ambito);
                    if (param.type == busqueda.parametros[i].tipo) {
                        if (typeof (param.value) == 'object') {
                            if (typeof (param.value[0]) == 'object') {
                                nuevo.setValM(busqueda.parametros[i].nombre, param.value, param.type, this.linea, this.columna);
                            }
                            else {
                                nuevo.setValV(busqueda.parametros[i].nombre, param.value, param.type, this.linea, this.columna);
                            }
                        }
                        else {
                            nuevo.setVal(busqueda.parametros[i].nombre, param.value, param.type, this.linea, this.columna);
                        }
                    }
                    else {
                        throw new Error_1.ErrorE(this.linea, this.columna, "Semantico", "El valor: ".concat(param.value, " no es del tipo adecuado del parametro: ").concat(busqueda.parametros[i].nombre));
                    }
                }
                var respuesta = busqueda.entorno.ejecutar(nuevo);
                if (respuesta.type == 'Return') {
                    if (respuesta.value != null) {
                        if (respuesta.value.type == busqueda.retorno) {
                            return respuesta.value;
                        }
                        else {
                            throw new Error_1.ErrorE(this.linea, this.columna, "Semantico", "El retorno de la funcion " + busqueda.nombre + " no coincide con su tipo");
                        }
                    }
                    else {
                        if (respuesta.value == busqueda.retorno) {
                            return { value: null, type: busqueda.retorno };
                        }
                        else {
                            throw new Error_1.ErrorE(this.linea, this.columna, "Semantico", "El retorno de la funcion " + busqueda.nombre + " no coincide con su tipo");
                        }
                    }
                }
            }
            else {
                throw new Error_1.ErrorE(this.linea, this.columna, "Semantico", "La cantidad de parametros enviados a la funcion " + this.nombre + " no es la justa");
            }
        }
        else {
            throw new Error_1.ErrorE(this.linea, this.columna, "Semantico", "No existe una funcion con el nombre: " + this.nombre);
        }
    };
    return LlamadoFuncion;
}(Instruccion_1.Instruccion));
exports.LlamadoFuncion = LlamadoFuncion;
