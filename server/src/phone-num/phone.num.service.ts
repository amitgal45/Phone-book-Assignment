import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from 'src/contact/entities/contact.entity';
import { ContactModule } from 'src/contact/contact.module';
import { ContactService } from 'src/contact/contact.service';
import { Repository } from 'typeorm';
import { CreatePhoneNumberInput } from './dto/create-phone-num.input';
import { PhoneNumber } from './entities/phone-num.entity';
import { UpdatePhoneInput } from './dto/update-phone';

@Injectable()
export class PhoneNumberService {

    constructor(@InjectRepository(PhoneNumber) private phoneNumberRepository: Repository<PhoneNumber>,
        private contactService: ContactService) {

    }

    async findAll(): Promise<PhoneNumber[]> {
        return this.phoneNumberRepository.find();
    }
    async findOne(id: string) {
        return this.phoneNumberRepository.findOne(id)
    }

    async create(phoneNum: CreatePhoneNumberInput): Promise<PhoneNumber> {

        let num = this.phoneNumberRepository.create(phoneNum);
        return this.phoneNumberRepository.save(num)

    }

    async getPhoneNumber(id: string): Promise<Contact> {
        return this.contactService.findOne(id)
    }


    async update(id: string, updateContactInput: UpdatePhoneInput) {
        let phone: PhoneNumber = this.phoneNumberRepository.create(updateContactInput)
        phone.id = id;
        return await this.phoneNumberRepository.save(phone)
    }

    async remove(id: string) {
        let phone = this.findOne(id)
        if (phone) {
            let ret = await this.phoneNumberRepository.delete(id)
            if (ret.affected === 1) {
                return phone;
            }
        }
        throw new NotFoundException(`Record cannot find by id ${id}`)
    }
}

