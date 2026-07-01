import {

Column,

Entity,

ManyToOne,

PrimaryGeneratedColumn,

CreateDateColumn,

} from 'typeorm';

import { Owner } from './owner.entity';

import { PetStatus } from '../../common/enums/pet-status.enum';

@Entity()

export class Pet{

@PrimaryGeneratedColumn()

id:number;

@Column()

name:string;

@Column()

species:string;

@Column()

breed:string;

@Column()

description:string;

@Column()

photo:string;

@Column('float')

latitude:number;

@Column('float')

longitude:number;

@Column({

type:'text',

enum:PetStatus,

default:PetStatus.LOST,

})

status:PetStatus;

@ManyToOne(()=>Owner)

owner:Owner;

@CreateDateColumn()

createdAt:Date;


@Column({
  default: true,
})
active: boolean;

@Column({
  default: false,
})
found: boolean;



}