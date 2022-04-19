%{
    const {Aritmetica} = require('../Expresion/aritmetica')
    const {Relacional} = require('../Expresion/Relacional')
    const {Negacion} = require('../Expresion/Negacion')
    const {Ternario} = require('../Expresion/Ternario')
    const {TOString, TOLower, TOUpper, LENGHT, LENGHT2, TypeOF, Redondear} = require('../Expresion/TO')
    const {VectorDec1, VectorDec2, VectorDec3, MatrizDec1, MatrizDec2, InicializacionV, InicializacionM} = require('../Instruccion/ARRAYyMATRIZ')
    const {Casteo} = require('../Expresion/Casteo')
    const {Literal} = require('../Expresion/Literal')
    const {ErrorE} = require('../Error/Error')
    const {If} = require('../Instruccion/If')
    const {Ciclo} = require('../Instruccion/Ciclo')
    const {BREAK} = require('../Instruccion/BreakContinue')
    const {Entorno,EntornoI, EntornoC, EntornoD, EntornoCase, EntornoW} = require('../Instruccion/Entorno')
    const {Declaracion, Inicializacion} = require('../Instruccion/Declaracion')
    const {Switch} = require('../Instruccion/Switch')
    const {Llamado, LlamadoM, LlamadoV} = require('../Expresion/Llamado')
    const {Print, Println} = require('../Instruccion/Print')
    const {Arbol} = require('../Extra/Arbol')
    Errores = []
    exports.Errores = Errores
    Impresion = ""
    exports.Impresion = Impresion
    arbol = new Arbol();
    exports.arbol = arbol

    TablaSimbolos =[]
    exports.TablaSimbolos = TablaSimbolos
%}
    

%lex

%options case-insensitive

%%

\s+ //ESPACIOS EN BLANCO
\/\/[^\n]* //COMENTARIO UNA LINEA
\/\*[^\*]*[\*]+([^/\*][^\*]*(\*)+)*\/ //COMENTARIO MULTILINEA

//PALABRAS RESERVADAS
"void" return 'VOID';
"int" return 'INT';
"double" return 'DOUBLE';
"boolean" return 'BOOLEAN';
"switch" return 'SWITCH';
"case" return 'CASE';
"if" return 'IF';
"else" return 'ELSE';
"char" return 'CHAR';
"string" return 'STRING';
"true" return 'TRUE';
"false" return 'FALSE';
"break" return 'BREAK';
"continue" return 'CONTINUE';
"default" return 'DEFAULT';
"return" return 'RETURN';
"do" return 'DO';
"while" return 'WHILE';
"for" return 'FOR';
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
%right CAST1
%right UMINUS
%start ini

%%

ini
    :Instrucciones EOF{
        arbol.generarIni();
        return $1;
    }
;

Instrucciones
    : TipoInstruccion { arbol.generarInstrucciones(); $$=$1 }
    | Instrucciones TipoInstruccion { arbol.generarInstrucciones2(); for(let instruccion of $2){ $1.push(instruccion) } $$=$1  }
;

TipoInstruccion
    : Declaraciones { arbol.generarTipoInstruccion(); }
    | Inicializacion PTCOMA { arbol.generarTipoInstruccion2();  $$ = $1 }
    | Print { arbol.generarTipoInstruccion(); }
    | If { arbol.generarTipoInstruccion(); $$ = [$1] }
    | Ciclo { arbol.generarTipoInstruccion(); }
    | Break { arbol.generarTipoInstruccion(); }
    | Switch { arbol.generarTipoInstruccion(); }
    | error PTCOMA { Errores.push(new ErrorE(this._$.first_line, this._$.first_column,'Sintactico', "Error Sintactico token inesperado Recouperado con: ;"  )); $$=[] }
;

TipoVar
    : INT { arbol.generarTipoVar("Int"); $$ = 0 }
    | DOUBLE { arbol.generarTipoVar("Double"); $$ = 1 }
    | BOOLEAN { arbol.generarTipoVar("Boolean"); $$ = 2 }
    | CHAR { arbol.generarTipoVar("Char"); $$ = 3 }
    | STRING { arbol.generarTipoVar("String"); $$ = 4 }
;

