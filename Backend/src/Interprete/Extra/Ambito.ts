import { ErrorE } from "../Error/Error";
import { Type } from "../Expresion/Retorno";
import { Simbolo } from "./Simbolo";

export class Ambito{
    public variables:Map<string, Simbolo>;
    
    constructor(public anterior: Ambito |null){
        this.variables = new Map()
    }

    public setVal(id:string, valor:any, tipo:Type, linea, columna){
        let entorno: Ambito | null = this

        while(entorno!=null){
            if(entorno.variables.has(id)){
                const val = entorno.variables.get(id)
                if(val.tipo == tipo) {
                    entorno.variables.set(id, new Simbolo(valor, id, tipo))
                }else{
                    throw new ErrorE(linea, columna, 'Semantico', 'No se puede asignar: ' + tipo + ' a ' + val.tipo);
                }
            }
            entorno = entorno.anterior
        }
        this.variables.set(id, new Simbolo(valor, id, tipo))
    }

    public getVal(id:string):Simbolo{
        let entorno: Ambito | null = this
        while(entorno!=null){
            if(entorno.variables.has(id)){
                return entorno.variables.get(id)
            }
            entorno = entorno.anterior
        }
        
        return null
    }
}