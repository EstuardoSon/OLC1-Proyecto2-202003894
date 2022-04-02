%{
    //imports
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
    : Declaraciones {$$ = $1}
    |Instrucciones Declaraciones {$$ = $1 + $2}
;

Declaraciones
    : INT Variables PTCOMA {$$ = $1+$2+$3}
    | DOUBLE Variables PTCOMA {$$ = $1+$2+$3}
    | BOOLEAN Variables PTCOMA {$$ = $1+$2+$3}
    | CARACTER Variables PTCOMA {$$ = $1+$2+$3}
    | STRING Variables PTCOMA {$$ = $1+$2+$3}
;

Variables
    : IDENTIFICADOR {$$ = $1}
    | IDENTIFICADOR ASIGNACION  {$$ = $1}
    | Variables COMA IDENTIFICADOR {$$ = $1+$2+" "+$3}
     
;