Declaraciones
    : TipoVar Variables { arbol.generarDeclaraciones(); var arreglo= []; for(let variable of $2){ arreglo.push(new Declaracion(variable[0],variable[1],variable[2],variable[3],$1)) } $$=arreglo }
    | TipoVar IDENTIFICADOR CORCHETEABRE CORCHETECIERRE CORCHETEABRE CORCHETECIERRE ASIGNACION CORCHETEABRE ListaVectores CORCHETECIERRE PTCOMA { arbol.generarDeclaraciones1($2); $$ = [new MatrizDec1($2, $1, $9, @1.first_line, @1.first_column)] } 
    | TipoVar IDENTIFICADOR CORCHETEABRE CORCHETECIERRE CORCHETEABRE CORCHETECIERRE ASIGNACION NEW TipoVar CORCHETEABRE Valor CORCHETECIERRE CORCHETEABRE Valor CORCHETECIERRE PTCOMA { arbol.generarDeclaraciones2($2); $$ = [new MatrizDec2($2, $1, $9, $11, $14, @1.first_line, @1.first_column)] }
    | TipoVar IDENTIFICADOR CORCHETEABRE CORCHETECIERRE ASIGNACION CORCHETEABRE ListaValores CORCHETECIERRE PTCOMA { arbol.generarDeclaraciones3($2); $$ = [new VectorDec1($2, $1, $7, @1.first_line, @1.first_column)] }
    | TipoVar IDENTIFICADOR CORCHETEABRE CORCHETECIERRE ASIGNACION NEW TipoVar CORCHETEABRE Valor CORCHETECIERRE PTCOMA { arbol.generarDeclaraciones4($2); $$ = [new VectorDec2($2, $1, $7, $9, @1.first_line, @1.first_column)] }
    | TipoVar IDENTIFICADOR CORCHETEABRE CORCHETECIERRE ASIGNACION TOCHARARRAY PARABRE Valor PARCIERRE PTCOMA { arbol.generarDeclaraciones5($2); $$ = [new VectorDec3($2,$1, $8, @1.first_line, @1.first_column)] }
;

ListaValores
    : ListaValores COMA Valor { arbol.generarListaValores2(); $1.push($3); $$ = $1 }
    | Valor { arbol.generarListaValores(); $$ = [$1] }
;

ListaVectores
    : ListaVectores COMA CORCHETEABRE ListaValores CORCHETECIERRE { arbol.generarListaVectores2(); $1.push($4); $$ = $1 }
    | CORCHETEABRE ListaValores CORCHETECIERRE { arbol.generarListaVectores(); $$ = [$2] }
;

Inicializacion
    : IDENTIFICADOR INCREMENTO { arbol.generarInicializacion($1,$2); $$ = [new Inicializacion(@1.first_line, @1.first_column, $1, new Aritmetica( new Llamado($1, @1.first_line, @1.first_column), new Literal(1, 0, @1.first_line, @1.first_column),7, @1.first_line, @1.first_column))] }
    | IDENTIFICADOR CORCHETEABRE Valor CORCHETECIERRE INCREMENTO  { arbol.generarInicializacion2($1,$5); $$ = [new InicializacionV($1, $3, new Aritmetica( new LlamadoV($1, $3, @1.first_line, @1.first_column), new Literal(1, 0, @1.first_line, @1.first_column),7, @1.first_line, @1.first_column), @1.first_line, @1.first_column)]}
    | IDENTIFICADOR CORCHETEABRE Valor CORCHETECIERRE CORCHETEABRE Valor CORCHETECIERRE INCREMENTO  { arbol.generarInicializacion3($1,$8); $$ = [new InicializacionM($1, $3, $6, new Aritmetica( $$ = new LlamadoM($1, $3, $6, @1.first_line, @1.first_column), new Literal(1, 0, @1.first_line, @1.first_column),7, @1.first_line, @1.first_column), @1.first_line, @1.first_column)] }
    | IDENTIFICADOR DECREMENTO { arbol.generarInicializacion($1,$2); $$ = [new Inicializacion(@1.first_line, @1.first_column, $1, new Aritmetica( new Llamado($1, @1.first_line, @1.first_column), new Literal(1, 0, @1.first_line, @1.first_column),8, @1.first_line, @1.first_column))] }
    | IDENTIFICADOR CORCHETEABRE Valor CORCHETECIERRE DECREMENTO { arbol.generarInicializacion2($1,$5); $$ = [new InicializacionV($1, $3, new Aritmetica( new LlamadoV($1, $3, @1.first_line, @1.first_column), new Literal(1, 0, @1.first_line, @1.first_column),8, @1.first_line, @1.first_column), @1.first_line, @1.first_column)]}
    | IDENTIFICADOR CORCHETEABRE Valor CORCHETECIERRE CORCHETEABRE Valor CORCHETECIERRE DECREMENTO { arbol.generarInicializacion($1,$8); $$ = [new InicializacionM($1, $3, $6, new Aritmetica( $$ = new LlamadoM($1, $3, $6, @1.first_line, @1.first_column), new Literal(1, 0, @1.first_line, @1.first_column),8, @1.first_line, @1.first_column), @1.first_line, @1.first_column)] }
    | IDENTIFICADOR ASIGNACION Valor { arbol.generarInicializacion4($1); $$ = [new Inicializacion(@1.first_line, @1.first_column, $1, $3)] }
    | IDENTIFICADOR CORCHETEABRE Valor CORCHETECIERRE ASIGNACION Valor { arbol.generarInicializacion5($1); $$ = [new InicializacionV($1, $3, $6, @1.first_line, @1.first_column)] }
    | IDENTIFICADOR CORCHETEABRE Valor CORCHETECIERRE CORCHETEABRE Valor CORCHETECIERRE ASIGNACION Valor { arbol.generarInicializacion6($1); $$ = [new InicializacionM($1, $3, $6, $9, @1.first_line, @1.first_column)] }
