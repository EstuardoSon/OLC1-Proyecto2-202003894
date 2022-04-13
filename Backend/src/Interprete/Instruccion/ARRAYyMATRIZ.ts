import { ErrorE } from "../Error/Error";
import { Ambito } from "../Extra/Ambito";
import { Expresion } from "../Expresion/Expresion";
import { Type } from "../Expresion/Retorno";
import { Instruccion } from "./Instruccion";


export class VectorDec1 extends Instruccion {
    constructor(private nombre: string, private tipo: Type, private contenido: Array<Expresion>, linea: number, columna: number) {
        super(linea, columna);
    }

    public ejecutar(ambito: Ambito) {
        const vector = [];

        for (let valor of this.contenido) {
            let dato = valor.ejecutar(ambito);

            if (dato.type == this.tipo) {
                vector.push(dato.value);
                continue;
            }
            throw new ErrorE(this.linea, this.columna, 'Semantico', 'El dato: ' + dato.value + ' del arreglo: ' + this.nombre + ' no es del tipo correspondiente');
        }

        ambito.setValV(this.nombre, vector, this.tipo, this.linea, this.columna)
    }
}
export class VectorDec3 extends Instruccion {
    constructor(private nombre: string, private tipo: Type, private valor: Expresion, linea: number, columna: number) {
        super(linea, columna);
    }

    public ejecutar(ambito: Ambito) {
        let dato = this.valor.ejecutar(ambito);

        if(this.tipo != 3){ throw new ErrorE(this.linea, this.columna, 'Semantico', 'El tipo del vector no es el adecuado para ejecutar la funcion ToCharArray'); }

        if(dato.type == 4 && typeof(dato.value) == 'string'){
            ambito.setValV(this.nombre, String(dato.value).split(""), this.tipo, this.linea, this.columna)
        }
        else{
            throw new ErrorE(this.linea, this.columna, 'Semantico', 'No se puede ejecutar la funcion ToCharArray ya que: ' + dato.value + ' no es una cadena String');
        }
    }
}

export class VectorDec2 extends Instruccion {
    constructor(private nombre: string, private tipo: Type, private tipoV: Type, private tamanio: Expresion, linea: number, columna: number) {
        super(linea, columna);
    }

    public ejecutar(ambito: Ambito) {
        if (this.tipo != this.tipoV) {
            throw new ErrorE(this.linea, this.columna, 'Semantico', 'Los tipos en la declaracion del arreglo: ' + this.nombre + ' no concuerdan');
        }

        const dato = this.tamanio.ejecutar(ambito);

        if (dato.type == 0) {
            if (dato.value <= 0) { throw new ErrorE(this.linea, this.columna, 'Semantico', 'El indice ingresado debe ser positivo'); }

            let vector = [];

            for (let i = 0; i < dato.value; i++) {
                vector.push(null);
            }
            ambito.setValV(this.nombre, vector, this.tipo, this.linea, this.columna)
        }
        else {
            throw new ErrorE(this.linea, this.columna, 'Semantico', 'El dato: ' + dato.value + ' del arreglo: ' + this.nombre + ' no es del tipo correspondiente');
        }
    }
}

export class MatrizDec1 extends Instruccion {
    constructor(private nombre: string, private tipo: Type, private contenido: Array<Array<Expresion>>, linea: number, columna: number) {
        super(linea, columna);
    }

    public ejecutar(ambito: Ambito) {
        const matriz = [];
        let tamanioFila = 0;

        for (let i in this.contenido) {

            if (Number(i) == 0) {
                tamanioFila = this.contenido[i].length
                let arreglo = [];

                for (let valor of this.contenido[i]) {
                    let dato = valor.ejecutar(ambito)

                    if (dato.type == this.tipo) {
                        arreglo.push(dato.value)
                    } else {
                        throw new ErrorE(this.linea, this.columna, 'Semantico', 'El dato: ' + dato.value + ' de la matriz: ' + this.nombre + ' no es del tipo correspondiente');
                    }
                }
                matriz.push(arreglo)

            } else if (Number(i) != 0) {
                if (tamanioFila == this.contenido[i].length) {
                    let arreglo = [];

                    for (let valor of this.contenido[i]) {
                        let dato = valor.ejecutar(ambito)

                        if (dato.type == this.tipo) {
                            arreglo.push(dato.value)
                        } else {
                            throw new ErrorE(this.linea, this.columna, 'Semantico', 'El dato: ' + dato.value + ' de la matriz: ' + this.nombre + ' no es del tipo correspondiente');
                        }
                    }
                    matriz.push(arreglo)
                }
                else {
                    throw new ErrorE(this.linea, this.columna, 'Semantico', 'Las filas dentro de la matriz: ' + this.nombre + ' no son de la misma longitud');
                }
            }
        }

        ambito.setValM(this.nombre, matriz, this.tipo, this.linea, this.columna)
    }
}

