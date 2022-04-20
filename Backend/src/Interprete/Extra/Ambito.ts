import { ErrorE } from "../Error/Error";
import { Type } from "../Expresion/Retorno";
import { Funcion } from "../Instruccion/Funcion";
import { Simbolo } from "./Simbolo";
var parser = require('../Grammar/grammar');

export class Ambito {
    public variables: Map<string, Simbolo>;
    public funciones: Map<string, Funcion>;

    constructor(public anterior: Ambito | null, public nombre: string, public marcador: boolean) {
        this.variables = new Map()
        this.funciones = new Map()
    }

    public modVal(id: string, valor: any, tipo: Type, linea, columna) {
        let entorno: Ambito | null = this

        while (entorno != null) {
            if (entorno.variables.has(id.toLocaleLowerCase())) {
                const val = entorno.variables.get(id)
                if (val.tipo == tipo) {
                    parser.TablaSimbolos.find(object => {
                        if (object[1] == id.toLocaleLowerCase()) {
                            object[2] = valor;
                        }
                    });
                    entorno.variables.set(id.toLocaleLowerCase(), new Simbolo(valor, id.toLocaleLowerCase(), tipo, 0))
                    break;
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
            if (!entorno.marcador) {
                if (entorno.variables.has(id.toLocaleLowerCase())) {
                    throw new ErrorE(linea, columna, 'Semantico', "La variable: " + id + " ya existe");
                }
                entorno = entorno.anterior
            }
            else {
                if (entorno.variables.has(id.toLocaleLowerCase())) {
                    throw new ErrorE(linea, columna, 'Semantico', "La variable: " + id + " ya existe");
                }
                entorno = null
            }
        }

        parser.TablaSimbolos.push([this.nombre, id.toLocaleLowerCase(), valor, tipo, "Primitiva"])
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
            if (!entorno.marcador) {
                if (entorno.variables.has(id.toLocaleLowerCase())) {
                    throw new ErrorE(linea, columna, 'Semantico', "La variable: " + id + " ya existe");
                }
                entorno = entorno.anterior
            }
            else {
                if (entorno.variables.has(id.toLocaleLowerCase())) {
                    throw new ErrorE(linea, columna, 'Semantico', "La variable: " + id + " ya existe");
                }
                entorno = null
            }
        }

        parser.TablaSimbolos.push([this.nombre, id.toLocaleLowerCase(), valor, tipo, "Matriz"])
        this.variables.set(id.toLocaleLowerCase(), new Simbolo(valor, id.toLocaleLowerCase(), tipo, 2))
    }

    public modValM(id: string, valor: any, tipo: Type) {
        let entorno: Ambito | null = this

        while (entorno != null) {
            if (entorno.variables.has(id.toLocaleLowerCase())) {
                parser.TablaSimbolos.find(object => {
                    if (object[1] == id.toLocaleLowerCase()) {
                        object[2] = valor;
                    }
                });
                entorno.variables.set(id.toLocaleLowerCase(), new Simbolo(valor, id.toLocaleLowerCase(), tipo, 2))
                break;
            }
            entorno = entorno.anterior
        }
    }

    public setValV(id: string, valor: any, tipo: Type, linea, columna) {
        let entorno: Ambito | null = this

        while (entorno != null) {
            if (!entorno.marcador) {
                if (entorno.variables.has(id.toLocaleLowerCase())) {
                    throw new ErrorE(linea, columna, 'Semantico', "La variable: " + id + " ya existe");
                }
                entorno = entorno.anterior
            }
            else {
                if (entorno.variables.has(id.toLocaleLowerCase())) {
                    throw new ErrorE(linea, columna, 'Semantico', "La variable: " + id + " ya existe");
                }
                entorno = null
            }
        }

        parser.TablaSimbolos.push([this.nombre, id.toLocaleLowerCase(), valor, tipo, "Vector"])
        this.variables.set(id.toLocaleLowerCase(), new Simbolo(valor, id.toLocaleLowerCase(), tipo, 1))
    }

    public modValV(id: string, valor: any, tipo: Type) {
        let entorno: Ambito | null = this

        while (entorno != null) {
            if (entorno.variables.has(id.toLocaleLowerCase())) {
                parser.TablaSimbolos.find(object => {
                    if (object[1] == id.toLocaleLowerCase()) {
                        object[2] = valor;
                    }
                });
                entorno.variables.set(id.toLocaleLowerCase(), new Simbolo(valor, id.toLocaleLowerCase(), tipo, 1))
                break;
            }
            entorno = entorno.anterior
        }
    }

    public setFunc(nombre:string, valor:Funcion, linea:number, columna:number){
        let entorno: Ambito | null = this
        while (entorno != null) {
            if (entorno.funciones.has(nombre.toLocaleLowerCase())) {
                throw new ErrorE(linea, columna, "Semantico", "La funcion ya existe");
            }
            entorno = entorno.anterior
        }
        parser.TablaSimbolos.push([this.nombre, nombre.toLocaleLowerCase(), valor, valor.retorno, "Funcion o Metodo"])
        this.funciones.set(nombre.toLocaleLowerCase(), valor)
    }

    public getFunc(id: string): Funcion {
        let entorno: Ambito | null = this
        while (entorno != null) {
            if (entorno.funciones.has(id.toLocaleLowerCase())) {
                return entorno.funciones.get(id.toLocaleLowerCase())
            }
            entorno = entorno.anterior
        }

        return null
    }

    public getGlobal(): Ambito {
        let entorno: Ambito | null = this
        while (entorno.anterior != null) {
            entorno = entorno.anterior
        }

        return entorno;
    }
}