import {

Column,

Entity,

ManyToOne,

PrimaryGeneratedColumn,

CreateDateColumn,

} from 'typeorm';

import { Pet } from './pet.entity';

@Entity()

export class Sighting{

@PrimaryGeneratedColumn()

id:number;

@Column()

photo:string;

@Column()

description:string;

@Column('float')

latitude:number;

@Column('float')

longitude:number;

@ManyToOne(()=>Pet)

pet:Pet;

@CreateDateColumn()

createdAt:Date;

}