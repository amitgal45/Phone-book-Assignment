import {gql} from 'apollo-angular'

export const CREATE_PHONE_NUMBER = gql`mutation CreatePhoneNumber($contactId:String!,$number:String!){
    createPhoneNumber(
      contactId:$contactId,
      number:$number
    ){
      id,
      number,
      contactId
    }
  }`