import { ErrorE } from "../Error/Error";
import { Ambito } from "../Extra/Ambito";
import { Expresion } from "./Expresion";
import { Retorno, Type } from "./Retorno";


export class Ternario extends Expresion {
    constructor(private condicion: Expresion, private valor1: Expresion, private valor2: Expresion, linea: number, columna: number) {
        super(linea, columna);
    }

    public ejecutar(ambito: Ambito): Retorno {
        const condicion = this.condicion.ejecutar(ambito);

        if (typeof (condicion.value) == 'object') { throw new ErrorE(this.linea, this.columna, 'Semantico', `No es posible operar ya que ${condicion.value} no es un dato primitivo`) }

        if (condicion.type == 2) {
            if (condicion.value) {
                const valor1 = this.valor1.ejecutar(ambito);
                if (typeof (valor1.value) == 'object') { throw new ErrorE(this.linea, this.columna, 'Semantico', `No es posible operar ya que ${valor1.value} no es un dato primitivo`) }
                return { value: valor1.value, type: valor1.type }
            } else {
                const valor2 = this.valor2.ejecutar(ambito);
                if (typeof (valor2.value) == 'object') { throw new ErrorE(this.linea, this.columna, 'Semantico', `No es posible operar ya que ${valor2.value} no es un dato primitivo`) }
                return { value: valor2.value, type: valor2.type }
            }
        }
        throw new ErrorE(this.linea, this.columna, 'Semantico', ' La condicion no retorna un valor Booleano');
    }
}