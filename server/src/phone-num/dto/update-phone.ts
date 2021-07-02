import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePhoneInput {

    @Field()
    id: string
    @Field()
    number:string
    @Field()
    contactId:string

}