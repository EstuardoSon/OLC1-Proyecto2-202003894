import { Expresion } from "./Expresion";
import { Retorno, Type } from "./Retorno";


export class Literal extends Expresion{
    constructor(private valor:any, private tipo: Type, linea: number, columna: number){
        super(linea, columna);
    }

    public ejecutar(): Retorno {
        if(this.tipo == 0){
            return {value: Number(this.valor), type: 0 };
        }
        else if(this.tipo == 1){
            return {value: Number(this.valor), type: 1 };
        }
        else if(this.tipo == 2){
            return {value: this.valor, type: 2 };
        }
        else if(this.tipo == 3){
            return {value: String(this.valor), type: 3 };
        }
        else if(this.tipo == 4){
            return {value: String(this.valor), type: 4 };
        }
        return {value: null, type: 4}
    }
}