import { ErrorE } from "../Error/Error";
import { Ambito } from "../Extra/Ambito";
import { Expresion } from "./Expresion";
import { Retorno } from "./Retorno";

export class Aritmetica extends Expresion {
    constructor(private izq: Expresion, private der: Expresion, private operador: Operador, linea: number, columna: number) {
        super(linea, columna);
    }

    public ejecutar(ambito: Ambito): Retorno {
        const valorIzquierda = this.izq.ejecutar(ambito)
        const valorDerecha = this.der.ejecutar(ambito)

        if (typeof(valorIzquierda.value) == 'object'){ throw new ErrorE(this.linea, this.columna, 'Semantico', `No es posible operar ya que [${valorIzquierda.value}] no es un dato primitivo`) }
        if (typeof(valorDerecha.value) == 'object'){ throw new ErrorE(this.linea, this.columna, 'Semantico', `No es posible operar ya que [${valorDerecha.value}] no es un dato primitivo`) }

        var dominante = this.tipoDominante(this.operador, valorIzquierda.type, valorDerecha.type);
        
        if (dominante == null) { 
            switch(this.operador){
                case 0:
                    throw new ErrorE(this.linea, this.columna, 'Semantico', "No es posible operar: " + valorIzquierda.value + " + " + valorDerecha.value)
                ;
                case 1:
                    throw new ErrorE(this.linea, this.columna, 'Semantico', "No es posible operar: " + valorIzquierda.value + " - " + valorDerecha.value)
                ;
                case 2:
                    throw new ErrorE(this.linea, this.columna, 'Semantico', "No es posible operar: " + valorIzquierda.value + " * " + valorDerecha.value)
                ;
                case 3:
                    throw new ErrorE(this.linea, this.columna, 'Semantico', "No es posible operar: " + valorIzquierda.value + " / " + valorDerecha.value)
                ;
                case 4:
                    throw new ErrorE(this.linea, this.columna, 'Semantico', "No es posible operar: " + valorIzquierda.value + " ^ " + valorDerecha.value)
                ;
                case 5:
                    throw new ErrorE(this.linea, this.columna, 'Semantico', "No es posible operar: " + valorIzquierda.value + " % " + valorDerecha.value) 
                ;
            }
        }

        else {
            if (this.operador == 0) {

                if (dominante == 0) {
                    let valorIz: number, valorDer: number;
                    if (valorIzquierda.type == 3) { valorIz = Number(valorIzquierda.value.charCodeAt(0)); }
                    else if (valorIzquierda.type == 2) { if (valorIzquierda.value) { valorIz = 1; } else { valorIz = 0; } }
                    else { valorIz = Number(valorIzquierda.value) }

                    if (valorDerecha.type == 3) { valorDer = Number(valorDerecha.value.charCodeAt(0)); }
                    else if (valorDerecha.type == 2) { if (valorDerecha.value) { valorDer = 1; } else { valorDer = 0; } }
                    else { valorDer = Number(valorDerecha.value) }

                    return { value: valorIz + valorDer, type: dominante }

                } else if (dominante == 1) {
                    let valorIz: number, valorDer: number;
                    if (valorIzquierda.type == 3) { valorIz = Number(valorIzquierda.value.charCodeAt(0)); }
                    else if (valorIzquierda.type == 2) { if (valorIzquierda.value) { valorIz = 1; } else { valorIz = 0; } }
                    else { valorIz = Number(valorIzquierda.value) }

                    if (valorDerecha.type == 3) { valorDer = Number(valorDerecha.value.charCodeAt(0)); }
                    else if (valorDerecha.type == 2) { if (valorDerecha.value) { valorDer = 1; } else { valorDer = 0; } }
                    else { valorDer = Number(valorDerecha.value) }

                    return { value: valorIz + valorDer, type: dominante }

                } else if (dominante == 4) {
                    return { value: valorIzquierda.value.toString() + valorDerecha.value.toString(), type: dominante }
                }

            } else if (this.operador == 1) {

                if (dominante == 0) {
                    let valorIz: number, valorDer: number;
                    if (valorIzquierda.type == 3) { valorIz = Number(valorIzquierda.value.charCodeAt(0)); }
                    else if (valorIzquierda.type == 2) { if (valorIzquierda.value) { valorIz = 1; } else { valorIz = 0; } }
                    else { valorIz = Number(valorIzquierda.value) }

                    if (valorDerecha.type == 3) { valorDer = Number(valorDerecha.value.charCodeAt(0)); }
                    else if (valorDerecha.type == 2) { if (valorDerecha.value) { valorDer = 1; } else { valorDer = 0; } }
                    else { valorDer = Number(valorDerecha.value) }

                    return { value: Math.round(valorIz - valorDer), type: dominante }

                } else if (dominante == 1) {
                    let valorIz: number, valorDer: number;
                    if (valorIzquierda.type == 3) { valorIz = Number(valorIzquierda.value.charCodeAt(0)); }
                    else if (valorIzquierda.type == 2) { if (valorIzquierda.value) { valorIz = 1; } else { valorIz = 0; } }
                    else { valorIz = Number(valorIzquierda.value) }

                    if (valorDerecha.type == 3) { valorDer = Number(valorDerecha.value.charCodeAt(0)); }
                    else if (valorDerecha.type == 2) { if (valorDerecha.value) { valorDer = 1; } else { valorDer = 0; } }
                    else { valorDer = Number(valorDerecha.value) }

                    return { value: valorIz - valorDer, type: dominante }
                }

            } else if (this.operador == 2) {

                if (dominante == 0) {
                    let valorIz: number, valorDer: number;
                    if (valorIzquierda.type == 3) { valorIz = Number(valorIzquierda.value.charCodeAt(0)); }
                    else if (valorIzquierda.type == 2) { if (valorIzquierda.value) { valorIz = 1; } else { valorIz = 0; } }
                    else { valorIz = Number(valorIzquierda.value) }

                    if (valorDerecha.type == 3) { valorDer = Number(valorDerecha.value.charCodeAt(0)); }
                    else if (valorDerecha.type == 2) { if (valorDerecha.value) { valorDer = 1; } else { valorDer = 0; } }
                    else { valorDer = Number(valorDerecha.value) }

                    return { value: Math.round(valorIz * valorDer), type: dominante }

                } else if (dominante == 1) {
                    let valorIz: number, valorDer: number;
                    if (valorIzquierda.type == 3) { valorIz = Number(valorIzquierda.value.charCodeAt(0)); }
                    else if (valorIzquierda.type == 2) { if (valorIzquierda.value) { valorIz = 1; } else { valorIz = 0; } }
                    else { valorIz = Number(valorIzquierda.value) }

                    if (valorDerecha.type == 3) { valorDer = Number(valorDerecha.value.charCodeAt(0)); }
                    else if (valorDerecha.type == 2) { if (valorDerecha.value) { valorDer = 1; } else { valorDer = 0; } }
                    else { valorDer = Number(valorDerecha.value) }

                    return { value: valorIz * valorDer, type: dominante }
                }

            }
            else if (this.operador == 3) {

                let valorIz: number, valorDer: number;
                if (valorIzquierda.type == 3) { valorIz = Number(valorIzquierda.value.charCodeAt(0)); }
                else if (valorIzquierda.type == 2) { if (valorIzquierda.value) { valorIz = 1; } else { valorIz = 0; } }
                else { valorIz = Number(valorIzquierda.value) }

                if (valorDerecha.type == 3) { valorDer = Number(valorDerecha.value.charCodeAt(0)); }
                else if (valorDerecha.type == 2) { if (valorDerecha.value) { valorDer = 1; } else { valorDer = 0; } }
                else { valorDer = Number(valorDerecha.value) }

                if(valorDer!=0){
                    return { value: valorIz / valorDer, type: dominante }
                }else{
                    throw new ErrorE(this.linea, this.columna, 'Semantico', "No es posible operar: " + valorIzquierda.value + " / " + valorDerecha.value)
                }
            }

            else if (this.operador == 4) {

                if (dominante == 0) {
                    let valorIz: number, valorDer: number;
                    if (valorIzquierda.type == 3) { valorIz = Number(valorIzquierda.value.charCodeAt(0)); }
                    else if (valorIzquierda.type == 2) { if (valorIzquierda.value) { valorIz = 1; } else { valorIz = 0; } }
                    else { valorIz = Number(valorIzquierda.value) }

                    if (valorDerecha.type == 3) { valorDer = Number(valorDerecha.value.charCodeAt(0)); }
                    else if (valorDerecha.type == 2) { if (valorDerecha.value) { valorDer = 1; } else { valorDer = 0; } }
                    else { valorDer = Number(valorDerecha.value) }

                    return { value: Math.round(Math.pow(valorIz, valorDer)), type: dominante }

                } else if (dominante == 1) {
                    let valorIz: number, valorDer: number;
                    if (valorIzquierda.type == 3) { valorIz = Number(valorIzquierda.value.charCodeAt(0)); }
                    else if (valorIzquierda.type == 2) { if (valorIzquierda.value) { valorIz = 1; } else { valorIz = 0; } }
                    else { valorIz = Number(valorIzquierda.value) }

                    if (valorDerecha.type == 3) { valorDer = Number(valorDerecha.value.charCodeAt(0)); }
                    else if (valorDerecha.type == 2) { if (valorDerecha.value) { valorDer = 1; } else { valorDer = 0; } }
                    else { valorDer = Number(valorDerecha.value) }

                    return { value: Math.pow(valorIz, valorDer), type: dominante }
                }
            }

            else if (this.operador == 5) {
                let valorIz: number, valorDer: number;
                if (valorIzquierda.type == 3) { valorIz = Number(valorIzquierda.value.charCodeAt(0)); }
                else if (valorIzquierda.type == 2) { if (valorIzquierda.value) { valorIz = 1; } else { valorIz = 0; } }
                else { valorIz = Number(valorIzquierda.value) }

                if (valorDerecha.type == 3) { valorDer = valorDerecha.value.charCodeAt(0); }
                else if (valorDerecha.type == 2) { if (valorDerecha.value) { valorDer = 1; } else { valorDer = 0; } }
                else { valorDer = Number(valorDerecha.value) }

                return { value: valorIz % valorDer, type: dominante }
            }

            else if (this.operador == 7) {
                let valorIz: number, valorDer: number;
                valorIz = Number(valorIzquierda.value) 
                valorDer = Number(valorDerecha.value) 

                return { value: valorIz + valorDer, type: dominante }
            }

            else if (this.operador == 8) {
                let valorIz: number, valorDer: number;
                valorIz = Number(valorIzquierda.value) 
                valorDer = Number(valorDerecha.value) 

                return { value: valorIz - valorDer, type: dominante }
            }
        }

        return { value: null, type: null }
    }
}

export enum Operador {
    SUMA = 0,
    RESTA = 1,
    MULTIPLICACION = 2,
    DIVISION = 3,
    POTENCIA = 4,
    MODULO = 5,
    RELACIONAL = 6,
    INCREMENTO = 7,
    DECREMENTO = 8
}