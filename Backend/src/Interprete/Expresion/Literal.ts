import { Ambito } from "../Extra/Ambito";
import { Expresion } from "./Expresion";
import { Retorno, Type } from "./Retorno";


export class Literal extends Expresion{
    constructor(private valor:any, private tipo: Type, linea: number, columna: number){
        super(linea, columna);
    }

    public ejecutar(ambito: Ambito): Retorno {
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
            if(this.valor.toString()=="\\n"){
                return {value: "\n", type: 3 }
            }else if(this.valor.toString()=="\\\""){
                return {value: "\"", type: 3 }
            }else if(this.valor.toString()=="\\'"){
                return {value: "'", type: 3 }
            }else if(this.valor.toString()=="\\t"){
                return {value: "\t", type: 3 }
            }else if(this.valor.toString()=="\\\\"){
                return {value: "\\", type: 3 }
            }else if(this.valor.toString()=="\\r"){
                return {value: "\r", type: 3 }
            }
            return {value: String(this.valor), type: 3 };
        }
        else if(this.tipo == 4){
            return {value: String(this.valor).replace("\\n","\n").replace("\\t","\t").replace("\\\"","\"").replace("\\'","\'").replace("\\n","\r").replace("\\\\","\\"), type: 4 };
        }
        return {value: null, type: 4}
    }
}