export class MatrizDec2 extends Instruccion {
    constructor(private nombre: string, private tipo: Type, private tipoV: Type, private filas: Expresion, private columnas: Expresion, linea: number, columna: number) {
        super(linea, columna);
    }

    public ejecutar(ambito: Ambito) {
        const matriz = [];

        if (this.tipo != this.tipoV) { throw new ErrorE(this.linea, this.columna, 'Semantico', 'Los tipos en la declaracion de la matriz: ' + this.nombre + ' no concuerdan'); }

        let tamanioFila = this.filas.ejecutar(ambito);
        let tamanioColumna = this.columnas.ejecutar(ambito);

        if (tamanioFila.type != 0 || tamanioColumna.type != 0) { throw new ErrorE(this.linea, this.columna, 'Semantico', 'El valor de las filas o columnas no es un entero'); }

        if (tamanioFila.value <= 0) { throw new ErrorE(this.linea, this.columna, 'Semantico', 'El indice ingresado en Fila debe ser positivo'); }
        if (tamanioFila.value <= 0) { throw new ErrorE(this.linea, this.columna, 'Semantico', 'El indice ingresado en Columna debe ser positivo'); }

        for (let i = 0; i < tamanioFila.value; i++) {
            let vector = []
            for (let i = 0; i < tamanioFila.value; i++) {
                vector.push(null);
            }
            matriz.push(vector)
        }

        ambito.setValM(this.nombre, matriz, this.tipo, this.linea, this.columna)
    }
}

export class InicializacionV extends Instruccion {
    constructor(public nombre: string, public celda: Expresion, public valor: Expresion, linea: number, columna: number) {
        super(linea, columna);
    }

    public ejecutar(ambito: Ambito) {
        let value = this.valor.ejecutar(ambito);

        let busqueda = ambito.getVal(this.nombre);
        if (busqueda != null && busqueda.primitivo == 1) {
            let arrayB = busqueda.valor;

            let celdaV = this.celda.ejecutar(ambito);
            if (celdaV.type != 0) { throw new ErrorE(this.linea, this.columna, 'Semantico', 'El indice ingresado no es un entero'); }
            if (celdaV.value < 0 || celdaV.value >= arrayB.length) { throw new ErrorE(this.linea, this.columna, 'Semantico', 'El indice especificado no existe dentro del arreglo'); }

            if (busqueda.tipo == value.type) {
                arrayB[celdaV.value] = value.value
                ambito.modValV(this.nombre, arrayB, busqueda.tipo)
            }
            else { throw new ErrorE(this.linea, this.columna, 'Semantico', 'El dato: ' + value.value + ' no se puede ingresar al arreglo porque no es del tipo adecuado'); }
        }
        else {
            throw new ErrorE(this.linea, this.columna, 'Semantico', 'No existe un vector con el nombre: ' + this.nombre);
        }
    }
}

export class InicializacionM extends Instruccion {
    constructor(public nombre: string, public fila: Expresion, public celda: Expresion, public valor: Expresion, linea: number, columna: number) {
        super(linea, columna);
    }

    public ejecutar(ambito: Ambito) {
        let value = this.valor.ejecutar(ambito);

        let busqueda = ambito.getVal(this.nombre);
        if (busqueda != null && busqueda.primitivo == 2) {
            let arrayB = busqueda.valor;

            let celdaV = this.celda.ejecutar(ambito);
            let filaV = this.fila.ejecutar(ambito);

            if (filaV.type != 0) { throw new ErrorE(this.linea, this.columna, 'Semantico', 'El indice ingresado en Fila no es un entero'); }
            if (filaV.value < 0 || celdaV.value >= arrayB.length) { throw new ErrorE(this.linea, this.columna, 'Semantico', 'El indice especificado en Fila no existe dentro de la matriz'); }

            if (celdaV.type != 0) { throw new ErrorE(this.linea, this.columna, 'Semantico', 'El indice ingresado en Columna no es un entero'); }
            if (celdaV.value < 0 || celdaV.value >= arrayB.length) { throw new ErrorE(this.linea, this.columna, 'Semantico', 'El indice especificado en Columna no existe dentro de la matriz'); }

            if (busqueda.tipo == value.type) {
                arrayB[filaV.value][celdaV.value] = value.value
                ambito.modValM(this.nombre, arrayB, busqueda.tipo)
            }
            else { throw new ErrorE(this.linea, this.columna, 'Semantico', 'El dato: ' + value.value + ' no se puede ingresar al arreglo porque no es del tipo adecuado'); }
        }
        else {
            throw new ErrorE(this.linea, this.columna, 'Semantico', 'No existe una matriz con el nombre: ' + this.nombre);
        }
    }
}