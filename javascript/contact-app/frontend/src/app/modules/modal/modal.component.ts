import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ContactService } from 'src/app/services/contacts.service';
import { Contact, FullContact, PhoneNumber } from 'src/app/models/models';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  subscription: Subscription;
  phoneNumbers: PhoneNumber[] = [];
  error = '';
  open: boolean = false;
  editedContact: FullContact | null;

  constructor(
    private modalService: ModalService,
    private contactService: ContactService,
  ) {}

  ngOnInit(): void {
    this.subscription = this.modalService.openModal.subscribe(
      (openModal: boolean) => {
        if (!openModal) this.onClose();
        else this.open = openModal;
      },
    );
    this.subscription = this.modalService.contactEdit.subscribe(
      (contact: FullContact) => {
        this.editedContact = contact;
        this.open = true;
      },
    );
    this.subscription = this.modalService.error.subscribe((error: string) => {
      this.error = error;
    });
  }
  setPhoneNumber(phoneNumbers: PhoneNumber[] | Event): void {
    this.phoneNumbers = phoneNumbers as PhoneNumber[];
  }
  onCloseError() {
    this.error = '';
  }
  onClose() {
    this.open = false;
    this.editedContact = null;
  }

  onSubmit = async (contact: Contact) => {
    const phoneNumbers = this.phoneNumbers.map((phoneNumber) => {
      delete phoneNumber.id;
      return phoneNumber;
    });

    this.contactService.addContact(contact, phoneNumbers);

    this.phoneNumbers = [];
  };

  addContact() {
    this.open = true;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
