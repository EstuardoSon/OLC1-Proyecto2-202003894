import {Retorno, tipoSUMA, tipoRESTA, tipoDIV, tipoMULTI, tipoMODULO, tipoPOTENCIA, Type, tipoRELACIONAL, tipoINCDEC} from "./Retorno";
import {Operador} from "./Aritmetica";
import { Ambito } from "../Extra/Ambito";

export abstract class Expresion {
    public linea: number;
    public columna: number;

    constructor(linea: number, columna: number){
        this.linea = linea;
        this.columna = columna;
    }
    
    public abstract ejecutar(ambito: Ambito): Retorno;

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
            case 7:{
                return tipoINCDEC[fila][columna];
            }
            case 8:{
                return tipoINCDEC[fila][columna];
            }
            default:{
                return null;
            }
        }
    }
}