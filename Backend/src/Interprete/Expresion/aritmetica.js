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
exports.Operador = exports.Aritmetica = void 0;
var Error_1 = require("../Error/Error");
var Expresion_1 = require("./Expresion");
var Aritmetica = /** @class */ (function (_super) {
    __extends(Aritmetica, _super);
    function Aritmetica(izq, der, operador, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.izq = izq;
        _this.der = der;
        _this.operador = operador;
        return _this;
    }
    Aritmetica.prototype.ejecutar = function (ambito) {
        var valorIzquierda = this.izq.ejecutar(ambito);
        var valorDerecha = this.der.ejecutar(ambito);
        if (typeof (valorIzquierda.value) == 'object') {
            throw new Error_1.ErrorE(this.linea, this.columna, 'Semantico', "No es posible operar ya que [".concat(valorIzquierda.value, "] no es un dato primitivo"));
        }
        if (typeof (valorDerecha.value) == 'object') {
            throw new Error_1.ErrorE(this.linea, this.columna, 'Semantico', "No es posible operar ya que [".concat(valorDerecha.value, "] no es un dato primitivo"));
        }
        var dominante = this.tipoDominante(this.operador, valorIzquierda.type, valorDerecha.type);
        if (dominante == null) {
            switch (this.operador) {
                case 0:
                    throw new Error_1.ErrorE(this.linea, this.columna, 'Semantico', "No es posible operar: " + valorIzquierda.value + " + " + valorDerecha.value);
                case 1:
                    throw new Error_1.ErrorE(this.linea, this.columna, 'Semantico', "No es posible operar: " + valorIzquierda.value + " - " + valorDerecha.value);
                case 2:
                    throw new Error_1.ErrorE(this.linea, this.columna, 'Semantico', "No es posible operar: " + valorIzquierda.value + " * " + valorDerecha.value);
                case 3:
                    throw new Error_1.ErrorE(this.linea, this.columna, 'Semantico', "No es posible operar: " + valorIzquierda.value + " / " + valorDerecha.value);
                case 4:
                    throw new Error_1.ErrorE(this.linea, this.columna, 'Semantico', "No es posible operar: " + valorIzquierda.value + " ^ " + valorDerecha.value);
                case 5:
                    throw new Error_1.ErrorE(this.linea, this.columna, 'Semantico', "No es posible operar: " + valorIzquierda.value + " % " + valorDerecha.value);
            }
        }
        else {
            if (this.operador == 0) {
                if (dominante == 0) {
                    var valorIz = void 0, valorDer = void 0;
                    if (valorIzquierda.type == 3) {
                        valorIz = Number(valorIzquierda.value.charCodeAt(0));
                    }
                    else if (valorIzquierda.type == 2) {
                        if (valorIzquierda.value) {
                            valorIz = 1;
                        }
                        else {
                            valorIz = 0;
                        }
                    }
                    else {
                        valorIz = Number(valorIzquierda.value);
                    }
                    if (valorDerecha.type == 3) {
                        valorDer = Number(valorDerecha.value.charCodeAt(0));
                    }
                    else if (valorDerecha.type == 2) {
                        if (valorDerecha.value) {
                            valorDer = 1;
                        }
                        else {
                            valorDer = 0;
                        }
                    }
                    else {
                        valorDer = Number(valorDerecha.value);
                    }
                    return { value: valorIz + valorDer, type: dominante };
                }
                else if (dominante == 1) {
                    var valorIz = void 0, valorDer = void 0;
                    if (valorIzquierda.type == 3) {
                        valorIz = Number(valorIzquierda.value.charCodeAt(0));
                    }
                    else if (valorIzquierda.type == 2) {
                        if (valorIzquierda.value) {
                            valorIz = 1;
                        }
                        else {
                            valorIz = 0;
                        }
                    }
                    else {
                        valorIz = Number(valorIzquierda.value);
                    }
                    if (valorDerecha.type == 3) {
                        valorDer = Number(valorDerecha.value.charCodeAt(0));
                    }
                    else if (valorDerecha.type == 2) {
                        if (valorDerecha.value) {
                            valorDer = 1;
                        }
                        else {
                            valorDer = 0;
                        }
                    }
                    else {
                        valorDer = Number(valorDerecha.value);
                    }
                    return { value: valorIz + valorDer, type: dominante };
                }
                else if (dominante == 4) {
                    return { value: valorIzquierda.value.toString() + valorDerecha.value.toString(), type: dominante };
                }
            }
            else if (this.operador == 1) {
                if (dominante == 0) {
                    var valorIz = void 0, valorDer = void 0;
                    if (valorIzquierda.type == 3) {
                        valorIz = Number(valorIzquierda.value.charCodeAt(0));
                    }
                    else if (valorIzquierda.type == 2) {
                        if (valorIzquierda.value) {
                            valorIz = 1;
                        }
                        else {
                            valorIz = 0;
                        }
                    }
                    else {
                        valorIz = Number(valorIzquierda.value);
                    }
                    if (valorDerecha.type == 3) {
                        valorDer = Number(valorDerecha.value.charCodeAt(0));
                    }
                    else if (valorDerecha.type == 2) {
                        if (valorDerecha.value) {
                            valorDer = 1;
                        }
                        else {
                            valorDer = 0;
                        }
                    }
                    else {
                        valorDer = Number(valorDerecha.value);
                    }
                    return { value: Math.round(valorIz - valorDer), type: dominante };
                }
                else if (dominante == 1) {
                    var valorIz = void 0, valorDer = void 0;
                    if (valorIzquierda.type == 3) {
                        valorIz = Number(valorIzquierda.value.charCodeAt(0));
                    }
                    else if (valorIzquierda.type == 2) {
                        if (valorIzquierda.value) {
                            valorIz = 1;
                        }
                        else {
                            valorIz = 0;
                        }
                    }
                    else {
                        valorIz = Number(valorIzquierda.value);
                    }
                    if (valorDerecha.type == 3) {
                        valorDer = Number(valorDerecha.value.charCodeAt(0));
                    }
                    else if (valorDerecha.type == 2) {
                        if (valorDerecha.value) {
                            valorDer = 1;
                        }
                        else {
                            valorDer = 0;
                        }
                    }
                    else {
                        valorDer = Number(valorDerecha.value);
                    }
                    return { value: valorIz - valorDer, type: dominante };
                }
            }
            else if (this.operador == 2) {
                if (dominante == 0) {
                    var valorIz = void 0, valorDer = void 0;
                    if (valorIzquierda.type == 3) {
                        valorIz = Number(valorIzquierda.value.charCodeAt(0));
                    }
                    else if (valorIzquierda.type == 2) {
                        if (valorIzquierda.value) {
                            valorIz = 1;
                        }
                        else {
                            valorIz = 0;
                        }
                    }
                    else {
                        valorIz = Number(valorIzquierda.value);
                    }
                    if (valorDerecha.type == 3) {
                        valorDer = Number(valorDerecha.value.charCodeAt(0));
                    }
                    else if (valorDerecha.type == 2) {
                        if (valorDerecha.value) {
                            valorDer = 1;
                        }
                        else {
                            valorDer = 0;
                        }
                    }
                    else {
                        valorDer = Number(valorDerecha.value);
                    }
                    return { value: Math.round(valorIz * valorDer), type: dominante };
                }
                else if (dominante == 1) {
                    var valorIz = void 0, valorDer = void 0;
                    if (valorIzquierda.type == 3) {
                        valorIz = Number(valorIzquierda.value.charCodeAt(0));
                    }
                    else if (valorIzquierda.type == 2) {
                        if (valorIzquierda.value) {
                            valorIz = 1;
                        }
                        else {
                            valorIz = 0;
                        }
                    }
                    else {
                        valorIz = Number(valorIzquierda.value);
                    }
                    if (valorDerecha.type == 3) {
                        valorDer = Number(valorDerecha.value.charCodeAt(0));
                    }
                    else if (valorDerecha.type == 2) {
                        if (valorDerecha.value) {
                            valorDer = 1;
                        }
                        else {
                            valorDer = 0;
                        }
                    }
                    else {
                        valorDer = Number(valorDerecha.value);
                    }
                    return { value: valorIz * valorDer, type: dominante };
                }
            }
            else if (this.operador == 3) {
                var valorIz = void 0, valorDer = void 0;
                if (valorIzquierda.type == 3) {
                    valorIz = Number(valorIzquierda.value.charCodeAt(0));
                }
                else if (valorIzquierda.type == 2) {
                    if (valorIzquierda.value) {
                        valorIz = 1;
                    }
                    else {
                        valorIz = 0;
                    }
                }
                else {
                    valorIz = Number(valorIzquierda.value);
                }
                if (valorDerecha.type == 3) {
                    valorDer = Number(valorDerecha.value.charCodeAt(0));
                }
                else if (valorDerecha.type == 2) {
                    if (valorDerecha.value) {
                        valorDer = 1;
                    }
                    else {
                        valorDer = 0;
                    }
                }
                else {
                    valorDer = Number(valorDerecha.value);
                }
                if (valorDer != 0) {
                    return { value: valorIz / valorDer, type: dominante };
                }
                else {
                    throw new Error_1.ErrorE(this.linea, this.columna, 'Semantico', "No es posible operar: " + valorIzquierda.value + " / " + valorDerecha.value);
                }
            }
            else if (this.operador == 4) {
                if (dominante == 0) {
                    var valorIz = void 0, valorDer = void 0;
                    if (valorIzquierda.type == 3) {
                        valorIz = Number(valorIzquierda.value.charCodeAt(0));
                    }
                    else if (valorIzquierda.type == 2) {
                        if (valorIzquierda.value) {
                            valorIz = 1;
                        }
                        else {
                            valorIz = 0;
                        }
                    }
                    else {
                        valorIz = Number(valorIzquierda.value);
                    }
                    if (valorDerecha.type == 3) {
                        valorDer = Number(valorDerecha.value.charCodeAt(0));
                    }
                    else if (valorDerecha.type == 2) {
                        if (valorDerecha.value) {
                            valorDer = 1;
                        }
                        else {
                            valorDer = 0;
                        }
                    }
                    else {
                        valorDer = Number(valorDerecha.value);
                    }
                    return { value: Math.round(Math.pow(valorIz, valorDer)), type: dominante };
                }
                else if (dominante == 1) {
                    var valorIz = void 0, valorDer = void 0;
                    if (valorIzquierda.type == 3) {
                        valorIz = Number(valorIzquierda.value.charCodeAt(0));
                    }
                    else if (valorIzquierda.type == 2) {
                        if (valorIzquierda.value) {
                            valorIz = 1;
                        }
                        else {
                            valorIz = 0;
                        }
                    }
                    else {
                        valorIz = Number(valorIzquierda.value);
                    }
                    if (valorDerecha.type == 3) {
                        valorDer = Number(valorDerecha.value.charCodeAt(0));
                    }
                    else if (valorDerecha.type == 2) {
                        if (valorDerecha.value) {
                            valorDer = 1;
                        }
                        else {
                            valorDer = 0;
                        }
                    }
                    else {
                        valorDer = Number(valorDerecha.value);
                    }
                    return { value: Math.pow(valorIz, valorDer), type: dominante };
                }
            }
            else if (this.operador == 5) {
                var valorIz = void 0, valorDer = void 0;
                if (valorIzquierda.type == 3) {
                    valorIz = Number(valorIzquierda.value.charCodeAt(0));
                }
                else if (valorIzquierda.type == 2) {
                    if (valorIzquierda.value) {
                        valorIz = 1;
                    }
                    else {
                        valorIz = 0;
                    }
                }
                else {
                    valorIz = Number(valorIzquierda.value);
                }
                if (valorDerecha.type == 3) {
                    valorDer = valorDerecha.value.charCodeAt(0);
                }
                else if (valorDerecha.type == 2) {
                    if (valorDerecha.value) {
                        valorDer = 1;
                    }
                    else {
                        valorDer = 0;
                    }
                }
                else {
                    valorDer = Number(valorDerecha.value);
                }
                return { value: valorIz % valorDer, type: dominante };
            }
            else if (this.operador == 7) {
                var valorIz = void 0, valorDer = void 0;
                valorIz = Number(valorIzquierda.value);
                valorDer = Number(valorDerecha.value);
                return { value: valorIz + valorDer, type: dominante };
            }
            else if (this.operador == 8) {
                var valorIz = void 0, valorDer = void 0;
                valorIz = Number(valorIzquierda.value);
                valorDer = Number(valorDerecha.value);
                return { value: valorIz - valorDer, type: dominante };
            }
        }
        return { value: null, type: null };
    };
    return Aritmetica;
}(Expresion_1.Expresion));
exports.Aritmetica = Aritmetica;
var Operador;
(function (Operador) {
    Operador[Operador["SUMA"] = 0] = "SUMA";
    Operador[Operador["RESTA"] = 1] = "RESTA";
    Operador[Operador["MULTIPLICACION"] = 2] = "MULTIPLICACION";
    Operador[Operador["DIVISION"] = 3] = "DIVISION";
    Operador[Operador["POTENCIA"] = 4] = "POTENCIA";
    Operador[Operador["MODULO"] = 5] = "MODULO";
    Operador[Operador["RELACIONAL"] = 6] = "RELACIONAL";
    Operador[Operador["INCREMENTO"] = 7] = "INCREMENTO";
    Operador[Operador["DECREMENTO"] = 8] = "DECREMENTO";
})(Operador = exports.Operador || (exports.Operador = {}));
