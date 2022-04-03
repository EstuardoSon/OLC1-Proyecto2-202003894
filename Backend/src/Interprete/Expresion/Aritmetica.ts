import { Expresion } from "./Expresion";
import { Retorno } from "./Retorno";


export class Aritmetica extends Expresion{
    constructor(linea: number, columna: number){
        super(linea, columna);
    }

    public ejecutar(): Retorno {
        throw new Error("Method not implemented.");
    }
}