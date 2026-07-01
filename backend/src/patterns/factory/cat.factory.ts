import { PetFactory } from "./pet.factory";
import { IPet } from "./pet.interface";

export class CatFactory extends PetFactory{

    create(data:IPet):IPet{

        return{

            ...data,

            species:"Gato"

        };  

    }

}