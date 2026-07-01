import { Pet } from "../../database/entities/pet.entity";

import { SearchStrategy } from "./search.strategy";

export class SpeciesStrategy

    implements SearchStrategy{

    search(

    pets:Pet[],

    value:string

){

return pets.filter(

    pet=>pet.species

    .toLowerCase()

    .includes(

    value.toLowerCase()

    )

);

}

}