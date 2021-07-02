import { gql } from 'apollo-angular'
export const REMOVE_PHONE_NUMBER = gql`mutation DeletePhoneNumber($id:String!){
    deletePhoneNumber(id:$id){
      id
    }
  }`