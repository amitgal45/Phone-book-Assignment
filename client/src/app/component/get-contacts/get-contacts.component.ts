import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ContactService } from 'src/app/service/contact.service'
import { PhoneNumberService } from 'src/app/service/phone-number.service'


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
  constructor(private contactService: ContactService, private phoneNumberService: PhoneNumberService) { }

  nextPage() {
    this.page++
  }

  lastPage() {
    this.page--
  }

  ///////////////////////////
  // Contact Model
  ///////////////////////////
  getAllContacts() {
    this.contactService.getAllContacts()
      .subscribe(({ data, error }) => {
        if (!error)
          this.contacts = [...data.getAllContacts]
      })
  }

  getContact(contactId: string) {
    this.contactService.getContact(contactId)
      .subscribe(({ data, error }) => {
        if (!error)
          this.selectedContact = { ...data.contact }
      })
  }

  createContact(firstname:string, lastname:string, nickname:string, address:string, img:string, phonenumber:string) {
    this.contactService.createContact(firstname, lastname, nickname, address, img).subscribe(({ data }) => {
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

  updateContact(id:string, firstname:string, lastname:string, nickname:string, address:string) {
    this.contactService.updateContact(id, firstname, lastname, nickname, address, this.selectedContact.img)
      .subscribe(({ data }) => {
        for (let i: number = 0; i < this.contacts.length; i++) {
          if (this.contacts[i].id == id)
            this.contacts[i] = data.updateContact
        }
        this.selectedContact = null

      }, err => {
        alert('Params missing')
        console.log(err)
      })
  }

  removeContact(id: string) {
    this.contactService.removeContact(id)
      .subscribe(contact => {
        this.contacts = this.contacts.filter(contact => contact.id != id)
        this.selectedContact = null;
      })
  }


  ///////////////////////////
  // Phone Number Model
  ///////////////////////////
  createPhoneNumber(contactId:string, number:string) {
    this.phoneNumberService.createPhoneNumber(contactId, number).subscribe(({ data }) => {
      this.selectedContact.phonenums = [...this.selectedContact.phonenums, data.createPhoneNumber]
    }, err => {
      alert('Params missing')
      console.log(err.message)
    })
  }

  updatePhoneNum(id:string, phonenum:string, contactid:string) {
    this.phoneNumberService.updatePhoneNumber(id, phonenum, contactid).subscribe(({ data }) => {
      console.log(data)
    })

  }

  removePhoneNumber(id:string) {
    this.phoneNumberService.removePhoneNumber(id)
      .subscribe(phonenumd => {
        this.selectedContact.phonenums = this.selectedContact.phonenums.filter(phonenum => phonenum.id != id)
      })
  }


  // Handle file input
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
