import {Retorno, tipoSUMA, tipoRESTA, tipoDIV, tipoMULTI, tipoMODULO, tipoPOTENCIA, Type, tipoRELACIONAL} from "./Retorno";
import {Operador} from "./Aritmetica";

export abstract class Expresion {
    public linea: number;
    public columna: number;

    constructor(linea: number, columna: number){
        this.linea = linea;
        this.columna = columna;
    }
    
    public abstract ejecutar(): Retorno;

    public tipoDominante(Tipo: Operador, fila: Type, columna: Type){
        switch(Tipo){
            case 0:{
                return tipoSUMA[fila][columna];
            }
            case 1:{
                return tipoRESTA[fila][columna];
            }
            case 2:{
                return tipoMULTI[fila][columna];
            }
            case 3:{
                return tipoDIV[fila][columna];
            }
            case 4:{
                return tipoPOTENCIA[fila][columna];
            }
            case 5:{
                return tipoMODULO[fila][columna];
            }
            case 6:{
                return tipoRELACIONAL[fila][columna];
            }
            default:{
                return null;
            }
        }
    }
}