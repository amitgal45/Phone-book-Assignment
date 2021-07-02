import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ContactService } from './contact.service';
import { Contact } from './entities/contact.entity';
import { UpdateContactInput } from './dto/update-contact.input';

@Resolver(() => Contact)
export class ContactResolver {
    constructor(private readonly contactService: ContactService) { }

    @Mutation(() => Contact)
    createContact(
        @Args('firstName') firstName: string,
        @Args('lastName') lastname: string,
        @Args('nickname', { nullable: true }) nickname: string,
        @Args('img',{ nullable: true }) img: string,
        @Args('address', { nullable: true }) address: string) {
        return this.contactService.create({
            firstName:firstName==''?null:firstName,
            lastName:lastname==''?null:lastname,
            nickname:nickname==''?null:nickname,
            img:img==''?null:img,
            address:address==''?null:address}).catch(err=>{console.log(err)})
    }
    
    @Query(() => [Contact], { name: 'getAllContacts' })
    findAll(@Args('page') page: number) {
        return this.contactService.findAll();
    }

    @Query(() => Contact, { name: 'contact' })
    findOne(@Args('id') id: string) {
        return this.contactService.findOne(id);
    }

    @Mutation(() => Contact)
    updateContact(@Args('contact') contact: UpdateContactInput) {
        return this.contactService.update(contact.id, contact);
    }

    @Mutation(() => Contact)
    removeContact(@Args('id') id: string) {
        return this.contactService.remove(id);
    }
}