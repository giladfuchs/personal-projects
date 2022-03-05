import { FormGroup } from '@angular/forms';
import { ContactView, FullContact } from '../models/models';

export const fullContactToConactView = (contact: FullContact): ContactView => {
  return new ContactView(
    contact.id,
    contact.contact.nickName
      ? contact.contact.nickName
      : [contact.contact.firstName, contact.contact.lastName].join(' '),
    contact.photo,
  );
};

export const isValid = (
  form: FormGroup,
  st: string,
  button: boolean,
): boolean => {
  return (
    form.controls[st].invalid &&
    (button || form.controls[st].dirty || form.controls[st].touched)
  );
};

export const createFilterPhoto = (
  blur: boolean,
  grayscale: boolean,
  saturate: boolean,
): string => {
  const strFilter = [
    blur ? 'blur(3px) ' : '',
    grayscale ? 'grayscale(100%) ' : '',
    saturate ? 'saturate(3) ' : '',
  ].join('');
  return strFilter !== '' ? strFilter : 'none';
};
