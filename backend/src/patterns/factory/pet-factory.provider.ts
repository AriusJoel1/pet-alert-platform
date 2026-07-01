import { DogFactory } from "./dog.factory";
import { CatFactory } from "./cat.factory";
import { BirdFactory } from "./bird.factory";

export class PetFactoryProvider{

    static create(species:string){

        switch(species.toLowerCase()){

            case "perro":

            return new DogFactory();

            case "gato":

            return new CatFactory();

            case "ave":

            return new BirdFactory();

            default:

            return new DogFactory();

        }

    }

}