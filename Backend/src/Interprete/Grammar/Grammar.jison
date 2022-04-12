%{
    const {Aritmetica} = require('../Expresion/aritmetica')
    const {Relacional} = require('../Expresion/Relacional')
    const {Negacion} = require('../Expresion/Negacion')
    const {Ternario} = require('../Expresion/Ternario')
    const {TOString, TOLower, TOUpper, LENGHT, LENGHT2, TypeOF} = require('../Expresion/TO')
    const {VectorDec1, VectorDec2, VectorDec3, MatrizDec1, MatrizDec2, InicializacionV, InicializacionM} = require('../Instruccion/ARRAYyMATRIZ')
    const {Casteo} = require('../Expresion/Casteo')
    const {Literal} = require('../Expresion/Literal')
    const {ErrorE} = require('../Error/Error')
    const {Declaracion, Inicializacion} = require('../Instruccion/Declaracion')
    const {Llamado, LlamadoM, LlamadoV} = require('../Expresion/Llamado')
    const {Print, Println} = require('../Instruccion/Print')
    Errores = []
    exports.Errores = Errores
    Impresion = ""
    exports.Impresion = Impresion
%}
    

%lex

%options case-insensitive

%%

\s+ //ESPACIOS EN BLANCO
\/\/[^\n]* //COMENTARIO UNA LINEA
\/\*[^\*]*[\*]+([^/\*][^\*]*(\*)+)*\/ //COMENTARIO MULTILINEA

//PALABRAS RESERVADAS
"int" return 'INT';
"double" return 'DOUBLE';
"boolean" return 'BOOLEAN';
"if" return 'IF';
"switch" return 'SWITCH';
"case" return 'CASE';
"else" return 'ELSE';
"char" return 'CHAR';
"string" return 'STRING';
"true" return 'TRUE';
"false" return 'FALSE';
"break" return 'BREAK';
"continue" return 'CONTINUE';
"return" return 'RETURN';
"do" return 'DO';
"while" return 'WHILE';
"println" return 'PRINTLN';
"print" return 'PRINT';
"tolower" return 'TOLOWER';
"toupper" return 'TOUPPER';
"round" return 'ROUND';
"length" return 'LENGTH';
"typeof" return 'TYPEOF';
"tostring" return 'TOSTRING';
"tochararray" return 'TOCHARARRAY';
"run" return 'RUN';
"new" return 'NEW';

//EXPRESIONES

(_)*[a-zA-ZnÑ]+[_a-zA-Z0-9ñÑ]*\b return 'IDENTIFICADOR';
\"(\\n|\\\"|\\\'|\\t|\\\\|\\r|[^\"\\\n])*\" { yytext = yytext.substr(1,yyleng-2); return 'CADENA'; }; 
[0-9]+(\.[0-9]+)\b return 'DECIMAL';
[0-9]+\b return 'ENTERO';
\'(\\n|\\\"|\\\'|\\t|\\\\|\\r|[^\'\\\n])\' { yytext = yytext.substr(1,yyleng-2); return 'CARACTER'; };


//SIMBOLOS
"++" return 'INCREMENTO';
"--" return 'DECREMENTO';
"+" return 'SUMA';
"-" return 'RESTA';
"/" return 'DIVISION';
"^" return 'POTENCIA';
"*" return 'MULTIPLICACION';
"%" return 'MODULO';
"==" return 'IGUAL';
"=" return 'ASIGNACION';
"!=" return 'DIFERENTE';
"!" return 'NEGACION';
"<=" return 'MENORIGUAL';
"<" return 'MENOR'
">=" return 'MAYORIGUAL';
">" return 'MAYOR';
"(" return 'PARABRE';
")" return 'PARCIERRE';
"[" return 'CORCHETEABRE';
"]" return 'CORCHETECIERRE';
"{" return 'LLAVEABRE';
"}" return 'LLAVECIERRE';
";" return 'PTCOMA';
":" return 'DOSPT';
"," return 'COMA';
"&&" return 'AND';
"||" return 'OR';
"?" return 'TERNARIO';

<<EOF>> return 'EOF';
. { Errores.push(new ErrorE(yylloc.first_line, yylloc.first_column,'Lexico',yytext)) }
/lex

