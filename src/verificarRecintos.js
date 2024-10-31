import { animaisPermitidos, recintosRegistrados } from "./utils.js";

function calcularEspacoDisponivel(recinto, animal, quantidade, animaisPermitidos) {
    let espaco_disponivel;

    if (recinto.animais_existentes.length === 0) {
        espaco_disponivel = recinto.tamanho_total - (animaisPermitidos[animal].tamanho_total * quantidade);
    } else {
        espaco_disponivel = recinto.tamanho_total
            - recinto.animais_existentes.reduce((soma, animais) => {
                return soma + (animais.quantidade * animaisPermitidos[animais.especie].tamanho_total);
            }, 0)
            - (animaisPermitidos[animal].tamanho_total * quantidade)
            - (recinto.animais_existentes.some(animais => animais.especie !== animal) ? 1 : 0);
    }

    return espaco_disponivel >= 0 ? espaco_disponivel : null;
}

export const procurarRecinto = (animal, quantidade) => {

    if (quantidade <= 0) {
        return {
            erro: 'Quantidade inválida'
        }
    }

    else if (!animaisPermitidos.hasOwnProperty(animal.toUpperCase())) {
        return {
            erro: 'Animal inválido'
        }
    }

    const recintosCompativeis = recintosRegistrados.filter(recinto => {
        const biomasPermitidos = animaisPermitidos[animal.toUpperCase()];

        const biomasHabitaveis = biomasPermitidos.biomas_habitaveis;

        return recinto.bioma.some(bioma => biomasHabitaveis.includes(bioma));
    });

    const recintosComEspacoSuficiente = recintosCompativeis.filter(recinto => {
        return recinto.tamanho_total >= quantidade;
    });

    const recintosDisponiveis = recintosComEspacoSuficiente.map(recinto => {
        return {
            id: recinto.id,
            bioma: recinto.bioma.filter(bioma => animaisPermitidos[animal].biomas_habitaveis.includes(bioma)),
            espaco_disponivel: calcularEspacoDisponivel(recinto, animal, quantidade, animaisPermitidos),
            tamanho_total: recinto.tamanho_total,
            animais: recinto.animais_existentes.map(animalExistente => animalExistente.especie),
            animal_carnivoro: recinto.animais_existentes.some(animal => { return animaisPermitidos[animal.especie] ? animaisPermitidos[animal.especie].carnivoro : false; })
        };
    }).filter(recinto => recinto.espaco_disponivel !== null && recinto.espaco_disponivel >= 0);
    

    if (!animaisPermitidos[animal].carnivoro) {
        const recinto_sem_carnivoro = recintosDisponiveis.filter(recinto => !recinto.animal_carnivoro);
        const regraAnimais = () => {
            switch (animal) {
                case 'MACACO':
                    return recinto_sem_carnivoro.filter(recinto => {
                        return recinto.animais.length > 0 || quantidade > 1;
                    })

                case 'HIPOPOTAMO':
                    return recinto_sem_carnivoro.filter(recinto => {
                        const recintoVazio = recinto.animais.length === 0;

                        if (recintoVazio) {
                            return recinto.bioma.includes('savana') || recinto.bioma.includes('rio');
                        }


                        return recinto.bioma.includes('savana') && recinto.bioma.includes('rio');

                    });

                default:
                    return recinto_sem_carnivoro
            }
        }

        return regraAnimais().length > 0 ? { recintosViaveis: regraAnimais().map(recinto => `Recinto ${recinto.id} (espaço livre: ${recinto.espaco_disponivel} total: ${recinto.tamanho_total})`) } : { erro: 'Não há recinto viável' };

    }

    const recinto_carnivoro = recintosDisponiveis.filter(recinto => recinto.animal_carnivoro && recinto.animais.includes(animal) || recinto.animais.length === 0);

    return recinto_carnivoro.length > 0 ? { recintosViaveis: recinto_carnivoro.map(recinto => `Recinto ${recinto.id} (espaço livre: ${recinto.espaco_disponivel} total: ${recinto.tamanho_total})`) } : { erro: 'Não há recinto viável' };

}


