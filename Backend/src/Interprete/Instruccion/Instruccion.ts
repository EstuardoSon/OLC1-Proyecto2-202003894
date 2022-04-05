import {Ambito} from "../Extra/Ambito";

export abstract class Instruccion{
    constructor(public linea:number, public columna:number){
    }

    public abstract ejecutar(ambito: Ambito);
}