%right 'TERNARIO'
%left 'OR'
%left 'AND'
%right 'NEGACION'
%left 'IGUAL' 'DIFERENTE' 'MENORIGUAL' 'MENOR' 'MAYORIGUAL' 'MAYOR' 
%left 'SUMA' 'RESTA'
%left 'DIVISION' 'MULTIPLICACION' 'MODULO'
%nonassoc 'POTENCIA'
%nonassoc 'DECREMENTO' 'INCREMENTO'
%right CAST1 CAST2 CAST3 CAST4
%right UMINUS
%start ini

%%

ini
    :Instrucciones EOF{
        return $1;
    }
;

Instrucciones
    : TipoInstruccion { $$=$1 }
    | Instrucciones TipoInstruccion { for(let instruccion of $2){ $1.push(instruccion) } $$=$1  }
;

TipoInstruccion
    : Declaraciones 
    | Arreglos
    | Inicializacion
    | Print
    | Println
    | Incremento
    | Decremento
    | error { Errores.push(new ErrorE(this._$.first_line, this._$.first_column,'Sintactico', "Error Sintactico")); $$=[] }
;

TipoVar
    : INT { $$ = 0 }
    | DOUBLE { $$ = 1 }
    | BOOLEAN { $$ = 2 }
    | CHAR { $$ = 3 }
    | STRING { $$ = 4 }
;

Declaraciones
    : TipoVar Variables { var arreglo= []; for(let variable of $2){ arreglo.push(new Declaracion(variable[0],variable[1],variable[2],variable[3],$1)) } $$=arreglo }
;

Arreglos
    : TipoVar IDENTIFICADOR CORCHETEABRE CORCHETECIERRE CORCHETEABRE CORCHETECIERRE ASIGNACION CORCHETEABRE ListaVectores CORCHETECIERRE PTCOMA { $$ = [new MatrizDec1($2, $1, $9, @1.first_line, @1.first_column)] } 
    | TipoVar IDENTIFICADOR CORCHETEABRE CORCHETECIERRE CORCHETEABRE CORCHETECIERRE ASIGNACION NEW TipoVar CORCHETEABRE Valor CORCHETECIERRE CORCHETEABRE Valor CORCHETECIERRE PTCOMA { $$ = [new MatrizDec2($2, $1, $9, $11, $14, @1.first_line, @1.first_column)] }
    | TipoVar IDENTIFICADOR CORCHETEABRE CORCHETECIERRE ASIGNACION CORCHETEABRE ListaValores CORCHETECIERRE PTCOMA { $$ = [new VectorDec1($2, $1, $7, @1.first_line, @1.first_column)] }
    | TipoVar IDENTIFICADOR CORCHETEABRE CORCHETECIERRE ASIGNACION NEW TipoVar CORCHETEABRE Valor CORCHETECIERRE PTCOMA { $$ = [new VectorDec2($2, $1, $7, $9, @1.first_line, @1.first_column)] }
    | TipoVar IDENTIFICADOR CORCHETEABRE CORCHETECIERRE ASIGNACION TOCHARARRAY PARABRE Valor PARCIERRE PTCOMA { $$ = [new VectorDec3($2,$1, $8, @1.first_line, @1.first_column)] }
;

ListaValores
    : ListaValores COMA Valor { $1.push($3); $$ = $1 }
    | Valor { $$ = [$1] }
;

ListaVectores
    : ListaVectores COMA CORCHETEABRE ListaValores CORCHETECIERRE { $1.push($4); $$ = $1 }
    | CORCHETEABRE ListaValores CORCHETECIERRE { $$ = [$2] }
;

Inicializacion
    : IDENTIFICADOR ASIGNACION Valor PTCOMA { $$ = [new Inicializacion(@1.first_line, @1.first_column, $1, $3)] }
    | IDENTIFICADOR CORCHETEABRE Valor CORCHETECIERRE ASIGNACION Valor PTCOMA { $$ = [new InicializacionV($1, $3, $6, @1.first_line, @1.first_column)] }
    | IDENTIFICADOR CORCHETEABRE Valor CORCHETECIERRE CORCHETEABRE Valor CORCHETECIERRE ASIGNACION Valor PTCOMA { $$ = [new InicializacionM($1, $3, $6, $9, @1.first_line, @1.first_column)] }
