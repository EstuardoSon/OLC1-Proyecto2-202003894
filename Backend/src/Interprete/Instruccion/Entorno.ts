import { ErrorE } from "../Error/Error";
import { Expresion } from "../Expresion/Expresion";
import { Relacional } from "../Expresion/Relacional";
import { Ambito } from "../Extra/Ambito";
import { Funcion } from "./Funcion";
import { Instruccion } from "./Instruccion";
var parser = require('../Grammar/grammar');

export class Entorno extends Instruccion {
    constructor(private instruccines: Array<Instruccion>, linea: number, columna: number) {
        super(linea, columna);
    }

    public ejecutar(ambito: Ambito) {
        let nuevoAmbito = new Ambito(ambito, ambito.nombre + " - Pfor", false);

        for (let i of this.instruccines) {
            try {
                let respuesta = i.ejecutar(nuevoAmbito);
                if (respuesta != null) {
                    if (respuesta.type == 'Break' || respuesta.type == 'Continue' || respuesta.type == 'Return') { return respuesta }
                }
            } catch (error) {
                parser.Errores.push(error)
            }
        }
    }

}

export class EntornoI extends Instruccion {
    constructor(private instruccines: Array<Instruccion>, linea: number, columna: number) {
        super(linea, columna);
    }

    public ejecutar(ambito: Ambito) {
        let nuevoAmbito = new Ambito(ambito, ambito.nombre + " - If", false);

        for (let i of this.instruccines) {
            try {
                let respuesta = i.ejecutar(nuevoAmbito);
                if (respuesta != null) {
                    if (respuesta.type == 'Break' || respuesta.type == 'Continue' || respuesta.type == 'Return') { return respuesta }
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

        let nuevoAmbito = new Ambito(ambito, ambito.nombre + " - Ciclo", false);

        while (ejeCondicion.value) {
            for (let i of this.instruccines) {
                try {
                    if (!(i instanceof Funcion)) {
                        let respuesta = i.ejecutar(nuevoAmbito);
                        if (respuesta != null) {
                            if (respuesta.type == 'Break' || respuesta.type == 'Return') { return respuesta }
                            else if (respuesta.type == 'Continue') { break; }
                        }
                    } else {
                        throw new ErrorE(this.linea, this.columna, "Semantico", "No se permite la creacion de funciones en este ambito")
                    }
                } catch (error) {
                    parser.Errores.push(error)
                }
            }
            if (this.final != null) { this.final.ejecutar(ambito); }
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

        let nuevoAmbito = new Ambito(ambito, ambito.nombre + " - Ciclo", false);

        do {
            for (let i of this.instruccines) {
                try {
                    if (!(i instanceof Funcion)) {
                        let respuesta = i.ejecutar(nuevoAmbito);
                        if (respuesta != null) {
                            if (respuesta.type == 'Break' || respuesta.type == 'Return') { return respuesta }
                            else if (respuesta.type == 'Continue') { break; }
                        }
                    }
                    else {
                        throw new ErrorE(this.linea, this.columna, "Semantico", "No se permite la creacion de funciones en este ambito")
                    }
                } catch (error) {
                    parser.Errores.push(error)
                }
            }
            ejeCondicion = this.condicion.ejecutar(ambito);
        } while (ejeCondicion.value);
    }
}

export class EntornoCase extends Instruccion {
    constructor(public valor: Expresion, private instruccines: Array<Instruccion>, linea: number, columna: number) {
        super(linea, columna);
    }

    public ejecutar(ambito: Ambito) {
        let nuevoAmbito = new Ambito(ambito, ambito.nombre + " - Case", false);

        for (let i of this.instruccines) {
            try {
                if (!(i instanceof Funcion)) {
                    let respuesta = i.ejecutar(nuevoAmbito);
                    if (respuesta != null) {
                        if (respuesta.type == 'Break' || respuesta.type == 'Return') { return respuesta }
                        else if (respuesta.type == 'Continue') { return respuesta; }
                    }
                }
                else {
                    throw new ErrorE(this.linea, this.columna, "Semantico", "No se permite la creacion de funciones en este ambito")
                }
            } catch (error) {
                parser.Errores.push(error)
            }
        }

    }
}

export class EntornoW extends Instruccion {
    constructor(private valor: Expresion, private instruccines: Array<EntornoCase>, linea: number, columna: number) {
        super(linea, columna);
    }

    public ejecutar(ambito: Ambito) {
        let nuevoAmbito = new Ambito(ambito, ambito.nombre + " - Switch", false);
        for (let i of this.instruccines) {
            try {
                let comparacion;
                if (i.valor != null) { comparacion = new Relacional(i.valor, this.valor, 0, this.linea, this.columna); }
                else { comparacion = new Relacional(this.valor, this.valor, 0, this.linea, this.columna); }
                if (comparacion) {
                    if (!(i instanceof Funcion)) {
                        let respuesta = i.ejecutar(nuevoAmbito);
                        if (respuesta != null) {
                            if (respuesta.type == 'Break') { break; }
                            else if (respuesta.type == 'Continue' || respuesta.type == 'Return') { return respuesta; }
                        }
                    }
                    else {
                        throw new ErrorE(this.linea, this.columna, "Semantico", "No se permite la creacion de funciones en este ambito")
                    }
                }
            } catch (error) {
                parser.Errores.push(error)
            }
        }
    }
}

export class EntornoF extends Instruccion {
    constructor(private instruccines: Array<Instruccion>, linea: number, columna: number) {
        super(linea, columna);
    }

    public ejecutar(ambito: Ambito) {

        for (let i of this.instruccines) {
            try {
                let respuesta = i.ejecutar(ambito);
                if (respuesta != null) {
                    if (respuesta.type == 'Return') { return respuesta }
                }
            } catch (error) {
                parser.Errores.push(error)
            }
        }

        return {type: "Return", value: null, line: this.linea, column: this.columna}
    }
}