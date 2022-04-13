import { ErrorE } from "../Error/Error";
import { Expresion } from "../Expresion/Expresion";
import { Ambito } from "../Extra/Ambito";
import { Instruccion } from "./Instruccion";
var parser = require('../Grammar/grammar');

export class Entorno extends Instruccion {
    constructor(private instruccines: Array<Instruccion>, linea: number, columna: number) {
        super(linea, columna);
    }

    public ejecutar(ambito: Ambito) {
        let nuevoAmbito = new Ambito(ambito);

        for (let i of this.instruccines) {
            try {
                let respuesta = i.ejecutar(nuevoAmbito);
                if (respuesta != null){ 
                    if (respuesta.type == 'Break' || respuesta.type == 'Continue' || respuesta.type == 'Return'){ return respuesta }
                }
            } catch (error) {
                parser.Errores.push(error)
            }
        }
    }

}

export class EntornoC extends Instruccion {
    constructor(private condicion: Expresion, private instruccines: Array<Instruccion>, private final: Instruccion, linea: number, columna: number) {
        super(linea, columna);
    }

    public ejecutar(ambito: Ambito) {
        let ejeCondicion = this.condicion.ejecutar(ambito);

        if (ejeCondicion.type != 2 || typeof (ejeCondicion.value) == 'object') { throw new ErrorE(this.linea, this.columna, 'Semantico', `No es posible operar ya que: {${ejeCondicion.value}} no es un dato primitivo booleano`) }

        let nuevoAmbito = new Ambito(ambito);

        while (ejeCondicion.value) {
            for (let i of this.instruccines) {
                try {
                    let respuesta = i.ejecutar(nuevoAmbito);
                    if (respuesta != null){ 
                        if (respuesta.type == 'Break' || respuesta.type == 'Return'){ return respuesta }
                        else if (respuesta.type == 'Continue'){ break; }
                    }
                } catch (error) {
                    parser.Errores.push(error)
                }
            }
            if(this.final != null){ this.final.ejecutar(ambito); }
            ejeCondicion = this.condicion.ejecutar(ambito);
        }
    }

}

export class EntornoD extends Instruccion {
    constructor(private condicion: Expresion, private instruccines: Array<Instruccion>, linea: number, columna: number) {
        super(linea, columna);
    }

    public ejecutar(ambito: Ambito) {
        let ejeCondicion = this.condicion.ejecutar(ambito);

        if (ejeCondicion.type != 2 || typeof (ejeCondicion.value) == 'object') { throw new ErrorE(this.linea, this.columna, 'Semantico', `No es posible operar ya que: {${ejeCondicion.value}} no es un dato primitivo booleano`) }

        let nuevoAmbito = new Ambito(ambito);

        do {
            for (let i of this.instruccines) {
                try {
                    let respuesta = i.ejecutar(nuevoAmbito);
                    if (respuesta != null){ 
                        if (respuesta.type == 'Break' || respuesta.type == 'Return'){ return respuesta }
                        else if (respuesta.type == 'Continue'){ break; }
                    }
                } catch (error) {
                    parser.Errores.push(error)
                }
            }
            ejeCondicion = this.condicion.ejecutar(ambito);
        }while (ejeCondicion.value);
    }
}