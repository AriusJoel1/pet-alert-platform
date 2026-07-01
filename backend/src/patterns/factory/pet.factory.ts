import { IPet } from "./pet.interface";

export abstract class PetFactory{

    abstract create(data:IPet):IPet;

}