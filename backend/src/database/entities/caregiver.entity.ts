import {

Column,

Entity,

PrimaryGeneratedColumn,

OneToMany,

} from 'typeorm';

import { Review } from './review.entity';

import { CaregiverRole } from '../../common/enums/caregiver-role.enum';

@Entity()

export class Caregiver{

@PrimaryGeneratedColumn()

id:number;

@Column()

fullName:string;

@Column({

type:'text',

enum:CaregiverRole,

})

role:CaregiverRole;

@Column()

acceptedSpecies:string;

@Column()

acceptsMedication:boolean;

@Column({

default:true,

})

alertsEnabled:boolean;

@OneToMany(()=>Review,()=>undefined)

reviews:Review[];

@Column({

default:5,

})

rating:number;

}