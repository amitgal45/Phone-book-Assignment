import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
// import { identity } from 'rxjs';
import { Contact } from 'src/contact/entities/contact.entity';
import { CreatePhoneNumberInput } from './dto/create-phone-num.input';
import { PhoneNumberService } from './phone.num.service';
import { PhoneNumber } from './entities/phone-num.entity';

@Resolver(() => PhoneNumber)
export class PhoneNumberResolver {

    constructor(private phonenumService: PhoneNumberService) { }

    @Query(() => [PhoneNumber], { name: "getAllPhoneNumbers" })
    findAll() {
        return this.phonenumService.findAll();
    }

    @Mutation(() => PhoneNumber, { name: "createPhoneNumber" })
    create(
        @Args('contactId') contactId: string,
        @Args('number') number: string
        ) {
        return this.phonenumService.create({contactId,number})
    }

    @Mutation(() => PhoneNumber, { name: "updatePhoneNumber" })
    update(
        @Args('contactId') contactId: string,
        @Args('id') id: string,
        @Args('number') number: string
        ) {
        return this.phonenumService.update(id,{id,number,contactId})
    }

    @Mutation(() => PhoneNumber, { name: "deletePhoneNumber" })
    delete(
        @Args('id') id: string,
        ) {
        return this.phonenumService.remove(id)
    }

    @Query(() => PhoneNumber)
    findOne(@Args("id") id: string) {
        return this.phonenumService.findOne(id)
    }

    @ResolveField(() => Contact)
    contact(@Parent() phoneNum: PhoneNumber) {
        return this.phonenumService.getPhoneNumber(phoneNum.contactId)

    }

}