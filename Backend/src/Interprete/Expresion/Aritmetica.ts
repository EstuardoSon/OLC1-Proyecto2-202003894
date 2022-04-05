import { Ambito } from "../Extra/Ambito";
import { Expresion } from "./Expresion";
import { Retorno } from "./Retorno";


export class Aritmetica extends Expresion {
    constructor(private izq: Expresion, private der: Expresion, private operador: Operador, linea: number, columna: number) {
        super(linea, columna);
    }

    public ejecutar(): Retorno {
        const valorIzquierda = this.izq.ejecutar()
        const valorDerecha = this.der.ejecutar()

        var dominante = this.tipoDominante(this.operador, valorIzquierda.type, valorDerecha.type);

        if (this.operador == 0) {

            if (dominante == 0) {
                let valorIz: number, valorDer: number;
                if (valorIzquierda.type == 3) { valorIz = valorIzquierda.value.chartCodeAt(0); }
                else if (valorIzquierda.type == 2) { if (valorIzquierda.value) { valorIz = 1; } else { valorIz = 0; } }
                else { valorIz = Number(valorIzquierda.value) }

                if (valorDerecha.type == 3) { valorDer = valorDerecha.value.chartCodeAt(0); }
                else if (valorDerecha.type == 2) { if (valorDerecha.value) { valorDer = 1; } else { valorDer = 0; } }
                else { valorDer = Number(valorDerecha.value) }

                return { value: Math.round(valorIz + valorDer), type: dominante }

            } else if (dominante == 1) {
                let valorIz: number, valorDer: number;
                if (valorIzquierda.type == 3) { valorIz = valorIzquierda.value.chartCodeAt(0); }
                else if (valorIzquierda.type == 2) { if (valorIzquierda.value) { valorIz = 1; } else { valorIz = 0; } }
                else { valorIz = Number(valorIzquierda.value) }

                if (valorDerecha.type == 3) { valorDer = valorDerecha.value.chartCodeAt(0); }
                else if (valorDerecha.type == 2) { if (valorDerecha.value) { valorDer = 1; } else { valorDer = 0; } }
                else { valorDer = Number(valorDerecha.value) }

                return { value: valorIz + valorDer, type: dominante }

            } else if (dominante == 4) {
                return { value: valorIzquierda.value.toString() + valorDerecha.value.toString(), type: dominante }
            }

        } else if (this.operador == 1) {

            if (dominante == 0) {
                let valorIz: number, valorDer: number;
                if (valorIzquierda.type == 3) { valorIz = valorIzquierda.value.chartCodeAt(0); }
                else if (valorIzquierda.type == 2) { if (valorIzquierda.value) { valorIz = 1; } else { valorIz = 0; } }
                else { valorIz = Number(valorIzquierda.value) }

                if (valorDerecha.type == 3) { valorDer = valorDerecha.value.chartCodeAt(0); }
                else if (valorDerecha.type == 2) { if (valorDerecha.value) { valorDer = 1; } else { valorDer = 0; } }
                else { valorDer = Number(valorDerecha.value) }

                return { value: Math.round(valorIz - valorDer), type: dominante }

            } else if (dominante == 1) {
                let valorIz: number, valorDer: number;
                if (valorIzquierda.type == 3) { valorIz = valorIzquierda.value.chartCodeAt(0); }
                else if (valorIzquierda.type == 2) { if (valorIzquierda.value) { valorIz = 1; } else { valorIz = 0; } }
                else { valorIz = Number(valorIzquierda.value) }

                if (valorDerecha.type == 3) { valorDer = valorDerecha.value.chartCodeAt(0); }
                else if (valorDerecha.type == 2) { if (valorDerecha.value) { valorDer = 1; } else { valorDer = 0; } }
                else { valorDer = Number(valorDerecha.value) }

                return { value: valorIz - valorDer, type: dominante }
            }

        } else if (this.operador == 2) {

            if (dominante == 0) {
                let valorIz: number, valorDer: number;
                if (valorIzquierda.type == 3) { valorIz = valorIzquierda.value.chartCodeAt(0); }
                else if (valorIzquierda.type == 2) { if (valorIzquierda.value) { valorIz = 1; } else { valorIz = 0; } }
                else { valorIz = Number(valorIzquierda.value) }

                if (valorDerecha.type == 3) { valorDer = valorDerecha.value.chartCodeAt(0); }
                else if (valorDerecha.type == 2) { if (valorDerecha.value) { valorDer = 1; } else { valorDer = 0; } }
                else { valorDer = Number(valorDerecha.value) }

                return { value: Math.round(valorIz * valorDer), type: dominante }

            } else if (dominante == 1) {
                let valorIz: number, valorDer: number;
                if (valorIzquierda.type == 3) { valorIz = valorIzquierda.value.chartCodeAt(0); }
                else if (valorIzquierda.type == 2) { if (valorIzquierda.value) { valorIz = 1; } else { valorIz = 0; } }
                else { valorIz = Number(valorIzquierda.value) }

                if (valorDerecha.type == 3) { valorDer = valorDerecha.value.chartCodeAt(0); }
                else if (valorDerecha.type == 2) { if (valorDerecha.value) { valorDer = 1; } else { valorDer = 0; } }
                else { valorDer = Number(valorDerecha.value) }

                return { value: valorIz * valorDer, type: dominante }
            }

        }
        else if (this.operador == 3) {

            let valorIz: number, valorDer: number;
            if (valorIzquierda.type == 3) { valorIz = valorIzquierda.value.chartCodeAt(0); }
            else if (valorIzquierda.type == 2) { if (valorIzquierda.value) { valorIz = 1; } else { valorIz = 0; } }
            else { valorIz = Number(valorIzquierda.value) }

            if (valorDerecha.type == 3) { valorDer = valorDerecha.value.chartCodeAt(0); }
            else if (valorDerecha.type == 2) { if (valorDerecha.value) { valorDer = 1; } else { valorDer = 0; } }
            else { valorDer = Number(valorDerecha.value) }

            return { value: valorIz / valorDer, type: dominante }
        }

        else if (this.operador == 4) {

            if (dominante == 0) {
                let valorIz: number, valorDer: number;
                if (valorIzquierda.type == 3) { valorIz = valorIzquierda.value.chartCodeAt(0); }
                else if (valorIzquierda.type == 2) { if (valorIzquierda.value) { valorIz = 1; } else { valorIz = 0; } }
                else { valorIz = Number(valorIzquierda.value) }

                if (valorDerecha.type == 3) { valorDer = valorDerecha.value.chartCodeAt(0); }
                else if (valorDerecha.type == 2) { if (valorDerecha.value) { valorDer = 1; } else { valorDer = 0; } }
                else { valorDer = Number(valorDerecha.value) }

                return { value: Math.round(Math.pow(valorIz, valorDer)), type: dominante }

            } else if (dominante == 1) {
                let valorIz: number, valorDer: number;
                if (valorIzquierda.type == 3) { valorIz = valorIzquierda.value.chartCodeAt(0); }
                else if (valorIzquierda.type == 2) { if (valorIzquierda.value) { valorIz = 1; } else { valorIz = 0; } }
                else { valorIz = Number(valorIzquierda.value) }

                if (valorDerecha.type == 3) { valorDer = valorDerecha.value.chartCodeAt(0); }
                else if (valorDerecha.type == 2) { if (valorDerecha.value) { valorDer = 1; } else { valorDer = 0; } }
                else { valorDer = Number(valorDerecha.value) }

                return { value: Math.pow(valorIz, valorDer), type: dominante }
            }
        }

        else if (this.operador == 5) {
            let valorIz: number, valorDer: number;
            if (valorIzquierda.type == 3) { valorIz = valorIzquierda.value.chartCodeAt(0); }
            else if (valorIzquierda.type == 2) { if (valorIzquierda.value) { valorIz = 1; } else { valorIz = 0; } }
            else { valorIz = Number(valorIzquierda.value) }

            if (valorDerecha.type == 3) { valorDer = valorDerecha.value.chartCodeAt(0); }
            else if (valorDerecha.type == 2) { if (valorDerecha.value) { valorDer = 1; } else { valorDer = 0; } }
            else { valorDer = Number(valorDerecha.value) }

            return { value: valorIz % valorDer, type: dominante }
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
    RELACIONAL =6
}