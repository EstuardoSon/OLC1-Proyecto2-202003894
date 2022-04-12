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
            if((value.valor == null && value.tipo==4) || (value.valor == '\u0000' && value.tipo==3)){
                throw new ErrorE(this.linea, this.columna, 'Semantico', 'La variable: ' + this.nombre + ' no tiene un valor asignado');
            }
            return { value: value.valor, type: value.tipo }
        }
        else {
            throw new ErrorE(this.linea, this.columna, 'Semantico', 'No existe una declaracion de la variable primitiva: ' + this.nombre + '');
        }
    }
}

export class LlamadoM extends Expresion {
    constructor(private nombre: string, private fila: Expresion, private celda: Expresion, linea: number, columna: number) {
        super(linea, columna)
    }

    public ejecutar(ambito: Ambito): Retorno {
        const filaV = this.fila.ejecutar(ambito)
        const columnV = this.celda.ejecutar(ambito)

        const value = ambito.getVal(this.nombre)

        if (filaV.type != 0) { throw new ErrorE(this.linea, this.columna, 'Semantico', 'El valor ingresado en la Fila no es un entero'); }
        if (columnV.type != 0) { throw new ErrorE(this.linea, this.columna, 'Semantico', 'El valor ingresado en la Columna no es un entero'); }

        if (value != null) {
            if (columnV.value < 0 || columnV.value >= value.valor.length) { throw new ErrorE(this.linea, this.columna, 'Semantico', 'El Indice ingresado en Columna no existe en: ' + this.nombre); }
        if (filaV.value < 0 || filaV.value >= value.valor[0].length) { throw new ErrorE(this.linea, this.columna, 'Semantico', 'El Indice ingresado en Fila no existe en: ' + this.nombre); }

            if((value.valor[filaV.value][columnV.value] == null && value.tipo==4) || (value.valor[filaV.value][columnV.value] == '\u0000' && value.tipo==3)){
                throw new ErrorE(this.linea, this.columna, 'Semantico', 'El dato : ' + this.nombre+ `[${filaV.value}][${columnV.value}] ` + ' no tiene un valor asignado');
            }
            return { value: value.valor[filaV.value][columnV.value], type: value.tipo }
        }
        else {
            throw new ErrorE(this.linea, this.columna, 'Semantico', 'No existe una declaracion de matriz: ' + this.nombre + '');
        }
    }
}

export class LlamadoV extends Expresion {
    constructor(private nombre: string, private celda: Expresion, linea: number, columna: number) {
        super(linea, columna)
    }

    public ejecutar(ambito: Ambito): Retorno {
        const columnV = this.celda.ejecutar(ambito)

        const value = ambito.getVal(this.nombre)

        if (columnV.type != 0) { throw new ErrorE(this.linea, this.columna, 'Semantico', 'El valor ingresado en la Columna no es un entero'); }

        if (value != null) {
            if (columnV.value < 0 || columnV.value >= value.valor.length) { throw new ErrorE(this.linea, this.columna, 'Semantico', 'El Indice ingresado no existe en el arreglo: ' + this.nombre); }

            if((value.valor[columnV.value] == null && value.tipo==4) || (value.valor[columnV.value] == '\u0000' && value.tipo==3)){
                throw new ErrorE(this.linea, this.columna, 'Semantico', 'El dato: ' + this.nombre+`[${columnV.value}]`+ ' no tiene un valor asignado');
            }
            return { value: value.valor[columnV.value], type: value.tipo }
        }
        else {
            throw new ErrorE(this.linea, this.columna, 'Semantico', 'No existe una declaracion de vector: ' + this.nombre + '');
        }
    }
}