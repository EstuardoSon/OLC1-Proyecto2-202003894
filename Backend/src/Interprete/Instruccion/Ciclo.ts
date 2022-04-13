import { Ambito } from "../Extra/Ambito";
import { Entorno, EntornoC } from "./Entorno";
import { Instruccion } from "./Instruccion";

export class Ciclo extends Instruccion {
    constructor(private entorno: Entorno, linea: number, columna: number) {
        super(linea, columna);
    }

    public ejecutar(ambito: Ambito) {
        let respuesta = this.entorno.ejecutar(ambito);
        if (respuesta != null) {
            if (respuesta.type == "Return") { return respuesta }
        }
    }
}