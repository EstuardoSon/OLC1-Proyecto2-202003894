import { ErrorE } from "../Error/Error";
import { Type } from "../Expresion/Retorno";
import { Simbolo } from "./Simbolo";

export class Ambito {
    public variables: Map<string, Simbolo>;

    constructor(public anterior: Ambito | null) {
        this.variables = new Map()
    }

    public modVal(id: string, valor: any, tipo: Type, linea, columna) {
        let entorno: Ambito | null = this

        while (entorno != null) {
            if (entorno.variables.has(id.toLocaleLowerCase())) {
                const val = entorno.variables.get(id)
                if (val.tipo == tipo) {
                    entorno.variables.set(id.toLocaleLowerCase(), new Simbolo(valor, id.toLocaleLowerCase(), tipo, 0))
                } else {
                    throw new ErrorE(linea, columna, 'Semantico', 'No se puede asignar: ' + valor + ' a ' + id + " porque no son del mismo tipo");
                }
            }
            entorno = entorno.anterior
        }
    }

    public setVal(id: string, valor: any, tipo: Type, linea, columna) {
        let entorno: Ambito | null = this

        while (entorno != null) {
            if (entorno.variables.has(id.toLocaleLowerCase())) {
                throw new ErrorE(linea, columna, 'Semantico', "La variable: " + id + " ya existe");
            }
            entorno = entorno.anterior
        }
        this.variables.set(id.toLocaleLowerCase(), new Simbolo(valor, id.toLocaleLowerCase(), tipo, 0))
    }

    public getVal(id: string): Simbolo {
        let entorno: Ambito | null = this
        while (entorno != null) {
            if (entorno.variables.has(id.toLocaleLowerCase())) {
                return entorno.variables.get(id.toLocaleLowerCase())
            }
            entorno = entorno.anterior
        }

        return null
    }

    public setValM(id: string, valor: any, tipo: Type, linea, columna) {
        let entorno: Ambito | null = this

        while (entorno != null) {
            if (entorno.variables.has(id.toLocaleLowerCase())) {
                throw new ErrorE(linea, columna, 'Semantico', "La variable: " + id + " ya existe");
            }
            entorno = entorno.anterior
        }
        this.variables.set(id.toLocaleLowerCase(), new Simbolo(valor, id.toLocaleLowerCase(), tipo, 2))
    }

    public modValM(id: string, valor: any, tipo: Type) {
        let entorno: Ambito | null = this

        while (entorno != null) {
            if (entorno.variables.has(id.toLocaleLowerCase())) {
                entorno.variables.set(id.toLocaleLowerCase(), new Simbolo(valor, id.toLocaleLowerCase(), tipo, 2))
            }
            entorno = entorno.anterior
        }
    }

    public setValV(id: string, valor: any, tipo: Type, linea, columna) {
        let entorno: Ambito | null = this

        while (entorno != null) {
            if (entorno.variables.has(id.toLocaleLowerCase())) {
                throw new ErrorE(linea, columna, 'Semantico', "La variable: " + id + " ya existe");
            }
            entorno = entorno.anterior
        }
        this.variables.set(id.toLocaleLowerCase(), new Simbolo(valor, id.toLocaleLowerCase(), tipo, 1))
    }

    public modValV(id: string, valor: any, tipo: Type) {
        let entorno: Ambito | null = this

        while (entorno != null) {
            if (entorno.variables.has(id.toLocaleLowerCase())) {
                entorno.variables.set(id.toLocaleLowerCase(), new Simbolo(valor, id.toLocaleLowerCase(), tipo, 1))
            }
            entorno = entorno.anterior
        }
    }
}