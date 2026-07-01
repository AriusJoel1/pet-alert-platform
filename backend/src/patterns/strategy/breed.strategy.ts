import { Pet } from "../../database/entities/pet.entity";

import { SearchStrategy } from "./search.strategy";

export class BreedStrategy

implements SearchStrategy{

search(

pets:Pet[],

value:string

){

return pets.filter(

pet=>pet.breed

.toLowerCase()

.includes(

value.toLowerCase()

)

);

}

}