;

Variables
    : Variables2 ASIGNACION Valor PTCOMA { for( i in $1 ){ $1[i][3] = $3 } $$ = $1 }
    | Variables2 PTCOMA { $$ = $1 }
;

Variables2
    : Variables2 COMA IDENTIFICADOR { $1.push([@1.first_line, @1.first_column, $3, null]); $$ = $1  }
    | IDENTIFICADOR { $$ =[ [@1.first_line, @1.first_column, $1, null] ] }
;

Valor
    : RESTA Valor %prec UMINUS { $$ = new Aritmetica($2,new Literal(-1, 0, @1.first_line, @1.first_column),2, @1.first_line, @1.first_column)}
    | Valor POTENCIA Valor { $$ = new Aritmetica($1,$3,4, @1.first_line, @1.first_column) }
    | Valor MULTIPLICACION Valor { $$ = new Aritmetica($1,$3,2, @1.first_line, @1.first_column) }
    | Valor DIVISION Valor { $$ = new Aritmetica($1,$3,3, @1.first_line, @1.first_column) }
    | Valor SUMA Valor { $$ = new Aritmetica($1,$3,0, @1.first_line, @1.first_column) }
    | Valor RESTA Valor { $$ = new Aritmetica($1,$3,1, @1.first_line, @1.first_column) }
    | Valor MODULO Valor { $$ = new Aritmetica($1,$3,5, @1.first_line, @1.first_column) }
    | Valor IGUAL Valor { $$ = new Relacional($1,$3,0, @1.first_line, @1.first_column) }
    | Valor DIFERENTE Valor { $$ = new Relacional($1,$3,1, @1.first_line, @1.first_column) }
    | Valor MENOR Valor { $$ = new Relacional($1,$3,4, @1.first_line, @1.first_column) }
    | Valor MENORIGUAL Valor {$$ = new Relacional($1,$3,5, @1.first_line, @1.first_column)}
    | Valor MAYOR Valor { $$ = new Relacional($1,$3,2, @1.first_line, @1.first_column) }
    | Valor MAYORIGUAL Valor { $$ = new Relacional($1,$3,3, @1.first_line, @1.first_column) }
    | Valor OR Valor { $$ = new Relacional($1,$3,7, @1.first_line, @1.first_column) }
    | Valor AND Valor { $$ = new Relacional($1,$3,6, @1.first_line, @1.first_column) }
    | Valor INCREMENTO { $$ = new Aritmetica($1,new Literal(1, 0, @1.first_line, @1.first_column),7, @1.first_line, @1.first_column) }
    | Valor DECREMENTO { $$ = new Aritmetica($1,new Literal(1, 0, @1.first_line, @1.first_column),8, @1.first_line, @1.first_column) }
    | Valor TERNARIO Valor DOSPT Valor { $$ = new Ternario($1, $3, $5, @1.first_line, @1.first_column) } 
    | NEGACION Valor { $$ = new Negacion($2,2, @1.first_line, @1.first_column) }
    | PARABRE Valor PARCIERRE { $$ = $2 }
    | ENTERO {$$ = new Literal($1,0, @1.first_line, @1.first_column) }
    | DECIMAL { $$ = new Literal($1,1, @1.first_line, @1.first_column) }
    | CADENA { $$ = new Literal($1, 4, @1.first_line, @1.first_column) }
    | CARACTER { $$ = new Literal($1, 3, @1.first_line, @1.first_column) }
    | TRUE { $$ = new Literal(true, 2, @1.first_line, @1.first_column) }
    | FALSE { $$ = new Literal(false, 2, @1.first_line, @1.first_column) }
    | IDENTIFICADOR { $$ = new Llamado($1, @1.first_line, @1.first_column) }
    | IDENTIFICADOR CORCHETEABRE Valor CORCHETECIERRE CORCHETEABRE Valor CORCHETECIERRE { $$ = new LlamadoM($1, $3, $6, @1.first_line, @1.first_column) }
    | IDENTIFICADOR CORCHETEABRE Valor CORCHETECIERRE { $$ = new LlamadoV($1, $3, @1.first_line, @1.first_column) }
    | PARABRE TipoVar PARCIERRE Valor %prec CAST1 { $$ = new Casteo($4, $2, @1.first_line, @1.first_column) }
    | TOSTRING PARABRE Valor PARCIERRE { $$ = new TOString($3, @1.first_line, @1.first_column) }
    | LENGTH PARABRE Valor PARCIERRE { $$ = new LENGHT($3, @1.first_line, @1.first_column) }
    | LENGTH PARABRE CORCHETEABRE ListaValores CORCHETECIERRE PARCIERRE { $$ = new LENGHT2($4, @1.first_line, @1.first_column) }
    | LENGTH PARABRE CORCHETEABRE ListaVectores CORCHETECIERRE PARCIERRE { $$ = new LENGHT2($4, @1.first_line, @1.first_column) }
    | TOLOWER PARABRE Valor PARCIERRE { $$ = new TOLower($3, @1.first_line, @1.first_column) }
    | TOUPPER PARABRE Valor PARCIERRE { $$ = new TOUpper($3, @1.first_line, @1.first_column) }
    | TYPEOF PARABRE Valor PARCIERRE { $$ = new TypeOF($3, @1.first_line, @1.first_column) }
