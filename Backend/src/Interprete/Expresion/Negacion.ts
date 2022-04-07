import { ErrorE } from "../Error/Error";
import { Ambito } from "../Extra/Ambito";
import { Expresion } from "./Expresion";
import { Retorno, Type } from "./Retorno";


export class Negacion extends Expresion{
    constructor(private valor:Expresion, private tipo: Type, linea: number, columna: number){
        super(linea, columna);
    }

    public ejecutar(ambito: Ambito): Retorno {
        const value = this.valor.ejecutar(ambito);

        if (value.type == 2){
            if(value.value == true){
                return {value: false, type: 2}
            }
            return {value: true, type: 2}
        }
        throw new ErrorE(this.linea, this.columna, 'Semantico', 'No se fue posible realizar la negacion de '+value.value+' ya que no es booleano');
    }
}