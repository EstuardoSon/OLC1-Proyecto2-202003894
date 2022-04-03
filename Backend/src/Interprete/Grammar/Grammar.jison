%{
    var tipo = 0;
    var valor = null;
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
\"(\\n|\\\"|\\\'|\\t|\\\\|[^\"\\\n])*\" { yytext = yytext.substr(1,yyleng-2); return 'CADENA'; }; 
[0-9]+(\.[0-9]+)?\b return 'DECIMAL';
[0-9]+\bj return 'ENTERO';
\'(\\n|\\\"|\\\'|\\t|\\\\|[^\'\\\n])\' return 'CARACTER';


//SIMBOLOS
"=" return 'ASIGNACION';
"++" return 'INCREMENTO';
"--" return 'DECREMENTO';
"+" return 'SUMA';
"-" return 'RESTA';
"/" return 'DIVISION';
"^" return 'POTENCIA';
"*" return 'MULTIPLICACION';
"%" return 'MODULO';
"==" return 'IGUAL';
"!" return 'NEGACION';
"!=" return 'DIFERENTE';
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
"\|\|" return 'OR';
"?" return 'TERNARIO';

<<EOF>> return 'EOF';
. {console.log(yylloc.first_line, yylloc.first_column,'Lexico',yytext)}
/lex

%left 'OR'
%left 'AND'
%right 'NEGACION'
%left 'IGUAL' 'DIFERENTE' 'MENOR' 'MENORIGUAL' 'MAYOR' 'MAYORIGUAL'
%left 'SUMA' 'RESTA'
%left 'DIVISION' 'MULTIPLICACION'
%left 'POTENCIA'
%right UMINUS

%start ini

%%

ini
    :Instrucciones EOF{
        return $1;
    }
;

Instrucciones
    : Declaraciones { $$ = $1 }
    |Instrucciones Declaraciones { $$ = $1 +"\n"+$2 }
;

Declaraciones
    : INT Variables { $$ = $1 +" "+$2 }
    | DOUBLE Variables { $$ = $1 +" "+$2 }
    | BOOLEAN Variables { $$ = $1 +" "+$2 }
    | CARACTER Variables { $$ = $1 +" "+$2 }
    | STRING Variables { $$ = $1 +" "+$2 }
;

Variables
    : Variables2 ASIGNACION Valor PTCOMA { $$ = $1 +" = "+$3+";" }
    | Variables2 PTCOMA { $$ = $1 +";" }
;

Variables2
    : Variables2 COMA IDENTIFICADOR { $$ = $1 +", "+ $3 }
    | IDENTIFICADOR { $$ = $1 }
;

Valor
    : RESTA Valor %prec UMINUS { $$ = 0 - Number($2)}
    | Valor POTENCIA Valor { $$ = Math.pow(Number($1), Number($3)) }
    | Valor MULTIPLICACION Valor { $$ = Number($1) * Number($3) }
    | Valor DIVISION Valor { $$ = Number($1) / Number($3) }
    | Valor SUMA Valor { $$ = Number($1) + Number($3) }
    | Valor RESTA Valor {}
    | Valor IGUAL Valor {}
    | Valor DIFERENTE Valor {}
    | Valor MENOR Valor {}
    | Valor MENORIGUAL Valor {}
    | Valor MAYOR Valor {}
    | Valor MAYORIGUAL Valor {}
    | Valor NEGACION Valor {}
    | Valor AND Valor {}
    | Valor TERNARIO Valor {}
    | Valor DOSPT Valor {}
    | PARABRE Valor PARCIERRE {}
    | ENTERO {$$ = Number($1)}
    | DECIMAL { $$ = Number($1) }
    | CADENA {  }
    | CARACTER {}
    | TRUE { $$ = 1 }
    | FALSE { $$ = 0 }
    | IDENTIFICADOR {}
;
