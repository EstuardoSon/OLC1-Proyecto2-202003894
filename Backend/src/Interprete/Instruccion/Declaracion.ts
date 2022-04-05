import { Expresion } from "../Expresion/Expresion";
import { Type } from "../Expresion/Retorno";
import { Ambito } from "../Extra/Ambito";
import {Instruccion} from "../Instruccion/Instruccion";

export class Declaracion extends Instruccion {
    constructor(linea: number, columna: number, public nombre:string, public valor:Expresion){
        super(linea, columna);
    }

    public ejecutar(ambito: Ambito) {
        const valorAnterior = this.valor.ejecutar();
        ambito.setVal(this.nombre, valorAnterior.value, valorAnterior.type, this.linea, this.columna)
    }

    public setValor(valor:Expresion){
        this.valor = valor;
    }

    public realizarComprobacion(tipo:Type){
        if(this.valor != null){
            if(this.valor.ejecutar().type == tipo){
                return true;
            }
            return false;
        } else {
            return true;
        }
    }
}