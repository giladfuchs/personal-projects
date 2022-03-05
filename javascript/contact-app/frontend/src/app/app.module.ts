import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ContactsComponent } from './modules/contacts/contacts.component';
import { GraphQLModule } from './shared/graphql.module';
import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from './shared/material-module';
import { ModalComponent } from './modules/modal/modal.component';
import { ContactService } from './services/contacts.service';
import { ModalService } from './services/modal.service';
import { ImgContactComponent } from './modules/modal/imgContact/imgContact.component';
import { PnoneNumberComponent } from './modules/modal/phoneNumbers/phoneNumbers.component';
import { PnoneNumberRowComponent } from './modules/modal/phoneNumbers/phoneNumberRow/phoneNumberRow.component';
import { ConactDetailsComponent } from './modules/modal/contactDetails/contactDetails.component';
@NgModule({
  declarations: [
    AppComponent,
    ContactsComponent,
    ModalComponent,
    ImgContactComponent,
    PnoneNumberComponent,
    PnoneNumberRowComponent,
    ConactDetailsComponent,
  ],
  imports: [BrowserModule, GraphQLModule, HttpClientModule, MaterialModule],
  providers: [ContactService, ModalService],
  bootstrap: [AppComponent],
})
export class AppModule {}
