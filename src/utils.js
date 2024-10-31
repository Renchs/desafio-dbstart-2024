export const animaisPermitidos = {
    MACACO: {
        carnivoro: false,
        tamanho_total: 1,
        biomas_habitaveis: ['savana', 'floresta']
    },
    GAZELA: {
        carnivoro: false,
        tamanho_total: 2,
        biomas_habitaveis: ['savana']
    },
    LEAO: {
        carnivoro: true,
        tamanho_total: 2,
        biomas_habitaveis: ['savana']
    },
    CROCODILO: {
        carnivoro: true,
        tamanho_total: 3,
        biomas_habitaveis: ['rio']
    },
    LEOPARDO: {
        carnivoro: true,
        tamanho_total: 2,
        biomas_habitaveis: ['savana']
    },
    HIPOPOTAMO: {
        carnivoro: false,
        tamanho_total: 4,
        biomas_habitaveis: ['savana', 'rio']
    }
}

export const recintosRegistrados = [
    {
        id: 1,
        bioma: ['savana'],
        tamanho_total: 10,
        animais_existentes: [
            {
                especie: 'MACACO',
                quantidade: 3
            }
        ]
    },
    {
        id: 2,
        bioma: ['floresta'],
        tamanho_total: 5,
        animais_existentes: []
    },
    {
        id: 3,
        bioma: ['savana', 'rio'],
        tamanho_total: 7,
        animais_existentes: [
            {
                especie: 'GAZELA',
                quantidade: 1
            }
        ]
    },
    {
        id: 4,
        bioma: ['rio'],
        tamanho_total: 8,
        animais_existentes: []
    }
    , {
        id: 5,
        bioma: ['savana'],
        tamanho_total: 9,
        animais_existentes: [
            {
                especie: 'LEAO',
                quantidade: 1
            }
        ]
    }
]