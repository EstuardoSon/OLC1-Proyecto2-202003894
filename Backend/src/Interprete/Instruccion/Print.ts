import { Expresion } from "../Expresion/Expresion";
import { Type } from "../Expresion/Retorno";
import { Ambito } from "../Extra/Ambito";
import {Instruccion} from "../Instruccion/Instruccion";

export class Print extends Instruccion {
    constructor(linea: number, columna: number, public valores:Expresion[]){
        super(linea, columna);
    }

    public ejecutar(ambito: Ambito) {
        for(let valor of this.valores){
            let dato = valor.ejecutar()
        }
    }
}