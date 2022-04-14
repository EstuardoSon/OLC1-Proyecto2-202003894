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
                    this.enlaces += "n".concat(raiz.numero, " -> n").concat(hijo.numero, " ;");
                    this.generarEnlaces(hijo);
                }
            }
        }
    };
    Arbol.prototype.generarIni = function () {
        var instruccion = this.generarPrduccion("ini");
        instruccion.hijos = [this.pila.pop()];
        this.generarEnlaces(instruccion);
        this.dot = "digraph G {<br>" + this.nodos + this.enlaces + "<br>}";
    };
    Arbol.prototype.generarTipoInstruccion = function () {
        var hijos = [this.pila.pop()];
        var instruccion = this.generarPrduccion("TipoInstruccion");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    };
    /*
    public generarError() {
        let comprobacion = true;
        while (comprobacion) {
            if ((this.pila[this.pila.length - 1].texto == "Valor") || (this.pila[this.pila.length - 1].texto == "ListaValores") || (this.pila[this.pila.length - 1].texto == "ListaVectores") || (this.pila[this.pila.length - 1].texto == "TipoVar")) { this.pila.pop(); }
            else{ comprobacion = false }
        }
        const hijos = [this.generarHijo("Error")]
        const instruccion = this.generarPrduccion("TipoInstruccion");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    }*/
    Arbol.prototype.generarDeclaraciones = function () {
        var dato2 = this.pila.pop();
        var hijos = [this.pila.pop(), dato2];
        var instruccion = this.generarPrduccion("Declaraciones");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    };
    Arbol.prototype.generarDeclaraciones1 = function (texto) {
        var dato2 = this.pila.pop();
        var hijos = [this.pila.pop(), this.generarHijo(texto), this.generarHijo("["), this.generarHijo("]"), this.generarHijo("["), this.generarHijo("]"), this.generarHijo("="), this.generarHijo("["), dato2, this.generarHijo("]"), this.generarHijo(";")];
        var instruccion = this.generarPrduccion("Declaraciones");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    };
    Arbol.prototype.generarDeclaraciones2 = function (texto) {
        var dato4 = this.pila.pop();
        var dato3 = this.pila.pop();
        var dato2 = this.pila.pop();
        var hijos = [this.pila.pop(), this.generarHijo(texto), this.generarHijo("["), this.generarHijo("]"), this.generarHijo("["), this.generarHijo("]"), this.generarHijo("="), this.generarHijo("new"), dato2, this.generarHijo("["), dato3, this.generarHijo("]"), this.generarHijo("["), dato4, this.generarHijo("]"), this.generarHijo(";")];
        var instruccion = this.generarPrduccion("Declaraciones");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    };
    Arbol.prototype.generarDeclaraciones3 = function (texto) {
        var dato2 = this.pila.pop();
        var hijos = [this.pila.pop(), this.generarHijo(texto), this.generarHijo("["), this.generarHijo("]"), this.generarHijo("="), this.generarHijo("["), dato2, this.generarHijo("]"), this.generarHijo(";")];
        var instruccion = this.generarPrduccion("Declaraciones");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    };
    Arbol.prototype.generarDeclaraciones4 = function (texto) {
        var dato3 = this.pila.pop();
        var dato2 = this.pila.pop();
        var hijos = [this.pila.pop(), this.generarHijo(texto), this.generarHijo("["), this.generarHijo("]"), this.generarHijo("="), this.generarHijo("new"), dato2, this.generarHijo("["), dato3, this.generarHijo("]"), this.generarHijo(";")];
        var instruccion = this.generarPrduccion("Declaraciones");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    };
    Arbol.prototype.generarDeclaraciones5 = function (texto) {
        var dato2 = this.pila.pop();
        var hijos = [this.pila.pop(), this.generarHijo(texto), this.generarHijo("["), this.generarHijo("]"), this.generarHijo("="), this.generarHijo("toCharArray"), this.generarHijo("("), dato2, this.generarHijo(")"), this.generarHijo(";")];
        var instruccion = this.generarPrduccion("Declaraciones");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    };
    Arbol.prototype.generarListaValores = function () {
        var hijos = [this.pila.pop()];
        var instruccion = this.generarPrduccion("ListaValores");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    };
    Arbol.prototype.generarListaValores2 = function () {
        var dato2 = this.pila.pop();
        var hijos = [this.pila.pop(), this.generarHijo(","), dato2];
        var instruccion = this.generarPrduccion("ListaValores");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    };
    Arbol.prototype.generarListaVectores = function () {
        var hijos = [this.generarHijo("["), this.pila.pop(), this.generarHijo("]")];
        var instruccion = this.generarPrduccion("ListaVectores");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    };
    Arbol.prototype.generarListaVectores2 = function () {
        var dato2 = this.pila.pop();
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
        var hijos = [this.generarHijo(texto), this.generarHijo("["), this.pila.pop(), this.generarHijo("]"), this.generarHijo(tipo)];
        var instruccion = this.generarPrduccion("Inicializacion");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    };
    Arbol.prototype.generarInicializacion3 = function (texto, tipo) {
        var dato2 = this.pila.pop();
        var hijos = [this.generarHijo(texto), this.generarHijo("["), this.pila.pop(), this.generarHijo("]"), this.generarHijo("["), dato2, this.generarHijo("]"), this.generarHijo(tipo)];
        var instruccion = this.generarPrduccion("Inicializacion");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    };
    Arbol.prototype.generarInicializacion4 = function (texto) {
        var hijos = [this.generarHijo(texto), this.generarHijo("="), this.pila.pop()];
        var instruccion = this.generarPrduccion("Inicializacion");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    };
    Arbol.prototype.generarInicializacion5 = function (texto) {
        var dato2 = this.pila.pop();
        var hijos = [this.generarHijo(texto), this.generarHijo("["), this.pila.pop(), this.generarHijo("]"), this.generarHijo("="), dato2];
        var instruccion = this.generarPrduccion("Inicializacion");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    };
    Arbol.prototype.generarInicializacion6 = function (texto) {
        var dato3 = this.pila.pop();
        var dato2 = this.pila.pop();
        var hijos = [this.generarHijo(texto), this.generarHijo("["), this.pila.pop(), this.generarHijo("]"), this.generarHijo("["), dato2, this.generarHijo("]"), this.generarHijo("="), dato3];
        var instruccion = this.generarPrduccion("Inicializacion");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    };
    Arbol.prototype.generarTipoInstruccion2 = function () {
        var hijos = [this.pila.pop(), this.generarHijo(";")];
        var instruccion = this.generarPrduccion("TipoInstruccion");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    };
    Arbol.prototype.generarInstrucciones = function () {
        var hijos = [this.pila.pop()];
        var instruccion = this.generarPrduccion("Instrucciones");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    };
    Arbol.prototype.generarInstrucciones2 = function () {
        var dato2 = this.pila.pop();
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
    Arbol.prototype.generarTipoVar = function (texto) {
        var hijos = [this.generarHijo(texto)];
        var instruccion = this.generarPrduccion("TipoVar");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    };
    Arbol.prototype.generarValorOperacion = function (texto) {
        var dato2 = this.pila.pop();
        var hijos = [this.pila.pop(), this.generarHijo(texto), dato2];
        var instruccion = this.generarPrduccion("Valor");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    };
    Arbol.prototype.generarValorOperacionU = function (texto) {
        var hijos = [this.generarHijo(texto), this.pila.pop()];
        var instruccion = this.generarPrduccion("Valor");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    };
    Arbol.prototype.generarValorFuncion = function (texto) {
        var hijos = [this.generarHijo(texto), this.generarHijo("("), this.pila.pop(), this.generarHijo(")")];
        var instruccion = this.generarPrduccion("Valor");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    };
    Arbol.prototype.generarValorPar = function () {
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
        var dato2 = this.pila.pop();
        var hijos = [this.generarHijo("("), this.pila.pop(), this.generarHijo(")"), dato2];
        var instruccion = this.generarPrduccion("Valor");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    };
    Arbol.prototype.generarValorT = function () {
        var dato3 = this.pila.pop();
        var dato2 = this.pila.pop();
        var hijos = [this.pila.pop(), this.generarHijo("?"), dato2, this.generarHijo(":"), dato3];
        var instruccion = this.generarPrduccion("Valor");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    };
    Arbol.prototype.generarINCDEC = function (texto) {
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
        var hijos = [this.generarHijo(texto), this.generarHijo("["), this.pila.pop(), this.generarHijo("]")];
        var instruccion = this.generarPrduccion("Valor");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    };
    Arbol.prototype.generarVariables = function () {
        var dato2 = this.pila.pop();
        var hijos = [this.pila.pop(), this.generarHijo("="), dato2, this.generarHijo(";")];
        var instruccion = this.generarPrduccion("Variables");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    };
    Arbol.prototype.generarVariables_1 = function () {
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
        var hijos = [this.pila.pop(), this.generarHijo(","), this.generarHijo(texto)];
        var instruccion = this.generarPrduccion("Variables2");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    };
    Arbol.prototype.generarValorAM = function (texto) {
        var dato2 = this.pila.pop();
        var hijos = [this.generarHijo(texto), this.generarHijo("["), this.pila.pop(), this.generarHijo("]"), this.generarHijo("["), this.pila.pop(), this.generarHijo("]")];
        var instruccion = this.generarPrduccion("Valor");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    };
    Arbol.prototype.generarPrint = function (texto) {
        var hijos = [this.generarHijo(texto), this.generarHijo("("), this.pila.pop(), this.generarHijo(")"), this.generarHijo(";")];
        var instruccion = this.generarPrduccion(texto);
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    };
    Arbol.prototype.generarPrint2 = function (texto) {
        var hijos = [this.generarHijo(texto), this.generarHijo("("), this.generarHijo(")"), this.generarHijo(";")];
        var instruccion = this.generarPrduccion(texto);
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
        var hijos = [this.generarHijo("{"), this.pila.pop(), this.generarHijo("}")];
        var instruccion = this.generarPrduccion("Entorno");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    };
    Arbol.prototype.generarIf = function () {
        var dato3 = this.pila.pop();
        var dato2 = this.pila.pop();
        var hijos = [this.generarHijo("If"), this.generarHijo("("), this.pila.pop(), this.generarHijo(")"), dato2, dato3];
        var instruccion = this.generarPrduccion("If");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    };
    Arbol.prototype.generarElse = function () {
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
        var dato4 = this.pila.pop();
        var dato3 = this.pila.pop();
        var dato2 = this.pila.pop();
        var hijos = [this.generarHijo("For"), this.generarHijo("("), this.pila.pop(), dato2, this.generarHijo(";"), dato3, this.generarHijo(")"), dato4];
        var instruccion = this.generarPrduccion("Ciclo");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    };
    Arbol.prototype.generarWhile = function () {
        var dato2 = this.pila.pop();
        var hijos = [this.generarHijo("While"), this.generarHijo("("), this.pila.pop(), this.generarHijo(")"), dato2];
        var instruccion = this.generarPrduccion("Ciclo");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    };
    Arbol.prototype.generarDWhile = function () {
        var dato2 = this.pila.pop();
        var hijos = [this.generarHijo("Do"), this.pila.pop(), this.generarHijo("While"), this.generarHijo("("), dato2, this.generarHijo(")"), this.generarHijo(";")];
        var instruccion = this.generarPrduccion("Ciclo");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    };
    Arbol.prototype.generarParam = function () {
        var hijos = [this.pila.pop()];
        var instruccion = this.generarPrduccion("Param1");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    };
    Arbol.prototype.generarParam1 = function () {
        var hijos = [this.pila.pop(), this.generarHijo(";")];
        var instruccion = this.generarPrduccion("Param1");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    };
    Arbol.prototype.generarHijo = function (texto) {
        var hijo = new NodoArbol(texto, this.contador);
        hijo.nodo = "n".concat(this.contador, "[label=\"").concat(texto, "\"];<br>");
        this.contador++;
        return hijo;
    };
    Arbol.prototype.generarPrduccion = function (texto) {
        var hijo = new NodoArbol(texto, this.contador);
        hijo.nodo = "n".concat(this.contador, "[label=\"").concat(texto, "\", style=filled];<br>");
        this.contador++;
        return hijo;
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
