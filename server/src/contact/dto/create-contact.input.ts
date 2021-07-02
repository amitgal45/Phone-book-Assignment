import { Field, InputType } from "@nestjs/graphql"

@InputType()
export class ContactCreateDTO {
    @Field()
    firstName: string
    @Field()
    lastName: string
    @Field()
    nickname: string
    @Field()
    address: string
    @Field({ nullable: true })
    img: string
    
}