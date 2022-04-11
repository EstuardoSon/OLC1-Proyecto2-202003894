import { ErrorE } from "../Error/Error";
import { Ambito } from "../Extra/Ambito";
import { Expresion } from "./Expresion";
import { Retorno, Type } from "./Retorno";


export class TOString extends Expresion {
    constructor(private valor: Expresion, linea: number, columna: number) {
        super(linea, columna);
    }

    public ejecutar(ambito: Ambito): Retorno {
        const value = this.valor.ejecutar(ambito)

        if (value.type == 0 || value.type == 1 || value.type == 3) {
            return { value: String(value.value), type: 4 }
        }
        throw new ErrorE(this.linea, this.columna, 'Semantico', 'No es posible la conversion a String de: '+ value.value +" ya que no es Numerico o Booleano");
    }
}

export class TOUpper extends Expresion {
    constructor(private valor: Expresion, linea: number, columna: number) {
        super(linea, columna);
    }

    public ejecutar(ambito: Ambito): Retorno {
        const value = this.valor.ejecutar(ambito)

        if (value.type == 4) {
            return { value: String(value.value).toUpperCase(), type: 4 }
        }
        throw new ErrorE(this.linea, this.columna, 'Semantico', 'No es posible ejecutar la funcion ToUpper ya que: '+value.value+' no es un String');
    }
}

export class TOLower extends Expresion {
    constructor(private valor: Expresion, linea: number, columna: number) {
        super(linea, columna);
    }

    public ejecutar(ambito: Ambito): Retorno {
        const value = this.valor.ejecutar(ambito)

        if (value.type == 4) {
            return { value: String(value.value).toLowerCase(), type: 4 }
        }
        throw new ErrorE(this.linea, this.columna, 'Semantico', 'No es posible ejecutar la funcion ToLower ya que: '+value.value+' no es un String');
    }
}

export class LENGHT extends Expresion {
    constructor(private valor: Expresion, linea: number, columna: number) {
        super(linea, columna);
    }

    public ejecutar(ambito: Ambito): Retorno {
        const value = this.valor.ejecutar(ambito)

        if (value.type == 4) {
            return { value: String(value.value).length, type: 0 }
        }
        throw new ErrorE(this.linea, this.columna, 'Semantico', 'No es posible ejecutar la funcion ToLower ya que: '+value.value+' no es un String');
    }
}
