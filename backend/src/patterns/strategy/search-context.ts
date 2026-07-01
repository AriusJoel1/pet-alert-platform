import { SearchStrategy } from "./search.strategy";

import { Pet } from "../../database/entities/pet.entity";

export class SearchContext{

constructor(

private strategy:SearchStrategy

){}

setStrategy(

strategy:SearchStrategy

){

this.strategy=strategy;

}

execute(

pets:Pet[],

value:string

){

return this.strategy.search(

pets,

value

);

}

}