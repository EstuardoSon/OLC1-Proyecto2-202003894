import { ErrorE } from "../Error/Error";
import { Expresion } from "../Expresion/Expresion";
import { Ambito } from "../Extra/Ambito";
import { Instruccion } from "../Instruccion/Instruccion";
var Impresion = require("../Grammar/grammar"); 

export class Print extends Instruccion {
    constructor(linea: number, columna: number, public valor:Expresion){
        super(linea, columna);
    }

    public ejecutar(ambito: Ambito) {
            let dato = this.valor.ejecutar(ambito)
            if(dato.value!=null){
                Impresion.Impresion += dato.value.toString()
            }else{
                Impresion.Impresion += "Null"
            }
    }
}

export class Println extends Instruccion {
    constructor(linea: number, columna: number, public valor:Expresion){
        super(linea, columna);
    }

    public ejecutar(ambito: Ambito) {
        let dato = this.valor.ejecutar(ambito)
        if(dato.value!=null){
            Impresion.Impresion += dato.value.toString()+"\n"
        }else{
            Impresion.Impresion += "Null"+"\n"
        }
    }
}