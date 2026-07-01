import { Pet } from "../../database/entities/pet.entity";

export interface SearchStrategy{

    search(

    pets:Pet[],

    value:string

    ):Pet[];

}