export class Arbol {
    public dot: string = "";
    public nodos: string = "";
    public enlaces: string = "";
    public contador: number = 0;
    public pila: Array<NodoArbol> = [];

    constructor() {
    }

    public generarEnlaces(raiz: NodoArbol) {
        this.nodos += raiz.nodo + "\n"
        if (raiz.hijos != null) {
            for (let hijo of raiz.hijos) {
                if (hijo != null) {
                    this.enlaces += `n${raiz.numero} -> n${hijo.numero} ;`
                    this.generarEnlaces(hijo);
                }
            }
        }
    }

    public generarIni() {
        const instruccion = this.generarPrduccion("ini");
        instruccion.hijos = [this.pila.pop()];

        this.generarEnlaces(instruccion);

        this.dot = "digraph G {<br>" + this.nodos + this.enlaces + "<br>}"
    }

    public generarTipoInstruccion() {
        const hijos = [this.pila.pop()]
        const instruccion = this.generarPrduccion("TipoInstruccion");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    }

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

    public generarDeclaraciones() {
        const dato2 = this.pila.pop();
        const hijos = [this.pila.pop(), dato2]
        const instruccion = this.generarPrduccion("Declaraciones");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    }

    public generarDeclaraciones1(texto: string) {
        const dato2 = this.pila.pop();
        const hijos = [this.pila.pop(), this.generarHijo(texto), this.generarHijo("["), this.generarHijo("]"), this.generarHijo("["), this.generarHijo("]"), this.generarHijo("="), this.generarHijo("["), dato2, this.generarHijo("]"), this.generarHijo(";")]
        const instruccion = this.generarPrduccion("Declaraciones");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    }

    public generarDeclaraciones2(texto: string) {
        const dato4 = this.pila.pop();
        const dato3 = this.pila.pop();
        const dato2 = this.pila.pop();
        const hijos = [this.pila.pop(), this.generarHijo(texto), this.generarHijo("["), this.generarHijo("]"), this.generarHijo("["), this.generarHijo("]"), this.generarHijo("="), this.generarHijo("new"), dato2, this.generarHijo("["), dato3, this.generarHijo("]"), this.generarHijo("["), dato4, this.generarHijo("]"), this.generarHijo(";")]
        const instruccion = this.generarPrduccion("Declaraciones");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    }

    public generarDeclaraciones3(texto: string) {
        const dato2 = this.pila.pop();
        const hijos = [this.pila.pop(), this.generarHijo(texto), this.generarHijo("["), this.generarHijo("]"), this.generarHijo("="), this.generarHijo("["), dato2, this.generarHijo("]"), this.generarHijo(";")]
        const instruccion = this.generarPrduccion("Declaraciones");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    }

    public generarDeclaraciones4(texto: string) {
        const dato3 = this.pila.pop();
        const dato2 = this.pila.pop();
        const hijos = [this.pila.pop(), this.generarHijo(texto), this.generarHijo("["), this.generarHijo("]"), this.generarHijo("="), this.generarHijo("new"), dato2, this.generarHijo("["), dato3, this.generarHijo("]"), this.generarHijo(";")]
        const instruccion = this.generarPrduccion("Declaraciones");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    }

    public generarDeclaraciones5(texto: string) {
        const dato2 = this.pila.pop();
        const hijos = [this.pila.pop(), this.generarHijo(texto), this.generarHijo("["), this.generarHijo("]"), this.generarHijo("="), this.generarHijo("toCharArray"), this.generarHijo("("), dato2, this.generarHijo(")"), this.generarHijo(";")]
        const instruccion = this.generarPrduccion("Declaraciones");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    }

    public generarListaValores() {
        const hijos = [this.pila.pop()]
        const instruccion = this.generarPrduccion("ListaValores");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    }

    public generarListaValores2() {
        const dato2 = this.pila.pop();
        const hijos = [this.pila.pop(), this.generarHijo(","), dato2]
        const instruccion = this.generarPrduccion("ListaValores");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    }

    public generarListaVectores() {
        const hijos = [this.generarHijo("["), this.pila.pop(), this.generarHijo("]")]
        const instruccion = this.generarPrduccion("ListaVectores");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    }

    public generarListaVectores2() {
        const dato2 = this.pila.pop();
        const hijos = [this.pila.pop(), this.generarHijo(","), this.generarHijo("["), dato2, this.generarHijo("]")]
        const instruccion = this.generarPrduccion("ListaVectores");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    }

    public generarInicializacion(texto: string, tipo: string) {
        const hijos = [this.generarHijo(texto), this.generarHijo(tipo)]
        const instruccion = this.generarPrduccion("Inicializacion");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    }

