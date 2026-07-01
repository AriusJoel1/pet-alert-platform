import { Pet } from "../../database/entities/pet.entity";

import { SearchStrategy } from "./search.strategy";

export class NameStrategy

    implements SearchStrategy{

        search(

        pets:Pet[],

        value:string

    ){

    return pets.filter(

        pet=>pet.name

        .toLowerCase()

        .includes(

        value.toLowerCase()

        )

    );

}

}