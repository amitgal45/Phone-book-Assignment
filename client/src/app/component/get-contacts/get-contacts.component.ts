import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GET_ALL_CONTACTS } from 'src/app/queries/get-all-contacts'
import { CREATE_CONTACT } from 'src/app/queries/create-contact'
import { REMOVE_CONTACT } from 'src/app/queries/remove-contact'
import { CREATE_PHONE_NUMBER } from 'src/app/queries/create-phone-number'
import { GET_CONTACT_BY_ID } from 'src/app/queries/get-contact'
import { UPDATE_CONTACT } from 'src/app/queries/update-contact'
import { UPDATE_PHONE_NUMBER } from 'src/app/queries/update-phone-num'
import { REMOVE_PHONE_NUMBER } from 'src/app/queries/remove-phone-num'


@Component({
  selector: 'app-get-contacts',
  templateUrl: './get-contacts.component.html',
  styleUrls: ['./get-contacts.component.css']
})

export class GetContactsComponent implements OnInit {
  public contacts: any = []
  public page: number = 1;
  public image: File;
  public imageUrl: string = ''
  public selectedContact = null;
  public isCreateMode = false;
  public searchInput = ''
  constructor(private apollo: Apollo) { }

  nextPage() {
    this.page++
  }

  lastPage() {
    console.log('page --')
    this.page--
  }

  getContact(contactId: number) {
    this.apollo.watchQuery<any>({
      query: GET_CONTACT_BY_ID,
      variables: {
        id: contactId
      }
    }).valueChanges
      .subscribe(({ data, loading, error }) => {
        if (!error) {
          console.log(data.contact)
          this.selectedContact = { ...data.contact }
        }
        else {
          console.log(error)
        }

      })
  }

  createContact(firstname, lastname, nickname, address, img, phonenumber) {
    this.apollo.mutate<any>({
      mutation: CREATE_CONTACT,
      variables: {
        nickname: nickname,
        firstName: firstname,
        lastName: lastname,
        img: img,
        address: address
      }
    }).subscribe(({ data }) => {
      this.createPhoneNumber(data.createContact.id, phonenumber)
      this.contacts = [...this.contacts, data.createContact]
      this.image = null
      this.imageUrl = null
      this.isCreateMode = false;
    },
      err => {
        alert('Params missing')
        console.log(err.message)
      })
  }

  removeContact(id) {
    this.apollo.mutate<any>({
      mutation: REMOVE_CONTACT,
      variables: {
        id: id
      }
    })
      .subscribe(contact => {
        this.contacts = this.contacts.filter(contact => contact.id != id)
        this.selectedContact = null;
      })
  }

  createPhoneNumber(contactId, number) {
    this.apollo.mutate<any>({
      mutation: CREATE_PHONE_NUMBER,
      variables: {
        contactId: contactId,
        number: number,
      }
    }).subscribe(({ data }) => {
      console.log(data)
      this.selectedContact.phonenums = [...this.selectedContact.phonenums, data.createPhoneNumber]
      console.log(data)
    }, err => {
      alert('Params missing')
      console.log(err.message)
    })
  }

  updateContact(id, firstname, lastname, nickname, address) {
    console.log(id, firstname, lastname, nickname, address)

    this.apollo.mutate<any>({
      mutation: UPDATE_CONTACT,
      variables: {
        lastname: lastname,
        id: id,
        firstname: firstname,
        nickname: nickname,
        address: address,
        img: this.selectedContact.img

      }
    }).subscribe(({ data }) => {
      console.log(data)

      for (let i: number = 0; i < this.contacts.length; i++) {
        if (this.contacts[i].id == id) {
          this.contacts[i] = data.updateContact
        }
      }
      this.selectedContact = null


    }, err => {
      alert('Params missing')
      console.log(err)
    })
  }

  updatePhoneNum(id, phonenum, contactid) {
    console.log(id)
    this.apollo.mutate<any>({
      mutation: UPDATE_PHONE_NUMBER,
      variables: {
        id: id,
        number: phonenum,
        contactId: contactid
      }
    }).subscribe(({ data }) => {
      for (let i = 0; i < this.selectedContact.phonenums.length; i++) {
        if (this.selectedContact.phonenums[i].id == id) {
          console.log(data)

        }
      }
    })

  }

  getAllContacts() {
    this.apollo.watchQuery<any>({
      query: GET_ALL_CONTACTS,
      variables: {
        page: this.page
      }
    }).valueChanges
      .subscribe(({ data, loading, error }) => {
        if (!error) {
          this.contacts = [...data.getAllContacts]
          console.log(this.contacts)
        }
        else {
          console.log(error)
        }

      })
  }

  removePhoneNumber(id) {
    this.apollo.mutate<any>({
      mutation: REMOVE_PHONE_NUMBER,
      variables: {
        id: id
      }
    })
      .subscribe(phonenumd => {
        this.selectedContact.phonenums = this.selectedContact.phonenums.filter(phonenum => phonenum.id != id)
      })
  }

  handleFileInput(file: FileList) {
    this.image = file.item(0);
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.image);
  }

  ngOnInit(): void {
    this.getAllContacts()
  }

}
