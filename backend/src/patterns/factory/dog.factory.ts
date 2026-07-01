import { PetFactory } from "./pet.factory";
import { IPet } from "./pet.interface";

export class DogFactory extends PetFactory{

create(data:IPet):IPet{

return{

...data,

species:"Perro"

};

}

}