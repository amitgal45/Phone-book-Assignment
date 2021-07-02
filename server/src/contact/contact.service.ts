import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactCreateDTO } from './dto/create-contact.input';
import { UpdateContactInput } from './dto/update-contact.input';
import { Contact } from './entities/contact.entity';

@Injectable()
export class ContactService {

  constructor(@InjectRepository(Contact) private contactRepository: Repository<Contact>) { }

  create(contact: ContactCreateDTO): Promise<Contact> {
    let _contact = this.contactRepository.create(contact);
    return this.contactRepository.save(_contact) //you can directly use this without create. depends on DTO. this explained in video

  }

  async findAll(): Promise<Contact[]> {
    let limit:number = 5;
    return this.contactRepository.find({
      order:{
        firstName:'ASC'
      },
      relations: ["phonenums"],
    })
  }

  async findOne(id: string): Promise<Contact> {
    return this.contactRepository.findOne(id, { relations: ["phonenums"] });
  }

  async update(id: string, updateContactInput: UpdateContactInput) {
    let contact: Contact = this.contactRepository.create(updateContactInput)
    contact.id = id;
    return await this.contactRepository.save(contact)
  }

  async remove(id: string) {
    let contact = this.findOne(id)
    if (contact) {
      let ret = await this.contactRepository.delete(id)
      if (ret.affected === 1) {
        return contact;
      }
    }
    throw new NotFoundException(`Record cannot find by id ${id}`)
  }
}