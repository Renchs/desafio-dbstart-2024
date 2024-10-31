import { procurarRecinto } from "./verificarRecintos";

class RecintosZoo {

    analisaRecintos(animal, quantidade) {
        return procurarRecinto(animal, quantidade);
    }

}

export { RecintosZoo as RecintosZoo };
