"use strict";
exports.__esModule = true;
exports.tipoINCDEC = exports.tipoRELACIONAL = exports.tipoMODULO = exports.tipoPOTENCIA = exports.tipoDIV = exports.tipoMULTI = exports.tipoRESTA = exports.tipoSUMA = exports.Type = void 0;
var Type;
(function (Type) {
    Type[Type["INT"] = 0] = "INT";
    Type[Type["DOUBLE"] = 1] = "DOUBLE";
    Type[Type["BOOLEAN"] = 2] = "BOOLEAN";
    Type[Type["CHAR"] = 3] = "CHAR";
    Type[Type["STRING"] = 4] = "STRING";
})(Type = exports.Type || (exports.Type = {}));
exports.tipoSUMA = [
    [
        Type.INT, Type.DOUBLE, Type.INT, Type.INT, Type.STRING
    ],
    [
        Type.DOUBLE, Type.DOUBLE, Type.DOUBLE, Type.DOUBLE, Type.STRING
    ],
    [
        Type.INT, Type.DOUBLE, null, null, Type.STRING
    ],
    [
        Type.INT, Type.DOUBLE, null, Type.STRING, Type.STRING
    ],
    [
        Type.STRING, Type.STRING, Type.STRING, Type.STRING, Type.STRING
    ]
];
exports.tipoRESTA = [
    [
        Type.INT, Type.DOUBLE, Type.INT, Type.INT, null
    ],
    [
        Type.DOUBLE, Type.DOUBLE, Type.DOUBLE, Type.DOUBLE, null
    ],
    [
        Type.INT, Type.DOUBLE, null, null, null
    ],
    [
        Type.INT, Type.DOUBLE, null, null, null
    ],
    [
        null, null, null, null, null
    ]
];
exports.tipoMULTI = [
    [
        Type.INT, Type.DOUBLE, null, Type.INT, null
    ],
    [
        Type.DOUBLE, Type.DOUBLE, null, Type.DOUBLE, null
    ],
    [
        null, null, null, null, null
    ],
    [
        Type.INT, Type.DOUBLE, null, null, null
    ],
    [
        null, null, null, null, null
    ]
];
exports.tipoDIV = [
    [
        Type.DOUBLE, Type.DOUBLE, null, Type.DOUBLE, null
    ],
    [
        Type.DOUBLE, Type.DOUBLE, null, Type.DOUBLE, null
    ],
    [
        null, null, null, null, null
    ],
    [
        Type.DOUBLE, Type.DOUBLE, null, null, null
    ],
    [
        null, null, null, null, null
    ]
];
exports.tipoPOTENCIA = [
    [
        Type.INT, Type.DOUBLE, null, null, null
    ],
    [
        Type.DOUBLE, Type.DOUBLE, null, null, null
    ],
    [
        null, null, null, null, null
    ],
    [
        null, null, null, null, null
    ],
    [
        null, null, null, null, null
    ]
];
exports.tipoMODULO = [
    [
        Type.DOUBLE, Type.DOUBLE, null, null, null
    ],
    [
        Type.DOUBLE, Type.DOUBLE, null, null, null
    ],
    [
        null, null, null, null, null
    ],
    [
        null, null, null, null, null
    ],
    [
        null, null, null, null, null
    ]
];
exports.tipoRELACIONAL = [
    [
        Type.BOOLEAN, Type.BOOLEAN, null, Type.BOOLEAN, null
    ],
    [
        Type.BOOLEAN, Type.BOOLEAN, null, Type.BOOLEAN, null
    ],
    [
        null, null, Type.BOOLEAN, null, null
    ],
    [
        Type.BOOLEAN, Type.BOOLEAN, null, Type.BOOLEAN, null
    ],
    [
        null, null, null, null, Type.BOOLEAN
    ]
];
exports.tipoINCDEC = [
    [
        Type.INT, Type.DOUBLE, null, null, null
    ],
    [
        Type.DOUBLE, Type.DOUBLE, null, null, null
    ],
    [
        null, null, null, null, null
    ],
    [
        null, null, null, null, null
    ],
    [
        null, null, null, null, null
    ]
];
