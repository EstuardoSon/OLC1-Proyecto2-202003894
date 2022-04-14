import { ErrorE } from "../Error/Error";
import { Expresion } from "../Expresion/Expresion";
import { Ambito } from "../Extra/Ambito";
import { EntornoW } from "./Entorno";
import { Instruccion } from "./Instruccion";

export class Switch extends Instruccion {
    constructor(private entorno: EntornoW, linea: number, columna: number) {
        super(linea, columna);
    }

    public ejecutar(ambito: Ambito) {
        const respuesta = this.entorno.ejecutar(ambito);
        if (respuesta != null) {
            if (respuesta.type == 'Continue' || respuesta.type == 'Return') { return respuesta }
        }
    }
}