    public generarInicializacion2(texto: string, tipo: string) {
        const hijos = [this.generarHijo(texto), this.generarHijo("["), this.pila.pop(), this.generarHijo("]"), this.generarHijo(tipo)]
        const instruccion = this.generarPrduccion("Inicializacion");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    }

    public generarInicializacion3(texto: string, tipo: string) {
        const dato2 = this.pila.pop();
        const hijos = [this.generarHijo(texto), this.generarHijo("["), this.pila.pop(), this.generarHijo("]"), this.generarHijo("["), dato2, this.generarHijo("]"), this.generarHijo(tipo)]
        const instruccion = this.generarPrduccion("Inicializacion");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    }

    public generarInicializacion4(texto: string) {
        const hijos = [this.generarHijo(texto), this.generarHijo("="), this.pila.pop()]
        const instruccion = this.generarPrduccion("Inicializacion");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    }

    public generarInicializacion5(texto: string) {
        const dato2 = this.pila.pop();
        const hijos = [this.generarHijo(texto), this.generarHijo("["), this.pila.pop(), this.generarHijo("]"), this.generarHijo("="), dato2]
        const instruccion = this.generarPrduccion("Inicializacion");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    }

    public generarInicializacion6(texto: string) {
        const dato3 = this.pila.pop();
        const dato2 = this.pila.pop();
        const hijos = [this.generarHijo(texto), this.generarHijo("["), this.pila.pop(), this.generarHijo("]"), this.generarHijo("["), dato2, this.generarHijo("]"), this.generarHijo("="), dato3]
        const instruccion = this.generarPrduccion("Inicializacion");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    }

    public generarTipoInstruccion2() {
        const hijos = [this.pila.pop(), this.generarHijo(";")]
        const instruccion = this.generarPrduccion("TipoInstruccion");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    }

    public generarInstrucciones() {
        const hijos = [this.pila.pop()]
        const instruccion = this.generarPrduccion("Instrucciones");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    }

    public generarInstrucciones2() {
        const dato2 = this.pila.pop()
        const hijos = [this.pila.pop(), dato2]
        const instruccion = this.generarPrduccion("Instrucciones");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    }

    public generarBreak(texto: string) {
        const hijos = [this.generarHijo(texto), this.generarHijo(";")]
        const instruccion = this.generarPrduccion("Break");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    }

    public generarTipoVar(texto: string) {
        const hijos = [this.generarHijo(texto)]
        const instruccion = this.generarPrduccion("TipoVar");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    }

    public generarValorOperacion(texto: string) {
        const dato2 = this.pila.pop()
        const hijos = [this.pila.pop(), this.generarHijo(texto), dato2]
        const instruccion = this.generarPrduccion("Valor");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    }

    public generarValorOperacionU(texto: string) {
        const hijos = [this.generarHijo(texto), this.pila.pop()]
        const instruccion = this.generarPrduccion("Valor");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    }

    public generarValorFuncion(texto: string) {
        const hijos = [this.generarHijo(texto), this.generarHijo("("), this.pila.pop(), this.generarHijo(")")]
        const instruccion = this.generarPrduccion("Valor");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    }

    public generarValorPar() {
        const hijos = [this.generarHijo("("), this.pila.pop(), this.generarHijo(")")]
        const instruccion = this.generarPrduccion("Valor");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    }

    public generarValor(texto: string) {
        const hijos = [this.generarHijo(texto)]
        const instruccion = this.generarPrduccion("Valor");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    }

    public generarValorCasteo() {
        const dato2 = this.pila.pop()
        const hijos = [this.generarHijo("("), this.pila.pop(), this.generarHijo(")"), dato2]
        const instruccion = this.generarPrduccion("Valor");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    }

    public generarValorT() {
        const dato3 = this.pila.pop()
        const dato2 = this.pila.pop()
        const hijos = [this.pila.pop(), this.generarHijo("?"), dato2, this.generarHijo(":"), dato3]
        const instruccion = this.generarPrduccion("Valor");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    }

    public generarINCDEC(texto: string) {
        const hijos = [this.pila.pop(), this.generarHijo(texto)]
        const instruccion = this.generarPrduccion("Valor");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    }

    public generarValorA(texto: string) {
        const hijos = [this.generarHijo(texto)]
        const instruccion = this.generarPrduccion("Valor");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    }

    public generarValorAV(texto: string) {
        const hijos = [this.generarHijo(texto), this.generarHijo("["), this.pila.pop(), this.generarHijo("]")]
        const instruccion = this.generarPrduccion("Valor");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    }