;

Variables
    : Variables2 ASIGNACION Valor PTCOMA { arbol.generarVariables(); for( i in $1 ){ $1[i][3] = $3 } $$ = $1 }
    | Variables2 PTCOMA { arbol.generarVariables_1(); $$ = $1 }
;

Variables2
    : Variables2 COMA IDENTIFICADOR { arbol.generarVariables2_1($3); $1.push([@1.first_line, @1.first_column, $3, null]); $$ = $1  }
    | IDENTIFICADOR { arbol.generarVariables2_($1); $$ =[ [@1.first_line, @1.first_column, $1, null] ] }
;

Valor
    : RESTA Valor %prec UMINUS { arbol.generarValorOperacionU("-");  $$ = new Aritmetica($2,new Literal(-1, 0, @1.first_line, @1.first_column),2, @1.first_line, @1.first_column)}
    | Valor POTENCIA Valor { arbol.generarValorOperacion("^"); $$ = new Aritmetica($1,$3,4, @1.first_line, @1.first_column) }
    | Valor MULTIPLICACION Valor { arbol.generarValorOperacion("*"); $$ = new Aritmetica($1,$3,2, @1.first_line, @1.first_column) }
    | Valor DIVISION Valor { arbol.generarValorOperacion("/"); $$ = new Aritmetica($1,$3,3, @1.first_line, @1.first_column) }
    | Valor SUMA Valor { arbol.generarValorOperacion("+"); $$ = new Aritmetica($1,$3,0, @1.first_line, @1.first_column) }
    | Valor RESTA Valor { arbol.generarValorOperacion("-"); $$ = new Aritmetica($1,$3,1, @1.first_line, @1.first_column) }
    | Valor MODULO Valor { arbol.generarValorOperacion("%"); $$ = new Aritmetica($1,$3,5, @1.first_line, @1.first_column) }
    | Valor IGUAL Valor { arbol.generarValorOperacion("=="); $$ = new Relacional($1,$3,0, @1.first_line, @1.first_column) }
    | Valor DIFERENTE Valor { arbol.generarValorOperacion("!="); $$ = new Relacional($1,$3,1, @1.first_line, @1.first_column) }
    | Valor MENOR Valor { arbol.generarValorOperacion("<"); $$ = new Relacional($1,$3,4, @1.first_line, @1.first_column) }
    | Valor MENORIGUAL Valor { arbol.generarValorOperacion("<="); $$ = new Relacional($1,$3,5, @1.first_line, @1.first_column)}
    | Valor MAYOR Valor { arbol.generarValorOperacion(">"); $$ = new Relacional($1,$3,2, @1.first_line, @1.first_column) }
    | Valor MAYORIGUAL Valor { arbol.generarValorOperacion(">="); $$ = new Relacional($1,$3,3, @1.first_line, @1.first_column) }
    | Valor OR Valor { arbol.generarValorOperacion("||"); $$ = new Relacional($1,$3,7, @1.first_line, @1.first_column) }
    | Valor AND Valor { arbol.generarValorOperacion("&&"); $$ = new Relacional($1,$3,6, @1.first_line, @1.first_column) }
    | Valor INCREMENTO { arbol.generarINCDEC("++"); $$ = new Aritmetica($1,new Literal(1, 0, @1.first_line, @1.first_column),7, @1.first_line, @1.first_column) }
    | Valor DECREMENTO { arbol.generarINCDEC("--"); $$ = new Aritmetica($1,new Literal(1, 0, @1.first_line, @1.first_column),8, @1.first_line, @1.first_column) }
    | Valor TERNARIO Valor DOSPT Valor { arbol.generarValorT(); $$ = new Ternario($1, $3, $5, @1.first_line, @1.first_column) } 
    | NEGACION Valor { arbol.generarValorOperacionU("!"); $$ = new Negacion($2,2, @1.first_line, @1.first_column) }
    | PARABRE Valor PARCIERRE { arbol.generarValorPar(); $$ = $2 }
    | ENTERO { arbol.generarValor($1); $$ = new Literal($1,0, @1.first_line, @1.first_column) }
    | DECIMAL { arbol.generarValor($1); $$ = new Literal($1,1, @1.first_line, @1.first_column) }
    | CADENA { arbol.generarValor($1); $$ = new Literal($1, 4, @1.first_line, @1.first_column) }
    | CARACTER { arbol.generarValor($1); $$ = new Literal($1, 3, @1.first_line, @1.first_column) }
    | TRUE { arbol.generarValor($1); $$ = new Literal(true, 2, @1.first_line, @1.first_column) }
    | FALSE { arbol.generarValor($1); $$ = new Literal(false, 2, @1.first_line, @1.first_column) }
    | IDENTIFICADOR { arbol.generarValorA($1); $$ = new Llamado($1, @1.first_line, @1.first_column) }
    | IDENTIFICADOR CORCHETEABRE Valor CORCHETECIERRE CORCHETEABRE Valor CORCHETECIERRE { arbol.generarValorAM($1); $$ = new LlamadoM($1, $3, $6, @1.first_line, @1.first_column) }
    | IDENTIFICADOR CORCHETEABRE Valor CORCHETECIERRE { arbol.generarValorAV($1); $$ = new LlamadoV($1, $3, @1.first_line, @1.first_column) }
    | PARABRE TipoVar PARCIERRE Valor %prec CAST1 { arbol.generarValorCasteo(); $$ = new Casteo($4, $2, @1.first_line, @1.first_column) }
    | TOSTRING PARABRE Valor PARCIERRE { arbol.generarValorFuncion("ToString"); $$ = new TOString($3, @1.first_line, @1.first_column) }
    | LENGTH PARABRE Valor PARCIERRE { arbol.generarValorFuncion("length"); $$ = new LENGHT($3, @1.first_line, @1.first_column) }
    | TOLOWER PARABRE Valor PARCIERRE { arbol.generarValorFuncion("toLower");  $$ = new TOLower($3, @1.first_line, @1.first_column) }
    | TOUPPER PARABRE Valor PARCIERRE { arbol.generarValorFuncion("toUpper"); $$ = new TOUpper($3, @1.first_line, @1.first_column) }
    | TYPEOF PARABRE Valor PARCIERRE { arbol.generarValorFuncion("typeOf"); $$ = new TypeOF($3, @1.first_line, @1.first_column) }
    | ROUND PARABRE Valor PARCIERRE { arbol.generarValorFuncion("round"); $$ = new Redondear($3, @1.first_line, @1.first_column) }
