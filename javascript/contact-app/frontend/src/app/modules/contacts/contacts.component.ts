import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, switchMap } from 'rxjs/operators';
import { ModalService } from '../../services/modal.service';
import { ElementRef } from '@angular/core';
import { ContactView, FullContact, Photo } from '../../models/models';
import { ContactService } from '../../services/contacts.service';

import {
  createFilterPhoto,
  fullContactToConactView,
} from 'src/app/shared/util';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
})
export class ContactsComponent implements OnInit, OnDestroy {
  contacts: FullContact[] = [];
  contactsView: ContactView[] = [];
  subscription: Subscription;
  public filterForm: FormGroup;

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;

  moreScroll = true;
  loading = false;

  constructor(
    private contactService: ContactService,
    private modalService: ModalService,
    private fb: FormBuilder,
  ) {
    this.filterForm = fb.group({
      search: [''],
    });
  }

  async ngOnInit() {
    await this.contactService.getContacts();
    this.subscription = this.contactService.contactsChanged.subscribe(
      (contacts: FullContact[]) => {
        this.contacts = contacts;
        this.contactsView = contacts.map((contact: FullContact) =>
          fullContactToConactView(contact),
        );
        this.loading = false;
      },
    );
    this.subscription = this.contactService.loading.subscribe(
      (loading: boolean) => {
        this.loading = loading;
      },
    );
    this.subscription = this.contactService.moreScroll.subscribe(
      (moreScroll: boolean) => {
        this.moreScroll = moreScroll;
      },
    );

    this.filterForm
      .get('search')
      ?.valueChanges.pipe(
        debounceTime(350),
        switchMap(async (value: string) => {
          this.contactsView = [];
          this.contacts = [];
          await this.contactService.getContacts(value, false);
          return value !== '' ? value : ' ';
        }),
      )
      .subscribe((data: any) => {});
  }

  async onScroll() {
    let element = this.myScrollContainer.nativeElement;

    if (!this.loading && this.moreScroll)
      if (element.scrollHeight < element.scrollTop + 350) {
        await this.contactService.getContacts(
          this.filterForm.get('search')?.value,
          true,
        );
      }
  }

  addContact() {
    this.modalService.openModal.next(true);
  }

  onEditContact(id: number) {
    const contact = this.contactService.getContact(id);
    this.modalService.contactEdit.next(contact);
  }

  createFilterPhoto(photo: Photo): string {
    return createFilterPhoto(photo.blur, photo.gray, photo.saturation);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
