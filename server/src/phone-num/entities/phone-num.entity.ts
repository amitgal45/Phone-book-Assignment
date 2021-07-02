import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Contact } from 'src/contact/entities/contact.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class PhoneNumber {

  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string
  @Field()
  @Column()
  number: string

  @ManyToOne(() => Contact, contact => contact.phonenums,{cascade:true,onDelete:'CASCADE'})
  @Field(() => Contact)
  contact: Contact

  @Column({nullable:true})
  @Field({nullable:true})
  contactId: string
//   @Field(() => Int)
//   @Column()
//   code: number

//   @OneToMany(() => Employee, employee => employee.project)
//   @Field(() => [Employee], { nullable: true })
//   employees: Employee[]

}