;

Print
    : PRINT PARABRE Valor PARCIERRE PTCOMA { arbol.generarPrint("Print"); $$ = [new Print(@1.first_line, @1.first_column,$3)] }
    | PRINT PARABRE PARCIERRE PTCOMA { arbol.generarPrint2("Print"); $$ = [new Print(@1.first_line, @1.first_column, new Literal("", 4, @1.first_line, @1.first_column))] }
    | PRINTLN PARABRE Valor PARCIERRE PTCOMA { arbol.generarPrint("Println"); $$ = [new Println(@1.first_line, @1.first_column,$3)] }
    | PRINTLN PARABRE PARCIERRE PTCOMA { arbol.generarPrint2("Println"); $$ = [new Println(@1.first_line, @1.first_column, new Literal("", 4, @1.first_line, @1.first_column))] }
;

If
    : IF PARABRE Valor PARCIERRE Entorno Else { arbol.generarIf(); $$ = new If($3, new EntornoI($5, @1.first_line, @1.first_column), $6, @1.first_line, @1.first_column)  }
;

Else
    : ELSE Entorno { arbol.generarElse(); $$ = new Entorno($2, @1.first_line, @1.first_column) } 
    | ELSE If { arbol.generarElse(); $$ = $2 }
    | { arbol.generarElse2(); $$ = null }
