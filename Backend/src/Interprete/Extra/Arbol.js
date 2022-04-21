"use strict";
exports.__esModule = true;
exports.NodoArbol = exports.Arbol = void 0;
var Arbol = /** @class */ (function () {
    function Arbol() {
        this.dot = "";
        this.nodos = "";
        this.enlaces = "";
        this.contador = 0;
        this.pila = [];
    }
    Arbol.prototype.generarEnlaces = function (raiz) {
        this.nodos += raiz.nodo + "\n";
        if (raiz.hijos != null) {
            for (var _i = 0, _a = raiz.hijos; _i < _a.length; _i++) {
                var hijo = _a[_i];
                if (hijo != null) {
                    this.enlaces += "n".concat(raiz.numero, " -> n").concat(hijo.numero, "; \n");
                    this.generarEnlaces(hijo);
                }
            }
        }
    };
    Arbol.prototype.generarIni = function () {
        var instruccion = this.generarPrduccion("ini");
        instruccion.hijos = this.pila;
        this.generarEnlaces(instruccion);
        this.dot = "digraph G {\n" + this.nodos + this.enlaces + "\n}";
    };
    Arbol.prototype.generarTipoInstruccion = function () {
        var comprobacion = true;
        while (comprobacion) {
            if (this.pila.length != 0) {
                if (!(this.pila[this.pila.length - 1].texto == "Declaraciones") && !(this.pila[this.pila.length - 1].texto == "Print") && !(this.pila[this.pila.length - 1].texto == "If") && !(this.pila[this.pila.length - 1].texto == "Ciclo") && !(this.pila[this.pila.length - 1].texto == "Break") && !(this.pila[this.pila.length - 1].texto == "Switch") && !(this.pila[this.pila.length - 1].texto == "LlamadoFuncion") && !(this.pila[this.pila.length - 1].texto == "Run") && !(this.pila[this.pila.length - 1].texto == "FuncMetod")) {
                    this.pila.pop();
                }
                else {
                    comprobacion = false;
                }
            }
            else {
                comprobacion = false;
            }
        }
        var hijos = [this.pila.pop()];
        var instruccion = this.generarPrduccion("TipoInstruccion");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    };
    Arbol.prototype.generarError = function () {
        var hijos = [this.generarHijo("Error")];
        var instruccion = this.generarPrduccion("TipoInstruccion");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    };
    Arbol.prototype.generarDeclaraciones = function () {
        this.comprobar("Variables");
        var dato2 = this.pila.pop();
        this.comprobar("TipoVar");
        var hijos = [this.pila.pop(), dato2];
        var instruccion = this.generarPrduccion("Declaraciones");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    };
    Arbol.prototype.generarDeclaraciones1 = function (texto) {
        this.comprobar("ListaVectores");
        var dato2 = this.pila.pop();
        this.comprobar("TipoVar");
        var hijos = [this.pila.pop(), this.generarHijo(texto), this.generarHijo("["), this.generarHijo("]"), this.generarHijo("["), this.generarHijo("]"), this.generarHijo("="), this.generarHijo("["), dato2, this.generarHijo("]"), this.generarHijo(";")];
        var instruccion = this.generarPrduccion("Declaraciones");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    };
    Arbol.prototype.generarDeclaraciones2 = function (texto) {
        this.comprobar("Valor");
        var dato4 = this.pila.pop();
        this.comprobar("Valor");
        var dato3 = this.pila.pop();
        this.comprobar("TipoVar");
        var dato2 = this.pila.pop();
        this.comprobar("TipoVar");
        var hijos = [this.pila.pop(), this.generarHijo(texto), this.generarHijo("["), this.generarHijo("]"), this.generarHijo("["), this.generarHijo("]"), this.generarHijo("="), this.generarHijo("new"), dato2, this.generarHijo("["), dato3, this.generarHijo("]"), this.generarHijo("["), dato4, this.generarHijo("]"), this.generarHijo(";")];
        var instruccion = this.generarPrduccion("Declaraciones");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    };
    Arbol.prototype.generarDeclaraciones3 = function (texto) {
        this.comprobar("ListaValores");
        var dato2 = this.pila.pop();
        this.comprobar("TipoVar");
        var hijos = [this.pila.pop(), this.generarHijo(texto), this.generarHijo("["), this.generarHijo("]"), this.generarHijo("="), this.generarHijo("["), dato2, this.generarHijo("]"), this.generarHijo(";")];
        var instruccion = this.generarPrduccion("Declaraciones");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    };
    Arbol.prototype.generarDeclaraciones4 = function (texto) {
        this.comprobar("Valor");
        var dato3 = this.pila.pop();
        this.comprobar("TipoVar");
        var dato2 = this.pila.pop();
        this.comprobar("TipoVar");
        var hijos = [this.pila.pop(), this.generarHijo(texto), this.generarHijo("["), this.generarHijo("]"), this.generarHijo("="), this.generarHijo("new"), dato2, this.generarHijo("["), dato3, this.generarHijo("]"), this.generarHijo(";")];
        var instruccion = this.generarPrduccion("Declaraciones");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    };
    Arbol.prototype.generarDeclaraciones5 = function (texto) {
        this.comprobar("Valor");
        var dato2 = this.pila.pop();
        this.comprobar("TipoVar");
        var hijos = [this.pila.pop(), this.generarHijo(texto), this.generarHijo("["), this.generarHijo("]"), this.generarHijo("="), this.generarHijo("toCharArray"), this.generarHijo("("), dato2, this.generarHijo(")"), this.generarHijo(";")];
        var instruccion = this.generarPrduccion("Declaraciones");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    };
    Arbol.prototype.generarListaValores = function () {
        this.comprobar("Valor");
        var hijos = [this.pila.pop()];
        var instruccion = this.generarPrduccion("ListaValores");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    };
    Arbol.prototype.generarListaValores2 = function () {
        this.comprobar("Valor");
        var dato2 = this.pila.pop();
        this.comprobar("ListaValores");
        var hijos = [this.pila.pop(), this.generarHijo(","), dato2];
        var instruccion = this.generarPrduccion("ListaValores");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    };
    Arbol.prototype.generarListaVectores = function () {
        this.comprobar("ListaValores");
        var hijos = [this.generarHijo("["), this.pila.pop(), this.generarHijo("]")];
        var instruccion = this.generarPrduccion("ListaVectores");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    };
    Arbol.prototype.generarListaVectores2 = function () {
        this.comprobar("ListaValores");
        var dato2 = this.pila.pop();
        this.comprobar("ListaVectores");
        var hijos = [this.pila.pop(), this.generarHijo(","), this.generarHijo("["), dato2, this.generarHijo("]")];
        var instruccion = this.generarPrduccion("ListaVectores");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    };
    Arbol.prototype.generarInicializacion = function (texto, tipo) {
        var hijos = [this.generarHijo(texto), this.generarHijo(tipo)];
        var instruccion = this.generarPrduccion("Inicializacion");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    };
    Arbol.prototype.generarInicializacion2 = function (texto, tipo) {
        this.comprobar("Valor");
        var hijos = [this.generarHijo(texto), this.generarHijo("["), this.pila.pop(), this.generarHijo("]"), this.generarHijo(tipo)];
        var instruccion = this.generarPrduccion("Inicializacion");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    };
    Arbol.prototype.generarInicializacion3 = function (texto, tipo) {
        this.comprobar("Valor");
        var dato2 = this.pila.pop();
        this.comprobar("Valor");
        var hijos = [this.generarHijo(texto), this.generarHijo("["), this.pila.pop(), this.generarHijo("]"), this.generarHijo("["), dato2, this.generarHijo("]"), this.generarHijo(tipo)];
        var instruccion = this.generarPrduccion("Inicializacion");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    };
    Arbol.prototype.generarInicializacion4 = function (texto) {
        this.comprobar("Valor");
        var hijos = [this.generarHijo(texto), this.generarHijo("="), this.pila.pop()];
        var instruccion = this.generarPrduccion("Inicializacion");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    };
    Arbol.prototype.generarInicializacion5 = function (texto) {
        this.comprobar("Valor");
        var dato2 = this.pila.pop();
        this.comprobar("Valor");
        var hijos = [this.generarHijo(texto), this.generarHijo("["), this.pila.pop(), this.generarHijo("]"), this.generarHijo("="), dato2];
        var instruccion = this.generarPrduccion("Inicializacion");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    };
    Arbol.prototype.generarInicializacion6 = function (texto) {
        this.comprobar("Valor");
        var dato3 = this.pila.pop();
        this.comprobar("Valor");
        var dato2 = this.pila.pop();
        this.comprobar("Valor");
        var hijos = [this.generarHijo(texto), this.generarHijo("["), this.pila.pop(), this.generarHijo("]"), this.generarHijo("["), dato2, this.generarHijo("]"), this.generarHijo("="), dato3];
        var instruccion = this.generarPrduccion("Inicializacion");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    };
    Arbol.prototype.generarTipoInstruccion2 = function () {
        this.comprobar("Inicializacion");
        var hijos = [this.pila.pop(), this.generarHijo(";")];
        var instruccion = this.generarPrduccion("TipoInstruccion");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    };
    Arbol.prototype.generarInstrucciones = function () {
        this.comprobar("TipoInstruccion");
        var hijos = [this.pila.pop()];
        var instruccion = this.generarPrduccion("Instrucciones");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    };
    Arbol.prototype.generarInstrucciones2 = function () {
        this.comprobar("TipoInstruccion");
        var dato2 = this.pila.pop();
        this.comprobar("Instrucciones");
        var hijos = [this.pila.pop(), dato2];
        var instruccion = this.generarPrduccion("Instrucciones");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    };
    Arbol.prototype.generarBreak = function (texto) {
        var hijos = [this.generarHijo(texto), this.generarHijo(";")];
        var instruccion = this.generarPrduccion("Break");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    };
    Arbol.prototype.generarBreak1 = function (texto) {
        this.comprobar("Valor");
        var hijos = [this.generarHijo(texto), this.pila.pop(), this.generarHijo(";")];
        var instruccion = this.generarPrduccion("Break");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    };
    Arbol.prototype.generarTipoVar = function (texto) {
        var hijos = [this.generarHijo(texto)];
        var instruccion = this.generarPrduccion("TipoVar");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    };
    Arbol.prototype.generarValorOperacion = function (texto) {
        this.comprobar("Valor");
        var dato2 = this.pila.pop();
        this.comprobar("Valor");
        var hijos = [this.pila.pop(), this.generarHijo(texto), dato2];
        var instruccion = this.generarPrduccion("Valor");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    };
    Arbol.prototype.generarValorOperacionU = function (texto) {
        this.comprobar("Valor");
        var hijos = [this.generarHijo(texto), this.pila.pop()];
        var instruccion = this.generarPrduccion("Valor");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    };
    Arbol.prototype.generarValorFuncion = function (texto) {
        this.comprobar("Valor");
        var hijos = [this.generarHijo(texto), this.generarHijo("("), this.pila.pop(), this.generarHijo(")")];
        var instruccion = this.generarPrduccion("Valor");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    };
    Arbol.prototype.generarValorPar = function () {
        this.comprobar("Valor");
        var hijos = [this.generarHijo("("), this.pila.pop(), this.generarHijo(")")];
        var instruccion = this.generarPrduccion("Valor");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    };
    Arbol.prototype.generarValor = function (texto) {
        var hijos = [this.generarHijo(texto)];
        var instruccion = this.generarPrduccion("Valor");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    };
    Arbol.prototype.generarValorCasteo = function () {
        this.comprobar("Valor");
        var dato2 = this.pila.pop();
        this.comprobar("TipoVar");
        var hijos = [this.generarHijo("("), this.pila.pop(), this.generarHijo(")"), dato2];
        var instruccion = this.generarPrduccion("Valor");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    };
    Arbol.prototype.generarValorT = function () {
        this.comprobar("Valor");
        var dato3 = this.pila.pop();
        this.comprobar("Valor");
        var dato2 = this.pila.pop();
        this.comprobar("Valor");
        var hijos = [this.pila.pop(), this.generarHijo("?"), dato2, this.generarHijo(":"), dato3];
        var instruccion = this.generarPrduccion("Valor");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    };
    Arbol.prototype.generarINCDEC = function (texto) {
        this.comprobar("Valor");
        var hijos = [this.pila.pop(), this.generarHijo(texto)];
        var instruccion = this.generarPrduccion("Valor");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    };
    Arbol.prototype.generarValorA = function (texto) {
        var hijos = [this.generarHijo(texto)];
        var instruccion = this.generarPrduccion("Valor");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    };
    Arbol.prototype.generarValorAV = function (texto) {
        this.comprobar("Valor");
        var hijos = [this.generarHijo(texto), this.generarHijo("["), this.pila.pop(), this.generarHijo("]")];
        var instruccion = this.generarPrduccion("Valor");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    };
    Arbol.prototype.generarVariables = function () {
        this.comprobar("Valor");
        var dato2 = this.pila.pop();
        this.comprobar("Variables2");
        var hijos = [this.pila.pop(), this.generarHijo("="), dato2, this.generarHijo(";")];
        var instruccion = this.generarPrduccion("Variables");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    };
    Arbol.prototype.generarVariables_1 = function () {
        this.comprobar("Variables2");
        var hijos = [this.pila.pop(), this.generarHijo(";")];
        var instruccion = this.generarPrduccion("Variables");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    };
    Arbol.prototype.generarVariables2_ = function (texto) {
        var hijos = [this.generarHijo(texto)];
        var instruccion = this.generarPrduccion("Variables2");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    };
    Arbol.prototype.generarVariables2_1 = function (texto) {
        this.comprobar("Variables2");
        var hijos = [this.pila.pop(), this.generarHijo(","), this.generarHijo(texto)];
        var instruccion = this.generarPrduccion("Variables2");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    };
    Arbol.prototype.generarValorAM = function (texto) {
        this.comprobar("Valor");
        var dato2 = this.pila.pop();
        this.comprobar("Valor");
        var hijos = [this.generarHijo(texto), this.generarHijo("["), this.pila.pop(), this.generarHijo("]"), this.generarHijo("["), dato2, this.generarHijo("]")];
        var instruccion = this.generarPrduccion("Valor");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    };
    Arbol.prototype.generarPrint = function (texto) {
        this.comprobar("Valor");
        var hijos = [this.generarHijo(texto), this.generarHijo("("), this.pila.pop(), this.generarHijo(")"), this.generarHijo(";")];
        var instruccion = this.generarPrduccion("Print");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    };
    Arbol.prototype.generarPrint2 = function (texto) {
        var hijos = [this.generarHijo(texto), this.generarHijo("("), this.generarHijo(")"), this.generarHijo(";")];
        var instruccion = this.generarPrduccion("Print");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    };
    Arbol.prototype.generarEntorno = function () {
        var hijos = [this.generarHijo("{"), this.generarHijo("}")];
        var instruccion = this.generarPrduccion("Entorno");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    };
    Arbol.prototype.generarEntorno2 = function () {
        this.comprobar("Instrucciones");
        var hijos = [this.generarHijo("{"), this.pila.pop(), this.generarHijo("}")];
        var instruccion = this.generarPrduccion("Entorno");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    };
    Arbol.prototype.generarIf = function () {
        this.comprobar("Else");
        var dato3 = this.pila.pop();
        this.comprobar("Entorno");
        var dato2 = this.pila.pop();
        this.comprobar("Valor");
        var hijos = [this.generarHijo("If"), this.generarHijo("("), this.pila.pop(), this.generarHijo(")"), dato2, dato3];
        var instruccion = this.generarPrduccion("If");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    };
    Arbol.prototype.generarElse = function () {
        this.comprobar2("Entorno", "If");
        var hijos = [this.generarHijo("Else"), this.pila.pop()];
        var instruccion = this.generarPrduccion("Else");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    };
    Arbol.prototype.generarElse2 = function () {
        var instruccion = this.generarPrduccion("Else");
        instruccion.insertarHijos([this.generarHijo("Epsilon")]);
        this.pila.push(instruccion);
    };
    Arbol.prototype.generarFor = function () {
        this.comprobar("Entorno");
        var dato4 = this.pila.pop();
        this.comprobar("Inicializacion");
        var dato3 = this.pila.pop();
        this.comprobar("Valor");
        var dato2 = this.pila.pop();
        this.comprobar("Param1");
        var hijos = [this.generarHijo("For"), this.generarHijo("("), this.pila.pop(), dato2, this.generarHijo(";"), dato3, this.generarHijo(")"), dato4];
        var instruccion = this.generarPrduccion("Ciclo");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    };
    Arbol.prototype.generarWhile = function () {
        this.comprobar("Entorno");
        var dato2 = this.pila.pop();
        this.comprobar("Valor");
        var hijos = [this.generarHijo("While"), this.generarHijo("("), this.pila.pop(), this.generarHijo(")"), dato2];
        var instruccion = this.generarPrduccion("Ciclo");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    };
    Arbol.prototype.generarDWhile = function () {
        this.comprobar("Valor");
        var dato2 = this.pila.pop();
        this.comprobar("Entorno");
        var hijos = [this.generarHijo("Do"), this.pila.pop(), this.generarHijo("While"), this.generarHijo("("), dato2, this.generarHijo(")"), this.generarHijo(";")];
        var instruccion = this.generarPrduccion("Ciclo");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    };
    Arbol.prototype.generarParam = function () {
        this.comprobar("Declaraciones");
        var hijos = [this.pila.pop()];
        var instruccion = this.generarPrduccion("Param1");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    };
    Arbol.prototype.generarParam1 = function () {
        this.comprobar("Inicializacion");
        var hijos = [this.pila.pop(), this.generarHijo(";")];
        var instruccion = this.generarPrduccion("Param1");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    };
    Arbol.prototype.generarCasos = function () {
        this.comprobar("Instrucciones");
        var dato2 = this.pila.pop();
        this.comprobar("Valor");
        var hijos = [this.generarHijo("Case"), this.pila.pop(), this.generarHijo(":"), dato2];
        var instruccion = this.generarPrduccion("Casos");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    };
    Arbol.prototype.generarCasos2 = function () {
        this.comprobar("Instrucciones");
        var dato3 = this.pila.pop();
        this.comprobar("Valor");
        var dato2 = this.pila.pop();
        this.comprobar("Casos");
        var hijos = [this.pila.pop(), this.generarHijo("Case"), dato2, this.generarHijo(":"), dato3];
        var instruccion = this.generarPrduccion("Casos");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    };
    Arbol.prototype.generarEntornoS = function () {
        this.comprobar("Instrucciones");
        var dato2 = this.pila.pop();
        this.comprobar("Casos");
        var hijos = [this.pila.pop(), this.generarHijo("Default"), this.generarHijo(":"), dato2];
        var instruccion = this.generarPrduccion("EntornoS");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    };
    Arbol.prototype.generarEntornoS2 = function () {
        this.comprobar("Casos");
        var hijos = [this.pila.pop()];
        var instruccion = this.generarPrduccion("EntornoS");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    };
    Arbol.prototype.generarEntornoS3 = function () {
        this.comprobar("Instrucciones");
        var hijos = [this.generarHijo("Default"), this.generarHijo(":"), this.pila.pop()];
        var instruccion = this.generarPrduccion("EntornoS");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    };
    Arbol.prototype.generarEntornoS4 = function () {
        var hijos = [this.generarHijo("Default"), this.generarHijo(":")];
        var instruccion = this.generarPrduccion("EntornoS");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    };
    Arbol.prototype.generarSwitch = function () {
        this.comprobar("EntornoS");
        var dato2 = this.pila.pop();
        this.comprobar("Valor");
        var hijos = [this.generarHijo("Switch"), this.generarHijo("("), this.pila.pop(), this.generarHijo(")"), this.generarHijo("{"), dato2, this.generarHijo("}")];
        var instruccion = this.generarPrduccion("Switch");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    };
    Arbol.prototype.generarLlamado = function (nombre) {
        this.comprobar("ListaValores");
        var hijos = [this.generarHijo(nombre), this.generarHijo("("), this.pila.pop(), this.generarHijo(")"), this.generarHijo(";")];
        var instruccion = this.generarPrduccion("LlamadoFuncion");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    };
    Arbol.prototype.generarLlamado1 = function (nombre) {
        var hijos = [this.generarHijo(nombre), this.generarHijo("("), this.generarHijo(")"), this.generarHijo(";")];
        var instruccion = this.generarPrduccion("LlamadoFuncion");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    };
    Arbol.prototype.generarRun = function () {
        this.comprobar("LlamadoFuncion");
        var hijos = [this.generarHijo("Run"), this.pila.pop()];
        var instruccion = this.generarPrduccion("Run");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    };
    Arbol.prototype.generarLParam = function (nombre) {
        this.comprobar("TipoVar");
        var dato2 = this.pila.pop();
        this.comprobar("ListaParametros");
        var hijos = [this.pila.pop(), this.generarHijo(","), dato2, this.generarHijo(nombre)];
        var instruccion = this.generarPrduccion("ListaParametros");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    };
    Arbol.prototype.generarLParam1 = function (nombre) {
        this.comprobar("TipoVar");
        var hijos = [this.pila.pop(), this.generarHijo(nombre)];
        var instruccion = this.generarPrduccion("ListaParametros");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    };
    Arbol.prototype.generarTipoFunc = function () {
        this.comprobar("TipoVar");
        var hijos = [this.generarHijo(":"), this.pila.pop()];
        var instruccion = this.generarPrduccion("TipoFunc");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    };
    Arbol.prototype.generarTipoFunc1 = function () {
        var hijos = [this.generarHijo(":"), this.generarHijo("void")];
        var instruccion = this.generarPrduccion("TipoFunc");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    };
    Arbol.prototype.generarTipoFunc2 = function () {
        var hijos = [this.generarHijo("--")];
        var instruccion = this.generarPrduccion("TipoFunc");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    };
    Arbol.prototype.generarFuncMetod = function (nombre) {
        this.comprobar("Instrucciones");
        var dato3 = this.pila.pop();
        this.comprobar("TipoFunc");
        var dato2 = this.pila.pop();
        this.comprobar("ListaParametros");
        var hijos = [this.generarHijo(nombre), this.generarHijo("("), this.pila.pop(), this.generarHijo(")"), dato2, this.generarHijo("{"), dato3, this.generarHijo("}")];
        var instruccion = this.generarPrduccion("FuncMetod");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    };
    Arbol.prototype.generarFuncMetod1 = function (nombre) {
        this.comprobar("Instrucciones");
        var dato2 = this.pila.pop();
        this.comprobar("TipoFunc");
        var hijos = [this.generarHijo(nombre), this.generarHijo("("), this.generarHijo(")"), this.pila.pop(), this.generarHijo("{"), dato2, this.generarHijo("}")];
        var instruccion = this.generarPrduccion("FuncMetod");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    };
    Arbol.prototype.generarLlamadoV = function (nombre) {
        this.comprobar("ListaValores");
        var hijos = [this.generarHijo(nombre), this.generarHijo("("), this.pila.pop(), this.generarHijo(")")];
        var instruccion = this.generarPrduccion("Valor");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    };
    Arbol.prototype.generarLlamado1V = function (nombre) {
        var hijos = [this.generarHijo(nombre), this.generarHijo("("), this.generarHijo(")")];
        var instruccion = this.generarPrduccion("Valor");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    };
    Arbol.prototype.generarHijo = function (texto) {
        var hijo = new NodoArbol(texto, this.contador);
        hijo.nodo = "n".concat(this.contador, "[label=\"").concat(texto, "\"];");
        this.contador++;
        return hijo;
    };
    Arbol.prototype.generarPrduccion = function (texto) {
        var hijo = new NodoArbol(texto, this.contador);
        hijo.nodo = "n".concat(this.contador, "[label=\"").concat(texto, "\", style=filled];");
        this.contador++;
        return hijo;
    };
    Arbol.prototype.comprobar = function (Anterior) {
        var comprobacion = true;
        while (comprobacion) {
            if (this.pila.length != 0) {
                if (!(this.pila[this.pila.length - 1].texto == Anterior)) {
                    console.log(this.pila.pop());
                    console.log(Anterior);
                }
                else {
                    comprobacion = false;
                }
            }
            else {
                comprobacion = false;
            }
        }
    };
    Arbol.prototype.comprobar2 = function (Anterior, Anterior2) {
        var comprobacion = true;
        while (comprobacion) {
            if (this.pila.length != 0) {
                if (!(this.pila[this.pila.length - 1].texto == Anterior) && !(this.pila[this.pila.length - 1].texto == Anterior2)) {
                    this.pila.pop();
                }
                else {
                    comprobacion = false;
                }
            }
            else {
                comprobacion = false;
            }
        }
    };
    Arbol.prototype.Reiniciar = function () {
        this.dot = "";
        this.nodos = "";
        this.enlaces = "";
        this.contador = 0;
        this.pila = [];
    };
    return Arbol;
}());
exports.Arbol = Arbol;
var NodoArbol = /** @class */ (function () {
    function NodoArbol(texto, numero) {
        this.texto = texto;
        this.numero = numero;
        this.nodo = "";
    }
    NodoArbol.prototype.insertarHijos = function (hijos) {
        this.hijos = hijos;
    };
    return NodoArbol;
}());
exports.NodoArbol = NodoArbol;
