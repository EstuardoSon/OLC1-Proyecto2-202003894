import { ErrorE } from "../Error/Error";
import { Ambito } from "../Extra/Ambito";
import { Expresion } from "./Expresion";
import { Retorno } from "./Retorno";

export class Llamado extends Expresion {
    constructor(private nombre: string, linea: number, columna: number) {
        super(linea, columna)
    }

    public ejecutar(ambito: Ambito): Retorno {
        const value = ambito.getVal(this.nombre)
        if (value != null) {
            if(value.valor != null){
                return { value: value.valor, type: value.tipo }
            }
            throw new ErrorE(this.linea, this.columna, 'Semantico', 'Variable ' + this.nombre + ' declarada pero no inicializada'); 
        }
        else {
            throw new ErrorE(this.linea, this.columna, 'Semantico', 'No existe una declaracion de la variable ' + this.nombre + '');
        }
    }
}