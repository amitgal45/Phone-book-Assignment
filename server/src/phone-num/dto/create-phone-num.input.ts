import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreatePhoneNumberInput {

    @Field()
    number: string
    @Field()
    contactId: string
}