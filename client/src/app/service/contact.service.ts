import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GET_CONTACT_BY_ID } from 'src/app/queries/get-contact'
import { CREATE_CONTACT } from '../queries/create-contact';
import { GET_ALL_CONTACTS } from '../queries/get-all-contacts';
import { REMOVE_CONTACT } from '../queries/remove-contact';
import { UPDATE_CONTACT } from '../queries/update-contact';


@Injectable({
  providedIn: 'root'
})
export class ContactService {

  getAllContacts() {
    return this.apollo.watchQuery<any>({
      query: GET_ALL_CONTACTS,
      variables: {
        page: 0
      }
    }).valueChanges
  }

  getContact(contactId: string) {
    return this.apollo.watchQuery<any>({
      query: GET_CONTACT_BY_ID,
      variables: {
        id: contactId
      }
    }).valueChanges
  }

  createContact(firstname, lastname, nickname, address, img) {
    return this.apollo.mutate<any>({
      mutation: CREATE_CONTACT,
      variables: {
        nickname: nickname,
        firstName: firstname,
        lastName: lastname,
        img: img,
        address: address
      }
    })
  }

  updateContact(id, firstname, lastname, nickname, address, img) {
    return this.apollo.mutate<any>({
      mutation: UPDATE_CONTACT,
      variables: {
        lastname: lastname,
        id: id,
        firstname: firstname,
        nickname: nickname,
        address: address,
        img: img
      }
    })
  }

  removeContact(id) {
    return this.apollo.mutate<any>({
      mutation: REMOVE_CONTACT,
      variables: {
        id: id
      }
    })
  }

  constructor(private apollo: Apollo) { }
}
