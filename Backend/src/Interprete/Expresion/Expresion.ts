import {Retorno, tipoSUMA, tipoRESTA, tipoDIV, tipoMULTI, tipoMODULO, tipoPOTENCIA, Type} from "./Retorno";

export abstract class Expresion {
    public linea: number;
    public columna: number;

    constructor(linea: number, columna: number){
        this.linea = linea;
        this.columna = columna;
    }
    
    public abstract ejecutar(): Retorno;

    public tipoDominante(Tipo: number, fila: Type, columna: Type){
        switch(Tipo){
            case 0:{
                return tipoSUMA[fila][columna];
                break;
            }
            case 1:{
                return tipoRESTA[fila][columna];
                break;
            }
            case 2:{
                return tipoMULTI[fila][columna];
                break;
            }
            case 3:{
                return tipoDIV[fila][columna];
                break;
            }
            case 4:{
                return tipoPOTENCIA[fila][columna];
                break;
            }
            case 5:{
                return tipoMODULO[fila][columna];
                break;
            }
            default:{
                return null;
                break;
            }
        }
    }
}