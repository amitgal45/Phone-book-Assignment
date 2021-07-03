import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { CREATE_PHONE_NUMBER } from '../queries/create-phone-number';
import { REMOVE_PHONE_NUMBER } from '../queries/remove-phone-num';
import { UPDATE_PHONE_NUMBER } from '../queries/update-phone-num';

@Injectable({
  providedIn: 'root'
})
export class PhoneNumberService {

  createPhoneNumber(contactId:string,number:string){
    return this.apollo.mutate<any>({
      mutation: CREATE_PHONE_NUMBER,
      variables: {
        contactId: contactId,
        number: number,
      }
    })
  }

  updatePhoneNumber(id:string,phonenum:string,contactid:string){
    return this.apollo.mutate<any>({
      mutation: UPDATE_PHONE_NUMBER,
      variables: {
        id: id,
        number: phonenum,
        contactId: contactid
      }
    })
  }

  removePhoneNumber(id:string){
    return this.apollo.mutate<any>({
      mutation: REMOVE_PHONE_NUMBER,
      variables: {
        id: id
      }
    })
  }

  constructor(private apollo:Apollo) { }
}
