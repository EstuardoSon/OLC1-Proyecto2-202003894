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
            if(entorno.variables.has(id.toLocaleLowerCase())){
                const val = entorno.variables.get(id)
                if(val.tipo == tipo) {
                    entorno.variables.set(id.toLocaleLowerCase(), new Simbolo(valor, id.toLocaleLowerCase(), tipo))
                }else{
                    throw new ErrorE(linea, columna, 'Semantico', 'No se puede asignar: ' + valor + ' a ' + id + " porque no son del mismo tipo");
                }
            }
            entorno = entorno.anterior
        }
        this.variables.set(id.toLocaleLowerCase(), new Simbolo(valor, id.toLocaleLowerCase(), tipo))
    }

    public getVal(id:string):Simbolo{
        let entorno: Ambito | null = this
        while(entorno!=null){
            if(entorno.variables.has(id.toLocaleLowerCase())){
                return entorno.variables.get(id.toLocaleLowerCase())
            }
            entorno = entorno.anterior
        }
        
        return null
    }
}