;

Ciclo
    : FOR PARABRE Param1 Valor PTCOMA Inicializacion PARCIERRE Entorno { arbol.generarFor(); $3.push(new EntornoC($4, $8, $6[0], @1.first_line, @1.first_column)); $$ = [ new Ciclo(new Entorno($3, @1.first_line, @1.first_column), @1.first_line, @1.first_column)] }
    | WHILE PARABRE Valor PARCIERRE Entorno { arbol.generarWhile(); $$ = [new Ciclo(new EntornoC($3, $5, null, @1.first_line, @1.first_column), @1.first_line, @1.first_column)] }
    | DO Entorno WHILE PARABRE Valor PARCIERRE PTCOMA { arbol.generarDWhile(); $$ = [new Ciclo(new EntornoD($5, $2, @1.first_line, @1.first_column), @1.first_line, @1.first_column)] }
;

Param1
    : Declaraciones { arbol.generarParam(); }
    | Inicializacion PTCOMA { arbol.generarParam1(); $$ = $1 }
;

Switch
    : SWITCH PARABRE Valor PARCIERRE LLAVEABRE EntornoS LLAVECIERRE { arbol.generarSwitch(); $$ = [new Switch(new EntornoW($3, $6, @1.first_line, @1.first_column), @1.first_line, @1.first_column)] }
;

EntornoS
    : Casos DEFAULT DOSPT Instrucciones { arbol.generarEntornoS(); $1.push(new EntornoCase(null, $4, @1.first_line, @1.first_column)); $$ = $1 }
    | Casos { arbol.generarEntornoS2(); $$ = $1 }
    | DEFAULT DOSPT Instrucciones { arbol.generarEntornoS3(); $$ = [new EntornoCase(null, $3, @1.first_line, @1.first_column)] }
    | DEFAULT DOSPT { arbol.generarEntornoS4(); $$ = [new EntornoCase(null, [], @1.first_line, @1.first_column)] }
;

Casos
    : CASE Valor DOSPT Instrucciones { arbol.generarCasos(); $$ = [new EntornoCase($2, $4, @1.first_line, @1.first_column)] }
    | Casos CASE Valor DOSPT Instrucciones { arbol.generarCasos2(); $1.push(new EntornoCase($3, $5, @1.first_line, @1.first_column)); $$=$1}
;

Entorno
    : LLAVEABRE Instrucciones LLAVECIERRE { arbol.generarEntorno2(); $$ = $2 }
    | LLAVEABRE LLAVECIERRE { arbol.generarEntorno(); $$ = [] }
;

Break
    : BREAK PTCOMA { arbol.generarBreak("Break"); $$ = [ new BREAK("Break", @1.first_line, @1.first_column) ] }
    | CONTINUE PTCOMA { arbol.generarBreak("Continue"); $$ = [ new BREAK("Continue", @1.first_line, @1.first_column) ] }
    | RETURN PTCOMA { arbol.generarBreak("Return"); $$ = [ new RETURN(null, @1.first_line, @1.first_column) ] }
    | RETURN Valor PTCOMA { arbol.generarBreak("Return"); $$ = [ new RETURN($2, @1.first_line, @1.first_column) ] }
;

Funciones
    : IDENTIFICADOR PARABRE Parametros PARCIERRE DOSPT TipoVar instruccion
;