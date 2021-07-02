import { Field, ObjectType } from "@nestjs/graphql"
import { PhoneNumber } from "src/phone-num/entities/phone-num.entity"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"

@ObjectType()
@Entity()
export class Contact {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string
    @Field({ nullable: true })
    @Column({ nullable: true })
    nickname: string
    @Field()
    @Column()
    firstName: string
    @Field()
    @Column()
    lastName: string
    @Field()
    @Column()
    address: string
    @Field({ nullable: true })
    @Column({ nullable: true })
    img: string

    @OneToMany(() => PhoneNumber, phonenum => phonenum.contact)
    @Field(() => [PhoneNumber], { nullable: true, })
    phonenums: PhoneNumber[]

}