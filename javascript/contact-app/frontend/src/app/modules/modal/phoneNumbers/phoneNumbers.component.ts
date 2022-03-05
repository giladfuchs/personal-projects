import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FullContact, PhoneNumber } from 'src/app/models/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from 'src/app/services/contacts.service';
import { AbstractModalComponent } from 'src/app/models/modal-class';
import { isValid } from 'src/app/shared/util';

@Component({
  selector: 'app-phone-number',
  templateUrl: './phoneNumbers.component.html',
  styleUrls: ['./phoneNumbers.component.css'],
})
export class PnoneNumberComponent
  extends AbstractModalComponent
  implements OnInit
{
  @Input() phoneNumbers: PhoneNumber[] | undefined;
  @Input() userId: number | undefined;
  @Output() setPhoneNumber = new EventEmitter<PhoneNumber[] | Event>();
  editMode = false;
  editedContact: FullContact;

  phoneForm: FormGroup;

  constructor(
    private contactService: ContactService,

    private formBuilder: FormBuilder,
  ) {
    super();
    this.phoneForm = this.formBuilder.group({
      type: ['', [Validators.required, Validators.minLength(4)]],
      numericNumber: [
        '',
        [
          Validators.required,
          Validators.min(1000000),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
    });
  }

  ngOnInit(): void {
    if (!this.phoneNumbers) this.phoneNumbers = [];
  }

  onSubmit = async (phoneNumberEdit: PhoneNumber | null = null) => {
    let apiResponse = false;
    if (phoneNumberEdit !== null && phoneNumberEdit.id)
      apiResponse = await this.contactService.addUpdatePhoneNumber(
        phoneNumberEdit,
        parseInt(phoneNumberEdit.id.toString()),
        'update',
      );
    else {
      const value = this.phoneForm.value;
      const phoneNumber = new PhoneNumber(
        value.type,
        value.numericNumber.toString(),
      );
      delete phoneNumber.id;
      if (this.userId) {
        apiResponse = await this.contactService.addUpdatePhoneNumber(
          phoneNumber,
          parseInt(this.userId.toString()),
          'create',
        );
      } else if (this.phoneNumbers) {
        this.phoneNumbers = [...this.phoneNumbers].concat(phoneNumber);
        this.setPhoneNumber.emit(this.phoneNumbers);
        this.cancelEditable();
      }
    }

    if (apiResponse) this.cancelEditable();
  };
  setEditable = () => {
    this.editMode = true;
  };

  cancelEditable = () => {
    this.editMode = false;
    this.phoneForm.reset();
  };

  valid(st: string, button = false) {
    return isValid(this.phoneForm, st, button);
  }
}
