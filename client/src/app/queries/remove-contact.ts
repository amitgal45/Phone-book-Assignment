import { gql } from 'apollo-angular'
export const REMOVE_CONTACT = gql`mutation RemoveContact($id:String!){
    removeContact(id:$id){
      id
    }
  }`