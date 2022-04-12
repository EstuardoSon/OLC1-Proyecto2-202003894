import { ErrorE } from "../Error/Error";
import { Expresion } from "../Expresion/Expresion";
import { Type } from "../Expresion/Retorno";
import { Ambito } from "../Extra/Ambito";
import {Instruccion} from "../Instruccion/Instruccion";

export class Declaracion extends Instruccion {
    constructor(linea: number, columna: number, public nombre:string, public valor:Expresion, public tipoVariable: Type){
        super(linea, columna);
    }

    public ejecutar(ambito: Ambito) {
        if(this.valor != null){
            let value = this.valor.ejecutar(ambito);
            
            if(this.realizarComprobacion(value.type)){
                ambito.setVal(this.nombre, value.value, value.type, this.linea, this.columna)
            }
        }
        else{
            let valorDefecto = null;
            if(this.tipoVariable == 0 || this.tipoVariable == 1){ valorDefecto = 0 }
            else if (this.tipoVariable == 2) { valorDefecto = false }
            else if (this.tipoVariable == 3) { valorDefecto = '\u0000' }
            else if(this.tipoVariable == 4){ valorDefecto = null }

            ambito.setVal(this.nombre, valorDefecto, this.tipoVariable, this.linea, this.columna)   
        }    
    }

    public realizarComprobacion(tipo:Type){
        if(this.valor != null){
            if(this.tipoVariable == tipo){
                return true;
            }
            throw new ErrorE(this.linea, this.columna, 'Semantico', "No es posible la asignacion de la variable: " + this.nombre +", ya que su valor no es el adecuado")
        } else {
            return false;
        }
    }
}

export class Inicializacion extends Instruccion {
    constructor(linea: number, columna: number, public nombre:string, public valor:Expresion){
        super(linea, columna);
    }

    public ejecutar(ambito: Ambito) {
        let value = this.valor.ejecutar(ambito);
        ambito.modVal(this.nombre, value.value, value.type, this.linea, this.columna)
    }
}