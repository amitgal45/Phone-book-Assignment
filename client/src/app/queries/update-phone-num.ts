import { gql } from 'apollo-angular'
export const UPDATE_PHONE_NUMBER = gql`mutation UpdatePhoneNumber($number:String!,$id:String!,$contactId:String!){
    updatePhoneNumber(number:$number,id:$id,contactId:$contactId){
      id,number,contactId
    }
  }`