import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateContactInput {

    @Field()
    id: string
    @Field()
    firstName: string
    @Field()
    lastName: string
    @Field()
    nickname: string
    @Field({ nullable: true })
    img: string
    @Field()
    address:string

}