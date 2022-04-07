%{
    const {Aritmetica} = require('../Expresion/aritmetica')
    const {Relacional} = require('../Expresion/Relacional')
    const {Negacion} = require('../Expresion/Negacion')
    const {Ternario} = require('../Expresion/Ternario')
    const {Literal} = require('../Expresion/Literal')
    const {ErrorE} = require('../Error/Error')
    const {Declaracion, Inicializacion} = require('../Instruccion/Declaracion')
    const {Llamado} = require('../Expresion/Llamado')
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
%left 'IGUAL' 'DIFERENTE' 'MENOR' 'MENORIGUAL' 'MAYOR' 'MAYORIGUAL'
%left 'SUMA' 'RESTA'
%left 'DIVISION' 'MULTIPLICACION'
%nonassoc 'POTENCIA'
%nonassoc 'DECREMENTO' 'INCREMENTO'
%nonassoc 'NEGACION'
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
    | Inicializacion
    | Print
    | Println
    | error PTCOMA { Errores.push(new ErrorE(this._$.first_line, this._$.first_column,'Sintactico', "Error Sintactico")); $$=[] }
;

Declaraciones
    : INT Variables { var arreglo= []; for(let variable of $2){ arreglo.push(new Declaracion(variable[0],variable[1],variable[2],variable[3],0)) } $$=arreglo }
    | DOUBLE Variables { var arreglo= []; for(let variable of $2){ arreglo.push(new Declaracion(variable[0],variable[1],variable[2],variable[3],1)) } $$=arreglo }
    | BOOLEAN Variables { var arreglo= []; for(let variable of $2){ arreglo.push(new Declaracion(variable[0],variable[1],variable[2],variable[3],2)) } $$=arreglo }
    | CHAR Variables { var arreglo= []; for(let variable of $2){ arreglo.push(new Declaracion(variable[0],variable[1],variable[2],variable[3],3)) } $$=arreglo }
    | STRING Variables { var arreglo= []; for(let variable of $2){ arreglo.push(new Declaracion(variable[0],variable[1],variable[2],variable[3],4)) } $$=arreglo }
;

Inicializacion
    : IDENTIFICADOR ASIGNACION Valor PTCOMA { $$ = [new Inicializacion(@1.first_line, @1.first_column, $1, $3)] }
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
    | PARABRE INT PARCIERRE Valor {}
    | PARABRE DOUBLE PARCIERRE Valor {}
    | PARABRE CHAR PARCIERRE Valor {}
    | PARABRE STRING PARCIERRE Valor {}
;

Print
    : PRINT PARABRE Valor PARCIERRE PTCOMA { $$ = [new Print(@1.first_line, @1.first_column,$3)] }
;

Println
    : PRINTLN PARABRE Valor PARCIERRE PTCOMA { $$ = [new Println(@1.first_line, @1.first_column,$3)] }
;