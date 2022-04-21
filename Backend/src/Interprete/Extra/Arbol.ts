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
                    this.enlaces += `n${raiz.numero} -> n${hijo.numero}; \n`
                    this.generarEnlaces(hijo);
                }
            }
        }
    }

    public generarIni() {
        const instruccion = this.generarPrduccion("ini");
        instruccion.hijos = this.pila;

        this.generarEnlaces(instruccion);

        this.dot = "digraph G {\n" + this.nodos + this.enlaces + "\n}"
    }

    public generarTipoInstruccion() {
        let comprobacion = true
        while (comprobacion) {
            if (this.pila.length != 0) {
                if (!(this.pila[this.pila.length - 1].texto == "Declaraciones") && !(this.pila[this.pila.length - 1].texto == "Print") && !(this.pila[this.pila.length - 1].texto == "If") && !(this.pila[this.pila.length - 1].texto == "Ciclo") && !(this.pila[this.pila.length - 1].texto == "Break") && !(this.pila[this.pila.length - 1].texto == "Switch") && !(this.pila[this.pila.length - 1].texto == "LlamadoFuncion") && !(this.pila[this.pila.length - 1].texto == "Run") && !(this.pila[this.pila.length - 1].texto == "FuncMetod")) {
                    this.pila.pop();
                }
                else { comprobacion = false }
            } else {
                comprobacion = false
            }
        }
        const hijos = [this.pila.pop()]
        const instruccion = this.generarPrduccion("TipoInstruccion");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    }

    public generarError() {
        const hijos = [this.generarHijo("Error")]
        const instruccion = this.generarPrduccion("TipoInstruccion");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    }

    public generarDeclaraciones() {
        this.comprobar("Variables")
        const dato2 = this.pila.pop();
        this.comprobar("TipoVar")
        const hijos = [this.pila.pop(), dato2]
        const instruccion = this.generarPrduccion("Declaraciones");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    }

    public generarDeclaraciones1(texto: string) {
        this.comprobar("ListaVectores")
        const dato2 = this.pila.pop();
        this.comprobar("TipoVar")
        const hijos = [this.pila.pop(), this.generarHijo(texto), this.generarHijo("["), this.generarHijo("]"), this.generarHijo("["), this.generarHijo("]"), this.generarHijo("="), this.generarHijo("["), dato2, this.generarHijo("]"), this.generarHijo(";")]
        const instruccion = this.generarPrduccion("Declaraciones");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    }

    public generarDeclaraciones2(texto: string) {
        this.comprobar("Valor")
        const dato4 = this.pila.pop();
        this.comprobar("Valor")
        const dato3 = this.pila.pop();
        this.comprobar("TipoVar")
        const dato2 = this.pila.pop();
        this.comprobar("TipoVar")
        const hijos = [this.pila.pop(), this.generarHijo(texto), this.generarHijo("["), this.generarHijo("]"), this.generarHijo("["), this.generarHijo("]"), this.generarHijo("="), this.generarHijo("new"), dato2, this.generarHijo("["), dato3, this.generarHijo("]"), this.generarHijo("["), dato4, this.generarHijo("]"), this.generarHijo(";")]
        const instruccion = this.generarPrduccion("Declaraciones");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    }

    public generarDeclaraciones3(texto: string) {
        this.comprobar("ListaValores")
        const dato2 = this.pila.pop();
        this.comprobar("TipoVar")
        const hijos = [this.pila.pop(), this.generarHijo(texto), this.generarHijo("["), this.generarHijo("]"), this.generarHijo("="), this.generarHijo("["), dato2, this.generarHijo("]"), this.generarHijo(";")]
        const instruccion = this.generarPrduccion("Declaraciones");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    }

    public generarDeclaraciones4(texto: string) {
        this.comprobar("Valor")
        const dato3 = this.pila.pop();
        this.comprobar("TipoVar")
        const dato2 = this.pila.pop();
        this.comprobar("TipoVar")
        const hijos = [this.pila.pop(), this.generarHijo(texto), this.generarHijo("["), this.generarHijo("]"), this.generarHijo("="), this.generarHijo("new"), dato2, this.generarHijo("["), dato3, this.generarHijo("]"), this.generarHijo(";")]
        const instruccion = this.generarPrduccion("Declaraciones");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    }

    public generarDeclaraciones5(texto: string) {
        this.comprobar("Valor")
        const dato2 = this.pila.pop();
        this.comprobar("TipoVar")
        const hijos = [this.pila.pop(), this.generarHijo(texto), this.generarHijo("["), this.generarHijo("]"), this.generarHijo("="), this.generarHijo("toCharArray"), this.generarHijo("("), dato2, this.generarHijo(")"), this.generarHijo(";")]
        const instruccion = this.generarPrduccion("Declaraciones");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    }

    public generarListaValores() {
        this.comprobar("Valor")
        const hijos = [this.pila.pop()]
        const instruccion = this.generarPrduccion("ListaValores");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    }

    public generarListaValores2() {
        this.comprobar("Valor")
        const dato2 = this.pila.pop();
        this.comprobar("ListaValores")
        const hijos = [this.pila.pop(), this.generarHijo(","), dato2]
        const instruccion = this.generarPrduccion("ListaValores");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    }

    public generarListaVectores() {
        this.comprobar("ListaValores")
        const hijos = [this.generarHijo("["), this.pila.pop(), this.generarHijo("]")]
        const instruccion = this.generarPrduccion("ListaVectores");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    }

    public generarListaVectores2() {
        this.comprobar("ListaValores")
        const dato2 = this.pila.pop();
        this.comprobar("ListaVectores")
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
        this.comprobar("Valor")
        const hijos = [this.generarHijo(texto), this.generarHijo("["), this.pila.pop(), this.generarHijo("]"), this.generarHijo(tipo)]
        const instruccion = this.generarPrduccion("Inicializacion");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    }

    public generarInicializacion3(texto: string, tipo: string) {
        this.comprobar("Valor")
        const dato2 = this.pila.pop();
        this.comprobar("Valor")
        const hijos = [this.generarHijo(texto), this.generarHijo("["), this.pila.pop(), this.generarHijo("]"), this.generarHijo("["), dato2, this.generarHijo("]"), this.generarHijo(tipo)]
        const instruccion = this.generarPrduccion("Inicializacion");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    }

    public generarInicializacion4(texto: string) {
        this.comprobar("Valor")
        const hijos = [this.generarHijo(texto), this.generarHijo("="), this.pila.pop()]
        const instruccion = this.generarPrduccion("Inicializacion");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    }

    public generarInicializacion5(texto: string) {
        this.comprobar("Valor")
        const dato2 = this.pila.pop();
        this.comprobar("Valor")
        const hijos = [this.generarHijo(texto), this.generarHijo("["), this.pila.pop(), this.generarHijo("]"), this.generarHijo("="), dato2]
        const instruccion = this.generarPrduccion("Inicializacion");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    }

    public generarInicializacion6(texto: string) {
        this.comprobar("Valor")
        const dato3 = this.pila.pop();
        this.comprobar("Valor")
        const dato2 = this.pila.pop();
        this.comprobar("Valor")
        const hijos = [this.generarHijo(texto), this.generarHijo("["), this.pila.pop(), this.generarHijo("]"), this.generarHijo("["), dato2, this.generarHijo("]"), this.generarHijo("="), dato3]
        const instruccion = this.generarPrduccion("Inicializacion");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    }

    public generarTipoInstruccion2() {
        this.comprobar("Inicializacion")
        const hijos = [this.pila.pop(), this.generarHijo(";")]
        const instruccion = this.generarPrduccion("TipoInstruccion");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    }

    public generarInstrucciones() {
        this.comprobar("TipoInstruccion")
        const hijos = [this.pila.pop()]
        const instruccion = this.generarPrduccion("Instrucciones");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    }

    public generarInstrucciones2() {
        this.comprobar("TipoInstruccion")
        const dato2 = this.pila.pop()
        this.comprobar("Instrucciones")
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

    public generarBreak1(texto: string) {
        this.comprobar("Valor");
        const hijos = [this.generarHijo(texto), this.pila.pop(), this.generarHijo(";")]
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
        this.comprobar("Valor")
        const dato2 = this.pila.pop()
        this.comprobar("Valor")
        const hijos = [this.pila.pop(), this.generarHijo(texto), dato2]
        const instruccion = this.generarPrduccion("Valor");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    }

    public generarValorOperacionU(texto: string) {
        this.comprobar("Valor")
        const hijos = [this.generarHijo(texto), this.pila.pop()]
        const instruccion = this.generarPrduccion("Valor");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    }

    public generarValorFuncion(texto: string) {
        this.comprobar("Valor")
        const hijos = [this.generarHijo(texto), this.generarHijo("("), this.pila.pop(), this.generarHijo(")")]
        const instruccion = this.generarPrduccion("Valor");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    }

    public generarValorPar() {
        this.comprobar("Valor")
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
        this.comprobar("Valor")
        const dato2 = this.pila.pop()
        this.comprobar("TipoVar")
        const hijos = [this.generarHijo("("), this.pila.pop(), this.generarHijo(")"), dato2]
        const instruccion = this.generarPrduccion("Valor");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    }

    public generarValorT() {
        this.comprobar("Valor")
        const dato3 = this.pila.pop()
        this.comprobar("Valor")
        const dato2 = this.pila.pop()
        this.comprobar("Valor")
        const hijos = [this.pila.pop(), this.generarHijo("?"), dato2, this.generarHijo(":"), dato3]
        const instruccion = this.generarPrduccion("Valor");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    }

    public generarINCDEC(texto: string) {
        this.comprobar("Valor")
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
        this.comprobar("Valor")
        const hijos = [this.generarHijo(texto), this.generarHijo("["), this.pila.pop(), this.generarHijo("]")]
        const instruccion = this.generarPrduccion("Valor");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    }

    public generarVariables() {
        this.comprobar("Valor")
        const dato2 = this.pila.pop();
        this.comprobar("Variables2")
        const hijos = [this.pila.pop(), this.generarHijo("="), dato2, this.generarHijo(";")]
        const instruccion = this.generarPrduccion("Variables");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    }

    public generarVariables_1() {
        this.comprobar("Variables2")
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
        this.comprobar("Variables2")
        const hijos = [this.pila.pop(), this.generarHijo(","), this.generarHijo(texto)]
        const instruccion = this.generarPrduccion("Variables2");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    }

    public generarValorAM(texto: string) {
        this.comprobar("Valor")
        const dato2 = this.pila.pop();
        this.comprobar("Valor")
        const hijos = [this.generarHijo(texto), this.generarHijo("["), this.pila.pop(), this.generarHijo("]"), this.generarHijo("["), dato2, this.generarHijo("]")]
        const instruccion = this.generarPrduccion("Valor");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    }

    public generarPrint(texto: string) {
        this.comprobar("Valor")
        const hijos = [this.generarHijo(texto), this.generarHijo("("), this.pila.pop(), this.generarHijo(")"), this.generarHijo(";")]
        const instruccion = this.generarPrduccion("Print");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    }

    public generarPrint2(texto: string) {
        const hijos = [this.generarHijo(texto), this.generarHijo("("), this.generarHijo(")"), this.generarHijo(";")]
        const instruccion = this.generarPrduccion("Print");
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
        this.comprobar("Instrucciones")
        const hijos = [this.generarHijo("{"), this.pila.pop(), this.generarHijo("}")]
        const instruccion = this.generarPrduccion("Entorno");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    }

    public generarIf() {
        this.comprobar("Else")
        const dato3 = this.pila.pop();
        this.comprobar("Entorno")
        const dato2 = this.pila.pop();
        this.comprobar("Valor")
        const hijos = [this.generarHijo("If"), this.generarHijo("("), this.pila.pop(), this.generarHijo(")"), dato2, dato3]
        const instruccion = this.generarPrduccion("If");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    }

    public generarElse() {
        this.comprobar2("Entorno", "If")
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
        this.comprobar("Entorno")
        const dato4 = this.pila.pop();
        this.comprobar("Inicializacion")
        const dato3 = this.pila.pop();
        this.comprobar("Valor")
        const dato2 = this.pila.pop();
        this.comprobar("Param1")
        const hijos = [this.generarHijo("For"), this.generarHijo("("), this.pila.pop(), dato2, this.generarHijo(";"), dato3, this.generarHijo(")"), dato4]
        const instruccion = this.generarPrduccion("Ciclo");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    }

    public generarWhile() {
        this.comprobar("Entorno")
        const dato2 = this.pila.pop();
        this.comprobar("Valor")
        const hijos = [this.generarHijo("While"), this.generarHijo("("), this.pila.pop(), this.generarHijo(")"), dato2]
        const instruccion = this.generarPrduccion("Ciclo");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    }

    public generarDWhile() {
        this.comprobar("Valor")
        const dato2 = this.pila.pop();
        this.comprobar("Entorno")
        const hijos = [this.generarHijo("Do"), this.pila.pop(), this.generarHijo("While"), this.generarHijo("("), dato2, this.generarHijo(")"), this.generarHijo(";")]
        const instruccion = this.generarPrduccion("Ciclo");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    }

    public generarParam() {
        this.comprobar("Declaraciones")
        const hijos = [this.pila.pop()]
        const instruccion = this.generarPrduccion("Param1");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    }

    public generarParam1() {
        this.comprobar("Inicializacion")
        const hijos = [this.pila.pop(), this.generarHijo(";")]
        const instruccion = this.generarPrduccion("Param1");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    }

    public generarCasos() {
        this.comprobar("Instrucciones")
        const dato2 = this.pila.pop()
        this.comprobar("Valor")
        const hijos = [this.generarHijo("Case"), this.pila.pop(), this.generarHijo(":"), dato2]
        const instruccion = this.generarPrduccion("Casos");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    }

    public generarCasos2() {
        this.comprobar("Instrucciones")
        const dato3 = this.pila.pop()
        this.comprobar("Valor")
        const dato2 = this.pila.pop()
        this.comprobar("Casos")
        const hijos = [this.pila.pop(), this.generarHijo("Case"), dato2, this.generarHijo(":"), dato3]
        const instruccion = this.generarPrduccion("Casos");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    }

    public generarEntornoS() {
        this.comprobar("Instrucciones")
        const dato2 = this.pila.pop()
        this.comprobar("Casos")
        const hijos = [this.pila.pop(), this.generarHijo("Default"), this.generarHijo(":"), dato2]
        const instruccion = this.generarPrduccion("EntornoS");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    }

    public generarEntornoS2() {
        this.comprobar("Casos")
        const hijos = [this.pila.pop()]
        const instruccion = this.generarPrduccion("EntornoS");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    }

    public generarEntornoS3() {
        this.comprobar("Instrucciones")
        const hijos = [this.generarHijo("Default"), this.generarHijo(":"), this.pila.pop()]
        const instruccion = this.generarPrduccion("EntornoS");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    }

    public generarEntornoS4() {
        const hijos = [this.generarHijo("Default"), this.generarHijo(":")]
        const instruccion = this.generarPrduccion("EntornoS");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    }

    public generarSwitch() {
        this.comprobar("EntornoS")
        const dato2 = this.pila.pop()
        this.comprobar("Valor")
        const hijos = [this.generarHijo("Switch"), this.generarHijo("("), this.pila.pop(), this.generarHijo(")"), this.generarHijo("{"), dato2, this.generarHijo("}")]
        const instruccion = this.generarPrduccion("Switch");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    }

    public generarLlamado(nombre: string) {
        this.comprobar("ListaValores")
        const hijos = [this.generarHijo(nombre), this.generarHijo("("), this.pila.pop(), this.generarHijo(")"), this.generarHijo(";")]
        const instruccion = this.generarPrduccion("LlamadoFuncion");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    }

    public generarLlamado1(nombre: string) {
        const hijos = [this.generarHijo(nombre), this.generarHijo("("), this.generarHijo(")"), this.generarHijo(";")]
        const instruccion = this.generarPrduccion("LlamadoFuncion");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    }

    public generarRun() {
        this.comprobar("LlamadoFuncion")
        const hijos = [this.generarHijo("Run"), this.pila.pop()]
        const instruccion = this.generarPrduccion("Run");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    }

    public generarLParam(nombre: string) {
        this.comprobar("TipoVar")
        let dato2 = this.pila.pop();
        this.comprobar("ListaParametros")
        const hijos = [this.pila.pop(), this.generarHijo(","), dato2, this.generarHijo(nombre)]
        const instruccion = this.generarPrduccion("ListaParametros");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    }

    public generarLParam1(nombre: string) {
        this.comprobar("TipoVar")
        const hijos = [this.pila.pop(), this.generarHijo(nombre)]
        const instruccion = this.generarPrduccion("ListaParametros");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    }

    public generarTipoFunc() {
        this.comprobar("TipoVar")
        const hijos = [this.generarHijo(":"), this.pila.pop()]
        const instruccion = this.generarPrduccion("TipoFunc");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    }

    public generarTipoFunc1() {
        const hijos = [this.generarHijo(":"), this.generarHijo("void")]
        const instruccion = this.generarPrduccion("TipoFunc");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    }

    public generarTipoFunc2() {
        const hijos = [this.generarHijo("--")]
        const instruccion = this.generarPrduccion("TipoFunc");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    }

    public generarFuncMetod(nombre: string) {
        this.comprobar("Instrucciones")
        let dato3 = this.pila.pop()
        this.comprobar("TipoFunc")
        let dato2 = this.pila.pop()
        this.comprobar("ListaParametros")
        const hijos = [this.generarHijo(nombre), this.generarHijo("("), this.pila.pop(), this.generarHijo(")"), dato2, this.generarHijo("{"), dato3, this.generarHijo("}")]
        const instruccion = this.generarPrduccion("FuncMetod");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    }

    public generarFuncMetod1(nombre: string) {
        this.comprobar("Instrucciones")
        let dato2 = this.pila.pop()
        this.comprobar("TipoFunc")
        const hijos = [this.generarHijo(nombre), this.generarHijo("("), this.generarHijo(")"), this.pila.pop(), this.generarHijo("{"), dato2, this.generarHijo("}")]
        const instruccion = this.generarPrduccion("FuncMetod");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    }

    public generarLlamadoV(nombre: string) {
        this.comprobar("ListaValores")
        const hijos = [this.generarHijo(nombre), this.generarHijo("("), this.pila.pop(), this.generarHijo(")")]
        const instruccion = this.generarPrduccion("Valor");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    }

    public generarLlamado1V(nombre: string) {
        const hijos = [this.generarHijo(nombre), this.generarHijo("("), this.generarHijo(")")]
        const instruccion = this.generarPrduccion("Valor");
        instruccion.insertarHijos(hijos);
        this.pila.push(instruccion);
    }

    public generarHijo(texto: string) {
        const hijo = new NodoArbol(texto, this.contador);
        hijo.nodo = `n${this.contador}[label="${texto}"];`
        this.contador++;
        return hijo;
    }

    public generarPrduccion(texto: string) {
        const hijo = new NodoArbol(texto, this.contador);
        hijo.nodo = `n${this.contador}[label="${texto}", style=filled];`
        this.contador++;
        return hijo;
    }

    public comprobar(Anterior: string) {
        let comprobacion = true
        while (comprobacion) {
            if (this.pila.length != 0) {
                if (!(this.pila[this.pila.length - 1].texto == Anterior)) {
                    console.log(this.pila.pop());
                    console.log(Anterior);
                }
                else { comprobacion = false }
            } else {
                comprobacion = false
            }
        }
    }

    public comprobar2(Anterior: string, Anterior2: string) {
        let comprobacion = true
        while (comprobacion) {
            if (this.pila.length != 0) {
                if (!(this.pila[this.pila.length - 1].texto == Anterior) && !(this.pila[this.pila.length - 1].texto == Anterior2)) {
                    this.pila.pop();
                }
                else { comprobacion = false }
            } else {
                comprobacion = false
            }
        }
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