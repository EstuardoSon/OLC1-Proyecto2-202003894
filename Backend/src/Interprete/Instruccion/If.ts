import { Validators } from "@angular/forms";
import { ErrorE } from "../Error/Error";
import { Expresion } from "../Expresion/Expresion";
import { Ambito } from "../Extra/Ambito";
import { Entorno } from "./Entorno";
import { Instruccion } from "./Instruccion";

export class If extends Instruccion {
    constructor(private condicion: Expresion, private entorno: Entorno, private Else: Instruccion, linea: number, columna: number) {
        super(linea, columna);
    }

    public ejecutar(ambito: Ambito) {
        const ejeCondicion = this.condicion.ejecutar(ambito);

        if (ejeCondicion.type != 2 || typeof (ejeCondicion.value) == 'object') { throw new ErrorE(this.linea, this.columna, 'Semantico', `No es posible operar ya que: {${ejeCondicion.value}} no es un dato primitivo booleano`) }

        if (ejeCondicion.value) {
            let respuesta = this.entorno.ejecutar(ambito);

            if (respuesta != null) {
                if (respuesta.type == 'Break' || respuesta.type == 'Continue' || respuesta.type == 'Return') { return respuesta }
            }
        } else if (this.Else != null) {
            let respuesta = this.Else.ejecutar(ambito);

            if (respuesta != null) {
                if (respuesta.type == 'Break' || respuesta.type == 'Continue' || respuesta.type == 'Return') { return respuesta }
            }
        }
    }
}