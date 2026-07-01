import {

Entity,

PrimaryGeneratedColumn,

Column,

CreateDateColumn,

} from 'typeorm';

@Entity()

export class Notification{

@PrimaryGeneratedColumn()

id:number;

@Column()

message:string;

@Column()

receiver:string;

@CreateDateColumn()

createdAt:Date;

}