import { ErrorE } from "../Error/Error";
import { Expresion } from "../Expresion/Expresion";
import { Type } from "../Expresion/Retorno";
import { Ambito } from "../Extra/Ambito";
import { EntornoF } from "./Entorno";
import { Instruccion } from "./Instruccion";


export class Funcion extends Instruccion {

    constructor(public nombre: string, public entorno: EntornoF, public parametros: Array<{ nombre: string, tipo: Type }>, public retorno: Type, linea: number, columna: number) {
        super(linea, columna);
    }

    public ejecutar(ambito: Ambito) {
        let duplicado = []
        for (const param of this.parametros) {
            const comprobacion = duplicado.find(element => element == param.nombre);
            if (comprobacion != null) {
                throw new ErrorE(this.linea, this.columna, "Semantico", "El parametro: " + param.nombre + " esta duplicado")
            } else {
                duplicado.push(param.nombre)
            }
        }
        ambito.setFunc(this.nombre, this, this.linea, this.columna);
    }

}

export class Run extends Instruccion {

    constructor(public llamado: LlamadoFuncion, linea: number, columna: number) {
        super(linea, columna);
    }

    public ejecutar(ambito: Ambito) {
        this.llamado.ejecutar(ambito);
    }
}

export class LlamadoFuncion extends Instruccion {

    constructor(public nombre: string, public parametros: Array<Expresion>, fila, columna) {
        super(fila, columna);
    }

    public ejecutar(ambito: Ambito) {
        let busqueda = ambito.getFunc(this.nombre)

        if (busqueda != null) {
            if (this.parametros.length == busqueda.parametros.length) {
                const global = ambito.getGlobal()
                const nuevo = new Ambito(global, `${global.nombre} - funcion(${this.nombre})`, true);

                for (const i in this.parametros) {
                    let param = this.parametros[i].ejecutar(ambito)
                    if (param.type == busqueda.parametros[i].tipo) {
                        if (typeof (param.value) == 'object') {
                            if (typeof (param.value[0]) == 'object') {
                                nuevo.setValM(busqueda.parametros[i].nombre, param.value, param.type, this.linea, this.columna);
                            }
                            else {
                                nuevo.setValV(busqueda.parametros[i].nombre, param.value, param.type, this.linea, this.columna);
                            }
                        }
                        else {
                            nuevo.setVal(busqueda.parametros[i].nombre, param.value, param.type, this.linea, this.columna);
                        }
                    }
                    else {
                        throw new ErrorE(this.linea, this.columna, "Semantico", `El valor: ${param.value} no es del tipo adecuado del parametro: ${busqueda.parametros[i].nombre}`)
                    }
                }

                let respuesta = busqueda.entorno.ejecutar(nuevo);
                if (respuesta.type == 'Return') {
                    if (respuesta.value != null) {
                        if (respuesta.value.type == busqueda.retorno) {
                            return respuesta.value
                        }
                        else {
                            throw new ErrorE(this.linea, this.columna, "Semantico", "El retorno de la funcion " + busqueda.nombre + " no coincide con su tipo")
                        }
                    }
                    else {
                        if (respuesta.value == busqueda.retorno) {
                            return { value: null, type: busqueda.retorno }
                        }
                        else {
                            throw new ErrorE(this.linea, this.columna, "Semantico", "El retorno de la funcion " + busqueda.nombre + " no coincide con su tipo")
                        }
                    }
                }
            }
            else {
                throw new ErrorE(this.linea, this.columna, "Semantico", "La cantidad de parametros enviados a la funcion " + this.nombre + " no es la justa")
            }
        } else {
            throw new ErrorE(this.linea, this.columna, "Semantico", "No existe una funcion con el nombre: " + this.nombre)
        }
    }

}