    public generarVariables() {
        const dato2 = this.pila.pop();
        const hijos = [this.pila.pop(), this.generarHijo("="), dato2, this.generarHijo(";")]
        const instruccion = this.generarPrduccion("Variables");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    }

    public generarVariables_1() {
        const hijos = [this.pila.pop(), this.generarHijo(";")]
        const instruccion = this.generarPrduccion("Variables");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    }

    public generarVariables2_(texto: string) {
        const hijos = [this.generarHijo(texto)]
        const instruccion = this.generarPrduccion("Variables2");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    }

    public generarVariables2_1(texto: string) {
        const hijos = [this.pila.pop(), this.generarHijo(","), this.generarHijo(texto)]
        const instruccion = this.generarPrduccion("Variables2");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    }

    public generarValorAM(texto: string) {
        const dato2 = this.pila.pop();
        const hijos = [this.generarHijo(texto), this.generarHijo("["), this.pila.pop(), this.generarHijo("]"), this.generarHijo("["), this.pila.pop(), this.generarHijo("]")]
        const instruccion = this.generarPrduccion("Valor");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    }

    public generarPrint(texto: string) {
        const hijos = [this.generarHijo(texto), this.generarHijo("("), this.pila.pop(), this.generarHijo(")"), this.generarHijo(";")]
        const instruccion = this.generarPrduccion(texto);
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    }

    public generarPrint2(texto: string) {
        const hijos = [this.generarHijo(texto), this.generarHijo("("), this.generarHijo(")"), this.generarHijo(";")]
        const instruccion = this.generarPrduccion(texto);
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    }

    public generarEntorno() {
        const hijos = [this.generarHijo("{"), this.generarHijo("}")]
        const instruccion = this.generarPrduccion("Entorno");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    }

    public generarEntorno2() {
        const hijos = [this.generarHijo("{"), this.pila.pop(), this.generarHijo("}")]
        const instruccion = this.generarPrduccion("Entorno");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    }

    public generarIf() {
        const dato3 = this.pila.pop();
        const dato2 = this.pila.pop();
        const hijos = [this.generarHijo("If"), this.generarHijo("("), this.pila.pop(), this.generarHijo(")"), dato2, dato3]
        const instruccion = this.generarPrduccion("If");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    }

    public generarElse() {
        const hijos = [this.generarHijo("Else"), this.pila.pop()]
        const instruccion = this.generarPrduccion("Else");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    }

    public generarElse2() {
        const instruccion = this.generarPrduccion("Else");
        instruccion.insertarHijos([this.generarHijo("Epsilon")]);
        this.pila.push(instruccion);
    }

    public generarFor() {
        const dato4 = this.pila.pop();
        const dato3 = this.pila.pop();
        const dato2 = this.pila.pop();
        const hijos = [this.generarHijo("For"), this.generarHijo("("), this.pila.pop(), dato2, this.generarHijo(";"), dato3, this.generarHijo(")"), dato4]
        const instruccion = this.generarPrduccion("Ciclo");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    }

    public generarWhile() {
        const dato2 = this.pila.pop();
        const hijos = [this.generarHijo("While"), this.generarHijo("("), this.pila.pop(), this.generarHijo(")"), dato2]
        const instruccion = this.generarPrduccion("Ciclo");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    }

    public generarDWhile() {
        const dato2 = this.pila.pop();
        const hijos = [this.generarHijo("Do"), this.pila.pop(), this.generarHijo("While"), this.generarHijo("("), dato2, this.generarHijo(")"), this.generarHijo(";")]
        const instruccion = this.generarPrduccion("Ciclo");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    }

    public generarParam() {
        const hijos = [this.pila.pop()]
        const instruccion = this.generarPrduccion("Param1");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    }

    public generarParam1() {
        const hijos = [this.pila.pop(), this.generarHijo(";")]
        const instruccion = this.generarPrduccion("Param1");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    }

    public generarHijo(texto: string) {
        const hijo = new NodoArbol(texto, this.contador);
        hijo.nodo = `n${this.contador}[label="${texto}"];<br>`
        this.contador++;
        return hijo;
    }

    public generarPrduccion(texto: string) {
        const hijo = new NodoArbol(texto, this.contador);
        hijo.nodo = `n${this.contador}[label="${texto}", style=filled];<br>`
        this.contador++;
        return hijo;
    }

    public Reiniciar() {
        this.dot = "";
        this.nodos = "";
        this.enlaces = "";
        this.contador = 0;
        this.pila = [];
    }
}

export class NodoArbol {
    public hijos: Array<NodoArbol>;
    public nodo: string = "";
    constructor(public texto: string, public numero: number) {
    }

    public insertarHijos(hijos: Array<NodoArbol>) {
        this.hijos = hijos;
    }
}