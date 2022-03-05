import { Component, Input, OnInit } from '@angular/core';
import { PhoneNumber } from 'src/app/models/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from 'src/app/services/contacts.service';
import { AbstractModalComponent } from 'src/app/models/modal-class';
import { isValid } from 'src/app/shared/util';

@Component({
  selector: 'app-phone-number-row',
  templateUrl: './phoneNumberRow.component.html',
  styleUrls: ['./phoneNumberRow.component.css'],
})
export class PnoneNumberRowComponent
  extends AbstractModalComponent
  implements OnInit
{
  @Input() phone: PhoneNumber;
  @Input() editPhoneNumber: (phoneNumberEdit: PhoneNumber) => void;

  editMode = false;

  phoneListForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private contactService: ContactService,
  ) {
    super();

    this.phoneListForm = this.formBuilder.group({
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
    this.phoneListForm.setValue({
      type: this.phone.type,
      numericNumber: this.phone.numericNumber,
    });
  }
  onSubmit() {
    const value = this.phoneListForm.value;
    const phoneNumber = new PhoneNumber(
      value.type,
      value.numericNumber.toString(),
      this.phone.id ? parseInt(this.phone.id.toString()) : this.phone.id,
    );
    this.editPhoneNumber(phoneNumber);
  }

  onDelete() {
    this.contactService.deleteItem(
      this.phone.id ? parseInt(this.phone.id.toString()) : -1,
      'PhoneNumber',
    );
  }

  cancelEditable() {
    this.editMode = false;

    this.phoneListForm.setValue({
      type: this.phone.type,
      numericNumber: this.phone.numericNumber,
    });
  }
  valid(st: string, button = false) {
    return isValid(this.phoneListForm, st, button);
  }
}
