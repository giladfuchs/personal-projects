import { Contact, Photo } from '../models/models';

export const GET_CONTACTS_QUERY = `
   query ($limit: Int!, $skip: Int!, $filterValue: String!, $date: String!){
     contacts(filterValue: $filterValue, skip: $skip, limit: $limit, date: $date) {
       id
       firstName
       lastName
       nickName
       address
       phoneNumbers{type, id, numericNumber}
 			photo{id, imgUrl,  gray, blur, saturation}
     }
   }
 `;

export const createUpdatePhoto = (strQueryType: string): string => {
  return `
mutation($Photo: CreatePhotoInput!, $id: Int!){
  ${strQueryType}Photo(
      id:$id,
      Photo:$Photo
      )
  {id}
}`;
};
export const updateDynamicQuery = (id: number, contact: Contact): string => {
  return `
       mutation{
         updateContact(
       id:${id},
          UpdateContactInput:{
             firstName:"${contact.firstName}",
             lastName:"${contact.lastName}",
             nickName:${contact.nickName ? `"${contact.nickName}"` : null},
             address:${contact.address ? `"${contact.address}"` : null},
             })
             {id}
         }`;
};
export const createDynamicQuery = (contact: Contact): string => {
  return `
    mutation ($phoneNumbers: [CreatePhoneNumberInput!]){
      createContact(
          CreateContactInput:{
          firstName:"${contact.firstName}",
          lastName:"${contact.lastName}",
          nickName:${contact.nickName ? `"${contact.nickName}"` : null},
          address:${contact.address ? `"${contact.address}"` : null},
          phoneNumbers: $phoneNumbers
       },
       )
       {
      id
      phoneNumbers{id, type, numericNumber}
      }
        }`;
};
const capitalize = (s: string) => {
  return s.charAt(0).toUpperCase() + s.slice(1);
};
export const createPhonenumberDynamicQuery = (strQueryType: string): string => {
  return `
    mutation ($PhoneNumberInput: ${capitalize(
      strQueryType,
    )}PhoneNumberInput!, $id: Int!){
      ${strQueryType}PhoneNumber(
        id:$id,
        PhoneNumberInput:$PhoneNumberInput
     
       )
       {id}
        }`;
};
