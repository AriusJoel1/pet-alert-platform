import { PetFactory } from "./pet.factory";
import { IPet } from "./pet.interface";

export class BirdFactory extends PetFactory{

    create(data:IPet):IPet{

        return{

            ...data,

            species:"Ave"

        };

    }

}