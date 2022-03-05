import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {
  Contact,
  FullContact,
  PhoneNumber,
  Photo,
  variablesQuery,
} from '../models/models';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
import * as graphqlQuery from '../shared/graphql.query';

import { ApiService } from '../services/api.service';
import { ModalService } from './modal.service';

@Injectable()
export class ContactService {
  contactsChanged = new Subject<FullContact[]>();
  loading = new Subject<boolean>();
  moreScroll = new Subject<boolean>();

  private contacts: FullContact[] = [];
  limit = 5;
  skip = 0;
  filterValue = '';
  private query: QueryRef<variablesQuery, any>;
  private index: number;
  constructor(
    private apollo: Apollo,
    private api: ApiService,
    private modalService: ModalService,
  ) {}

  getContacts = async (filterValue = '', onScroll = false): Promise<void> => {
    this.loading.next(true);
    if (!onScroll) {
      this.skip = 0;
      this.contacts = [];
      this.moreScroll.next(true);
    }
    this.filterValue = filterValue;
    const variables: variablesQuery = {
      filterValue: this.filterValue,
      skip: this.skip,
      limit: this.limit,
      date: new Date().toISOString().toString(),
    };
    this.query = this.apollo.watchQuery({
      query: gql`
        ${graphqlQuery.GET_CONTACTS_QUERY}
      `,
      errorPolicy: 'all',
      variables: variables,
    });
    let firstCall = true;

    this.query.valueChanges.subscribe((result: any) => {
      if (result.errors) console.log(result.errors);
      else if (firstCall) {
        firstCall = false;

        const contacts: FullContact[] = result.data.contacts.map(
          (contact: any) =>
            new FullContact(
              parseInt(contact.id),
              new Contact(
                contact.firstName,
                contact.lastName,
                contact.nickName,
                contact.address,
              ),
              contact.photo,
              contact.phoneNumbers,
            ),
        );
        this.skip += this.limit;
        this.contacts = [...this.contacts, ...contacts];
        this.contactsChanged.next([...this.contacts]);
        if (contacts.length !== this.limit) this.moreScroll.next(false);
      }
    });
  };

  getContact(id: number): FullContact {
    const index = this.contacts.findIndex((contact) => contact.id === id);
    this.index = index;
    return this.contacts[index];
  }

  addContact = async (
    contact: Contact,
    phoneNumbers: PhoneNumber[],
  ): Promise<boolean> => {
    let apiResponse = false;
    const strQuery = graphqlQuery.createDynamicQuery(contact);

    await this.api
      .mutation(strQuery, { phoneNumbers: phoneNumbers })
      .toPromise()
      .then((data: any) => {
        apiResponse = true;
        const newContact = new FullContact(
          data.data ? parseInt(data.data['createContact']['id']) : -1,
          contact,
          null,
          data.data ? data.data['createContact']['phoneNumbers'] : [],
        );

        this.modalService.contactEdit.next(newContact);
      })
      .catch((error: Error) => {
        console.log('there was an error sending the query', error.message);
        this.modalService.error.next(error.message);
      });
    if (apiResponse) await this.getContacts(this.filterValue);

    return apiResponse;
  };
  updateContact = async (
    id: number,
    updateContact: Contact,
  ): Promise<boolean> => {
    let apiResponse = false;
    const strQuery = graphqlQuery.updateDynamicQuery(id, updateContact);
    await this.api
      .mutation(strQuery)
      .toPromise()
      .then((data: any) => {
        apiResponse = true;
        this.contacts[this.index].contact = updateContact;
      })
      .catch((error: Error) => {
        console.log('there was an error sending the query', error.message);
        this.modalService.error.next(error.message);
      });
    if (apiResponse) await this.getContacts(this.filterValue);
    return apiResponse;
  };
  addUpdatePhoneNumber = async (
    phoneNumber: PhoneNumber,
    userId: number,
    strQueryType: string,
  ): Promise<boolean> => {
    const strQuery = graphqlQuery.createPhonenumberDynamicQuery(strQueryType);
    if (phoneNumber.id) delete phoneNumber.id;
    let apiResponse = false;
    await this.api
      .mutation(strQuery, {
        PhoneNumberInput: phoneNumber,
        id: userId,
      })
      .toPromise()
      .then((data: any) => {
        apiResponse = true;
        phoneNumber['id'] = data.data['createPhoneNumber']
          ? parseInt(data.data['createPhoneNumber']['id'])
          : parseInt(data.data['updatePhoneNumber']['id']);

        let phoneNumbers = [...this.contacts[this.index].phoneNumbers];
        if (strQueryType === 'update')
          phoneNumbers = phoneNumbers.filter(
            (phone) => phone.id !== phoneNumber['id'],
          );
        phoneNumbers.push(phoneNumber);
        this.contacts[this.index].phoneNumbers = phoneNumbers;
        this.contactsChanged.next([...this.contacts]);
      })
      .catch((error: Error) => {
        console.log('there was an error sending the query', error.message);
        this.modalService.error.next(error.message);
      });
    return apiResponse;
  };

  addUpdatePhoto = async (
    id: number,
    photo: Photo,
    strQueryType: string,
  ): Promise<boolean> => {
    const strQuery = graphqlQuery.createUpdatePhoto(strQueryType);
    let apiResponse = false;
    if (photo.id) delete photo.id;

    await this.api
      .mutation(strQuery, {
        Photo: photo,
        id: id,
      })
      .toPromise()
      .then((data: any) => {
        apiResponse = true;
        photo['id'] = data.data['createPhoto']
          ? parseInt(data.data['createPhoto']['id'])
          : parseInt(data.data['updatePhoto']['id']);
        this.contacts[this.index].photo = photo;
        this.contactsChanged.next([...this.contacts]);
      })
      .catch((error: Error) => {
        console.log('there was an error sending the query', error.message);
        this.modalService.error.next(error.message);
      });
    return apiResponse;
  };
  deleteItem = async (id: number, deleteType: string): Promise<boolean> => {
    let apiResponse = false;
    await this.api
      .mutation(
        `
        mutation {
          delete${deleteType}(id:${id})
          }
        `,
      )
      .toPromise()
      .then(() => {
        apiResponse = true;

        switch (deleteType) {
          case 'Contact':
            this.contacts.splice(this.index, 1);
            this.skip -= 1;
            break;
          case 'Photo':
            this.contacts[this.index].photo = null;
            break;
          case 'PhoneNumber':
            this.contacts[this.index].phoneNumbers = this.contacts[
              this.index
            ].phoneNumbers.filter(
              (phoneNumber) =>
                phoneNumber.id && phoneNumber.id.toString() !== id.toString(),
            );
            break;
        }

        this.contactsChanged.next([...this.contacts]);
      })
      .catch((error: Error) => {
        console.log('there was an error sending the query', error.message);
        this.modalService.error.next(error.message);
      });
    return apiResponse;
  };
}
