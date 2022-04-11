import { ErrorE } from "../Error/Error";
import { Ambito } from "../Extra/Ambito";
import { Expresion } from "./Expresion";
import { Retorno, Type } from "./Retorno";


export class VectorDec1 extends Expresion{
    constructor (private nombre:String, private tipo:Type, private contenido:Array<Expresion>, linea:number, columna: number){
        super(linea, columna);
    }

    public ejecutar(ambito: Ambito): Retorno {
        const datos = [];

        for(let valor of this.contenido){
            let dato = valor.ejecutar(ambito);

            if(dato.type == this.tipo){
                datos.push(dato.value);
                continue;
            }
            throw new ErrorE(this.linea, this.columna, 'Semantico', 'El dato: '+dato.value+' del arreglo: '+this.nombre+' no es del tipo correspondiente');
        }

        return {value: datos, type: this.tipo}
    }
}
