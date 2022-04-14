import { Expresion } from "../Expresion/Expresion";
import { Ambito } from "../Extra/Ambito";
import { Instruccion } from "./Instruccion";

export class BREAK extends Instruccion{
    constructor(private tipo:string ,linea: number, columna: number){
        super(linea, columna);
    }

    public ejecutar(ambito: Ambito) {
        return {type: this.tipo, line: this.linea, column: this.columna}
    }
}

export class RETURN extends Instruccion{
    constructor(private valor: Expresion, linea: number, columna: number){
        super(linea, columna);
    }

    public ejecutar(ambito: Ambito) {
        if (this.valor != null){
            const verValor = this.valor.ejecutar(ambito);
            return {type: "Return", value: verValor, line: this.linea, column: this.columna}
        }
        return {type: "Return", value: null, line: this.linea, column: this.columna}
    }
}