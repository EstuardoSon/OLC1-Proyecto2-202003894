export enum Type {
    INT = 0,
    DOUBLE = 1,
    BOOLEAN = 2,
    CHAR = 3,
    STRING = 4
}

export type Retorno = {
    value: any,
    type: Type
}

export const tipoSUMA = [
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
]

export const tipoRESTA = [
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
]

export const tipoMULTI = [
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
]

export const tipoDIV = [
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
]

export const tipoPOTENCIA = [
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
]

export const tipoMODULO = [
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
]

export const tipoRELACIONAL = [
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
]

export const tipoINCDEC = [
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
]