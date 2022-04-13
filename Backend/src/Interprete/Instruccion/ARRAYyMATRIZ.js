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
exports.InicializacionM = exports.InicializacionV = exports.MatrizDec2 = exports.MatrizDec1 = exports.VectorDec2 = exports.VectorDec3 = exports.VectorDec1 = void 0;
var Error_1 = require("../Error/Error");
var Instruccion_1 = require("./Instruccion");
var VectorDec1 = /** @class */ (function (_super) {
    __extends(VectorDec1, _super);
    function VectorDec1(nombre, tipo, contenido, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.nombre = nombre;
        _this.tipo = tipo;
        _this.contenido = contenido;
        return _this;
    }
    VectorDec1.prototype.ejecutar = function (ambito) {
        var vector = [];
        for (var _i = 0, _a = this.contenido; _i < _a.length; _i++) {
            var valor = _a[_i];
            var dato = valor.ejecutar(ambito);
            if (dato.type == this.tipo) {
                vector.push(dato.value);
                continue;
            }
            throw new Error_1.ErrorE(this.linea, this.columna, 'Semantico', 'El dato: ' + dato.value + ' del arreglo: ' + this.nombre + ' no es del tipo correspondiente');
        }
        ambito.setValV(this.nombre, vector, this.tipo, this.linea, this.columna);
    };
    return VectorDec1;
}(Instruccion_1.Instruccion));
exports.VectorDec1 = VectorDec1;
var VectorDec3 = /** @class */ (function (_super) {
    __extends(VectorDec3, _super);
    function VectorDec3(nombre, tipo, valor, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.nombre = nombre;
        _this.tipo = tipo;
        _this.valor = valor;
        return _this;
    }
    VectorDec3.prototype.ejecutar = function (ambito) {
        var dato = this.valor.ejecutar(ambito);
        if (this.tipo != 3) {
            throw new Error_1.ErrorE(this.linea, this.columna, 'Semantico', 'El tipo del vector no es el adecuado para ejecutar la funcion ToCharArray');
        }
        if (dato.type == 4 && typeof (dato.value) == 'string') {
            ambito.setValV(this.nombre, String(dato.value).split(""), this.tipo, this.linea, this.columna);
        }
        else {
            throw new Error_1.ErrorE(this.linea, this.columna, 'Semantico', 'No se puede ejecutar la funcion ToCharArray ya que: ' + dato.value + ' no es una cadena String');
        }
    };
    return VectorDec3;
}(Instruccion_1.Instruccion));
exports.VectorDec3 = VectorDec3;
var VectorDec2 = /** @class */ (function (_super) {
    __extends(VectorDec2, _super);
    function VectorDec2(nombre, tipo, tipoV, tamanio, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.nombre = nombre;
        _this.tipo = tipo;
        _this.tipoV = tipoV;
        _this.tamanio = tamanio;
        return _this;
    }
    VectorDec2.prototype.ejecutar = function (ambito) {
        if (this.tipo != this.tipoV) {
            throw new Error_1.ErrorE(this.linea, this.columna, 'Semantico', 'Los tipos en la declaracion del arreglo: ' + this.nombre + ' no concuerdan');
        }
        var dato = this.tamanio.ejecutar(ambito);
        if (dato.type == 0) {
            if (dato.value <= 0) {
                throw new Error_1.ErrorE(this.linea, this.columna, 'Semantico', 'El indice ingresado debe ser positivo');
            }
            var vector = [];
            for (var i = 0; i < dato.value; i++) {
                vector.push(null);
            }
            ambito.setValV(this.nombre, vector, this.tipo, this.linea, this.columna);
        }
        else {
            throw new Error_1.ErrorE(this.linea, this.columna, 'Semantico', 'El dato: ' + dato.value + ' del arreglo: ' + this.nombre + ' no es del tipo correspondiente');
        }
    };
    return VectorDec2;
}(Instruccion_1.Instruccion));
exports.VectorDec2 = VectorDec2;
var MatrizDec1 = /** @class */ (function (_super) {
    __extends(MatrizDec1, _super);
    function MatrizDec1(nombre, tipo, contenido, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.nombre = nombre;
        _this.tipo = tipo;
        _this.contenido = contenido;
        return _this;
    }
    MatrizDec1.prototype.ejecutar = function (ambito) {
        var matriz = [];
        var tamanioFila = 0;
        for (var i in this.contenido) {
            if (Number(i) == 0) {
                tamanioFila = this.contenido[i].length;
                var arreglo = [];
                for (var _i = 0, _a = this.contenido[i]; _i < _a.length; _i++) {
                    var valor = _a[_i];
                    var dato = valor.ejecutar(ambito);
                    if (dato.type == this.tipo) {
                        arreglo.push(dato.value);
                    }
                    else {
                        throw new Error_1.ErrorE(this.linea, this.columna, 'Semantico', 'El dato: ' + dato.value + ' de la matriz: ' + this.nombre + ' no es del tipo correspondiente');
                    }
                }
                matriz.push(arreglo);
            }
            else if (Number(i) != 0) {
                if (tamanioFila == this.contenido[i].length) {
                    var arreglo = [];
                    for (var _b = 0, _c = this.contenido[i]; _b < _c.length; _b++) {
                        var valor = _c[_b];
                        var dato = valor.ejecutar(ambito);
                        if (dato.type == this.tipo) {
                            arreglo.push(dato.value);
                        }
                        else {
                            throw new Error_1.ErrorE(this.linea, this.columna, 'Semantico', 'El dato: ' + dato.value + ' de la matriz: ' + this.nombre + ' no es del tipo correspondiente');
                        }
                    }
                    matriz.push(arreglo);
                }
                else {
                    throw new Error_1.ErrorE(this.linea, this.columna, 'Semantico', 'Las filas dentro de la matriz: ' + this.nombre + ' no son de la misma longitud');
                }
            }
        }
        ambito.setValM(this.nombre, matriz, this.tipo, this.linea, this.columna);
    };
    return MatrizDec1;
}(Instruccion_1.Instruccion));
exports.MatrizDec1 = MatrizDec1;
var MatrizDec2 = /** @class */ (function (_super) {
    __extends(MatrizDec2, _super);
    function MatrizDec2(nombre, tipo, tipoV, filas, columnas, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.nombre = nombre;
        _this.tipo = tipo;
        _this.tipoV = tipoV;
        _this.filas = filas;
        _this.columnas = columnas;
        return _this;
    }
    MatrizDec2.prototype.ejecutar = function (ambito) {
        var matriz = [];
        if (this.tipo != this.tipoV) {
            throw new Error_1.ErrorE(this.linea, this.columna, 'Semantico', 'Los tipos en la declaracion de la matriz: ' + this.nombre + ' no concuerdan');
        }
        var tamanioFila = this.filas.ejecutar(ambito);
        var tamanioColumna = this.columnas.ejecutar(ambito);
        if (tamanioFila.type != 0 || tamanioColumna.type != 0) {
            throw new Error_1.ErrorE(this.linea, this.columna, 'Semantico', 'El valor de las filas o columnas no es un entero');
        }
        if (tamanioFila.value <= 0) {
            throw new Error_1.ErrorE(this.linea, this.columna, 'Semantico', 'El indice ingresado en Fila debe ser positivo');
        }
        if (tamanioFila.value <= 0) {
            throw new Error_1.ErrorE(this.linea, this.columna, 'Semantico', 'El indice ingresado en Columna debe ser positivo');
        }
        for (var i = 0; i < tamanioFila.value; i++) {
            var vector = [];
            for (var i_1 = 0; i_1 < tamanioFila.value; i_1++) {
                vector.push(null);
            }
            matriz.push(vector);
        }
        ambito.setValM(this.nombre, matriz, this.tipo, this.linea, this.columna);
    };
    return MatrizDec2;
}(Instruccion_1.Instruccion));
exports.MatrizDec2 = MatrizDec2;
var InicializacionV = /** @class */ (function (_super) {
    __extends(InicializacionV, _super);
    function InicializacionV(nombre, celda, valor, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.nombre = nombre;
        _this.celda = celda;
        _this.valor = valor;
        return _this;
    }
    InicializacionV.prototype.ejecutar = function (ambito) {
        var value = this.valor.ejecutar(ambito);
        var busqueda = ambito.getVal(this.nombre);
        if (busqueda != null && busqueda.primitivo == 1) {
            var arrayB = busqueda.valor;
            var celdaV = this.celda.ejecutar(ambito);
            if (celdaV.type != 0) {
                throw new Error_1.ErrorE(this.linea, this.columna, 'Semantico', 'El indice ingresado no es un entero');
            }
            if (celdaV.value < 0 || celdaV.value >= arrayB.length) {
                throw new Error_1.ErrorE(this.linea, this.columna, 'Semantico', 'El indice especificado no existe dentro del arreglo');
            }
            if (busqueda.tipo == value.type) {
                arrayB[celdaV.value] = value.value;
                ambito.modValV(this.nombre, arrayB, busqueda.tipo);
            }
            else {
                throw new Error_1.ErrorE(this.linea, this.columna, 'Semantico', 'El dato: ' + value.value + ' no se puede ingresar al arreglo porque no es del tipo adecuado');
            }
        }
        else {
            throw new Error_1.ErrorE(this.linea, this.columna, 'Semantico', 'No existe un vector con el nombre: ' + this.nombre);
        }
    };
    return InicializacionV;
}(Instruccion_1.Instruccion));
exports.InicializacionV = InicializacionV;
var InicializacionM = /** @class */ (function (_super) {
    __extends(InicializacionM, _super);
    function InicializacionM(nombre, fila, celda, valor, linea, columna) {
        var _this = _super.call(this, linea, columna) || this;
        _this.nombre = nombre;
        _this.fila = fila;
        _this.celda = celda;
        _this.valor = valor;
        return _this;
    }
    InicializacionM.prototype.ejecutar = function (ambito) {
        var value = this.valor.ejecutar(ambito);
        var busqueda = ambito.getVal(this.nombre);
        if (busqueda != null && busqueda.primitivo == 2) {
            var arrayB = busqueda.valor;
            var celdaV = this.celda.ejecutar(ambito);
            var filaV = this.fila.ejecutar(ambito);
            if (filaV.type != 0) {
                throw new Error_1.ErrorE(this.linea, this.columna, 'Semantico', 'El indice ingresado en Fila no es un entero');
            }
            if (filaV.value < 0 || celdaV.value >= arrayB.length) {
                throw new Error_1.ErrorE(this.linea, this.columna, 'Semantico', 'El indice especificado en Fila no existe dentro de la matriz');
            }
            if (celdaV.type != 0) {
                throw new Error_1.ErrorE(this.linea, this.columna, 'Semantico', 'El indice ingresado en Columna no es un entero');
            }
            if (celdaV.value < 0 || celdaV.value >= arrayB.length) {
                throw new Error_1.ErrorE(this.linea, this.columna, 'Semantico', 'El indice especificado en Columna no existe dentro de la matriz');
            }
            if (busqueda.tipo == value.type) {
                arrayB[filaV.value][celdaV.value] = value.value;
                ambito.modValM(this.nombre, arrayB, busqueda.tipo);
            }
            else {
                throw new Error_1.ErrorE(this.linea, this.columna, 'Semantico', 'El dato: ' + value.value + ' no se puede ingresar al arreglo porque no es del tipo adecuado');
            }
        }
        else {
            throw new Error_1.ErrorE(this.linea, this.columna, 'Semantico', 'No existe una matriz con el nombre: ' + this.nombre);
        }
    };
    return InicializacionM;
}(Instruccion_1.Instruccion));
exports.InicializacionM = InicializacionM;
