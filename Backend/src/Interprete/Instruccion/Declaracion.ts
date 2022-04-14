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
            ambito.setVal(this.nombre, null, this.tipoVariable, this.linea, this.columna)   
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
        ambito.modVal(String(this.nombre).toLowerCase(), value.value, value.type, this.linea, this.columna)
    }
}