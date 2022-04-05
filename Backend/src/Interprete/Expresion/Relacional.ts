import { Expresion } from "./Expresion";
import { Retorno } from "./Retorno";


export class Relacional extends Expresion {
    constructor(private izq: Expresion, private der: Expresion, private tipo: tipoRelacional, linea: number, columna: number) {
        super(linea, columna);
    }

    public ejecutar(): Retorno {
        const valorIzquierda = this.izq.ejecutar();
        const valorDerecha = this.der.ejecutar();

        var dominante = this.tipoDominante(6, valorIzquierda.type, valorDerecha.type);

        if (dominante != null) {
            let valorIz: any, valorDer: any;
            if (valorIzquierda.type == 3) { valorIz = valorIzquierda.value.chartCodeAt(0); }
            else if (valorIzquierda.type == 2) { if (valorIzquierda.value) { valorIz = 1; } else { valorIz = 0; } }
            else if (valorIzquierda.type == 4) { valorIz = valorIzquierda.value.toString(); }
            else { valorIz = Number(valorIzquierda.value) }

            if (valorDerecha.type == 3) { valorDer = valorDerecha.value.chartCodeAt(0); }
            else if (valorDerecha.type == 2) { if (valorDerecha.value) { valorDer = 1; } else { valorDer = 0; } }
            else if (valorDerecha.type == 4) { valorDer = valorDerecha.value.toString(); }
            else { valorDer = Number(valorDerecha.value) }

            if (this.tipo == 0) {
                const result = valorIz == valorDer
                return { value: result, type: dominante }

            } else if (this.tipo == 1) {
                const result = valorIz != valorDer
                return { value: result, type: dominante }

            } else if (this.tipo == 2) {
                const result = valorIz > valorDer
                return { value: result, type: dominante }

            } else if (this.tipo == 3) {
                const result = valorIz >= valorDer
                return { value: result, type: dominante }

            } else if (this.tipo == 4) {
                const result = valorIz < valorDer
                return { value: result, type: dominante }

            } else if (this.tipo == 5) {
                const result = valorIz <= valorDer
                return { value: result, type: dominante }

            } else if (this.tipo == 6) {
                const result = valorIz && valorDer
                return { value: result, type: dominante }

            } else if (this.tipo == 7) {
                const result = valorIz || valorDer
                return { value: result, type: dominante }
            }
        }
        return { value: null, type: null }
    }
}

export enum tipoRelacional {
    IGUAL = 0,
    DIFERENTE = 1,
    MAYOR = 2,
    MAYORIGUAL = 3,
    MENOR = 4,
    MENORIGUAL = 5,
    AND = 6,
    OR = 7
}