import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private apollo: Apollo) {}

  mutation(query: string, variables: {} = {}) {
    return this.apollo.mutate({
      mutation: gql`
        ${query}
      `,
      variables,
    });
  }
}
