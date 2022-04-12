import { Type } from "../Expresion/Retorno";
import { tipoDato } from "../Instruccion/EnumTipoDato";

export class Simbolo {
    constructor(public valor:any,public id:string, public tipo:Type, public primitivo: tipoDato){ }
}