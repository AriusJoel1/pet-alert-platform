import {

Column,

Entity,

PrimaryGeneratedColumn,

} from 'typeorm';

@Entity()

export class Review{

@PrimaryGeneratedColumn()

id:number;

@Column()

ownerName:string;

@Column()

comment:string;

@Column()

stars:number;

}