;

Print
    : PRINT PARABRE Valor PARCIERRE PTCOMA { $$ = [new Print(@1.first_line, @1.first_column,$3)] }
;

Println
    : PRINTLN PARABRE Valor PARCIERRE PTCOMA { $$ = [new Println(@1.first_line, @1.first_column,$3)] }
;

Incremento
    : IDENTIFICADOR INCREMENTO PTCOMA { $$ = [new Inicializacion(@1.first_line, @1.first_column, $1, new Aritmetica( new Llamado($1, @1.first_line, @1.first_column), new Literal(1, 0, @1.first_line, @1.first_column),7, @1.first_line, @1.first_column))] }
    | IDENTIFICADOR CORCHETEABRE Valor CORCHETECIERRE INCREMENTO PTCOMA { $$ = [new InicializacionV($1, $3, new Aritmetica( new LlamadoV($1, $3, @1.first_line, @1.first_column), new Literal(1, 0, @1.first_line, @1.first_column),7, @1.first_line, @1.first_column), @1.first_line, @1.first_column)]}
    | IDENTIFICADOR CORCHETEABRE Valor CORCHETECIERRE CORCHETEABRE Valor CORCHETECIERRE INCREMENTO PTCOMA { $$ = [new InicializacionM($1, $3, $6, new Aritmetica( $$ = new LlamadoM($1, $3, $6, @1.first_line, @1.first_column), new Literal(1, 0, @1.first_line, @1.first_column),7, @1.first_line, @1.first_column), @1.first_line, @1.first_column)] }
;

Decremento
    : IDENTIFICADOR DECREMENTO PTCOMA { $$ = [new Inicializacion(@1.first_line, @1.first_column, $1, new Aritmetica( new Llamado($1, @1.first_line, @1.first_column), new Literal(1, 0, @1.first_line, @1.first_column),8, @1.first_line, @1.first_column))] }
    | IDENTIFICADOR CORCHETEABRE Valor CORCHETECIERRE DECREMENTO PTCOMA { $$ = [new InicializacionV($1, $3, new Aritmetica( new LlamadoV($1, $3, @1.first_line, @1.first_column), new Literal(1, 0, @1.first_line, @1.first_column),8, @1.first_line, @1.first_column), @1.first_line, @1.first_column)]}
    | IDENTIFICADOR CORCHETEABRE Valor CORCHETECIERRE CORCHETEABRE Valor CORCHETECIERRE DECREMENTO PTCOMA { $$ = [new InicializacionM($1, $3, $6, new Aritmetica( $$ = new LlamadoM($1, $3, $6, @1.first_line, @1.first_column), new Literal(1, 0, @1.first_line, @1.first_column),8, @1.first_line, @1.first_column), @1.first_line, @1.first_column)] }
;