import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { FullContact } from '../models/models';

@Injectable()
export class ModalService {
  contactEdit = new Subject<FullContact>();
  openModal = new Subject<boolean>();
  error = new Subject<string>();
}
