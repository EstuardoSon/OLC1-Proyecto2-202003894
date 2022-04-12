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

        if (typeof(value.value) == 'object'){ throw new ErrorE(this.linea, this.columna, 'Semantico', 'No es posible ejecutar la funcion ToLower ya que: ['+value.value+'] no es un dato primitivo apropiado'); }

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

        if (typeof(value.value) == 'object'){ throw new ErrorE(this.linea, this.columna, 'Semantico', 'No es posible ejecutar la funcion ToLower ya que: ['+value.value+'] no es un String'); }

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
        
        if (typeof(value.value) == 'object'){ throw new ErrorE(this.linea, this.columna, 'Semantico', 'No es posible ejecutar la funcion ToLower ya que: ['+value.value+'] no es un String'); }

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

        if (typeof(value.value) == 'object'){ return { value: value.value.length, type: 0 } }
        if (value.type == 4) { return { value: value.value.length, type: 0 } }
        
        throw new ErrorE(this.linea, this.columna, 'Semantico', 'No es posible ejecutar la funcion Length ya que: '+value.value+' no es un String o un Vector');
    }
}

export class LENGHT2 extends Expresion {
    constructor(private valor: Array<any>, linea: number, columna: number) {
        super(linea, columna);
    }

    public ejecutar(ambito: Ambito): Retorno {
        return { value: this.valor.length, type: 0 } 
    }
}

export class TypeOF extends Expresion{
    constructor(private valor: Expresion, linea: number, columna: number) {
        super(linea, columna);
    }

    public ejecutar(ambito: Ambito): Retorno {
        const value = this.valor.ejecutar(ambito)

        if (typeof(value.value) == 'object' && typeof(value.value[0]) == 'object'){ return { value: "Matriz", type: 4 } }
        else if (typeof(value.value) == 'object'){ return { value: "Vector", type: 4 }}
        else if (value.type == 0) { return { value: "Int", type: 4 } }
        else if (value.type == 1) { return { value: "Double", type: 4 } }
        else if (value.type == 2) { return { value: "Boolean", type: 4 } }
        else if (value.type == 3) { return { value: "Char", type: 4 } }
        else if (value.type == 4) { return { value: "String", type: 4 } }
        
        throw new ErrorE(this.linea, this.columna, 'Semantico', 'No fue posible reconocer el tipo de: '+value.value);
    }
}