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