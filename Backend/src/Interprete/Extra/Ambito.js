"use strict";
exports.__esModule = true;
exports.Ambito = void 0;
var Error_1 = require("../Error/Error");
var Simbolo_1 = require("./Simbolo");
var Ambito = /** @class */ (function () {
    function Ambito(anterior) {
        this.anterior = anterior;
        this.variables = new Map();
    }
    Ambito.prototype.setVal = function (id, value, type, line, column) {
        var env = this;
        while (env != null) {
            if (env.variables.has(id)) {
                var val = env.variables.get(id);
                if (val.type == type) {
                    env.variables.set(id, new Simbolo_1.Simbolo(value, id, type));
                }
                else {
                    throw new Error_1.ErrorE(line, column, 'Semantico', 'No se puede asignar: ' + type + ' a ' + val.type);
                }
            }
            env = env.anterior;
        }
        this.variables.set(id, new Simbolo_1.Simbolo(value, id, type));
    };
    Ambito.prototype.getVal = function (id) {
        var env = this;
        while (env != null) {
            if (env.variables.has(id)) {
                return env.variables.get(id);
            }
            env = env.anterior;
        }
        return null;
    };
    return Ambito;
}());
exports.Ambito = Ambito;
