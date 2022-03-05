import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from 'src/app/services/contacts.service';
import { Contact } from 'src/app/models/models';
import { ModalService } from '../../../services/modal.service';
import { AbstractModalComponent } from 'src/app/models/modal-class';
import { isValid } from 'src/app/shared/util';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contactDetails.component.html',
  styleUrls: ['./contactDetails.component.css'],
})
export class ConactDetailsComponent
  extends AbstractModalComponent
  implements OnInit, OnChanges
{
  contactForm: FormGroup;
  @Input() editedContact: Contact | undefined;
  @Input() userId: number | undefined;
  @Input() addContact: (contact: Contact) => void;

  constructor(
    private contactService: ContactService,
    private modalService: ModalService,
    private formBuilder: FormBuilder,
  ) {
    super();
    this.contactForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(1)]],
      lastName: ['', [Validators.required, Validators.minLength(1)]],
      nickName: [''],
      address: [''],
    });
  }

  ngOnInit(): void {
    if (this.editedContact) {
      this.contactForm.setValue({
        firstName: this.editedContact.firstName,
        lastName: this.editedContact.lastName,
        nickName: this.editedContact.nickName,
        address: this.editedContact.address,
      });
      this.editMode = false;
    } else this.editMode = true;
  }
  ngOnChanges() {
    if (this.userId) this.editMode = false;
  }
  onSubmit = async () => {
    const value = this.contactForm.value;
    const contact = new Contact(
      value.firstName,
      value.lastName,
      value.nickName,
      value.address,
    );
    let apiResponse;

    if (this.userId) {
      apiResponse = await this.contactService.updateContact(
        parseInt(this.userId.toString()),
        contact,
      );
    } else {
      apiResponse = this.addContact(contact);
    }
    if (apiResponse) this.editMode = false;
  };

  async onDelete() {
    if (
      this.userId &&
      (await this.contactService.deleteItem(
        parseInt(this.userId.toString()),
        'Contact',
      ))
    )
      this.modalService.openModal.next(false);
  }

  cancelEditable() {
    this.editMode = false;
    if (this.editedContact)
      this.contactForm.setValue({
        firstName: this.editedContact.firstName,
        lastName: this.editedContact.lastName,
        nickName: this.editedContact.nickName,
        address: this.editedContact.address,
      });
  }
  valid(st: string, button = false) {
    return isValid(this.contactForm, st, button);
  }
}
