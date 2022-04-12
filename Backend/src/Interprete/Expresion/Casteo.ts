import { ErrorE } from "../Error/Error";
import { Ambito } from "../Extra/Ambito";
import { Expresion } from "./Expresion";
import { Retorno, Type } from "./Retorno";


export class Casteo extends Expresion {
    constructor(private valor: Expresion, private tipo: Type, linea: number, columna: number) {
        super(linea, columna);
    }

    public ejecutar(ambito: Ambito): Retorno {
        const value = this.valor.ejecutar(ambito)

        if (typeof(value.value) == 'object'){ throw new ErrorE(this.linea, this.columna, 'Semantico', `No es posible operar ya que ${value.value} no es un dato primitivo`) }

        if (this.tipo == 0) {
            if (value.type == 0) {
                return { value: value.value, type: value.type }
            }
            else if (value.type == 1) {
                return { value: Math.round(value.value), type: 0 }
            }
            else if (value.type == 3) {
                return { value: String(value.value).charCodeAt(0), type: 0 }
            }
            throw new ErrorE(this.linea, this.columna, 'Semantico', 'No es posible hacer el casteo de: '+ value.value +" a Int");
        }
        else if (this.tipo == 1) {
            if (value.type == 0) {
                return { value: value.value, type: 1 }
            }
            else if (value.type == 1) {
                return { value: value.value, type: value.type }
            }
            else if (value.type == 3) {
                return { value: String(value.value).charCodeAt(0), type: 1 }
            }
            throw new ErrorE(this.linea, this.columna, 'Semantico', 'No es posible hacer el casteo de: '+ value.value +" a Double");
        }
        else if (this.tipo == 3) {
            if (value.type == 0) {
                return { value: String.fromCharCode(value.value), type: 3 }
            }
            throw new ErrorE(this.linea, this.columna, 'Semantico', 'No es posible hacer el casteo de: '+ value.value +" a Char");
        }
        else if (this.tipo == 4) {
            if (value.type == 0) {
                return { value: String(value.value), type: 4 }
            }
            else if (value.type == 1) {
                return { value: String(value.value), type: 4 }
            }
            throw new ErrorE(this.linea, this.columna, 'Semantico', 'No es posible hacer el casteo de: '+ value.value +" a String");
        }
        throw new ErrorE(this.linea, this.columna, 'Semantico', 'No es posible hacer el casteo de: '+ value.value);
    }
}