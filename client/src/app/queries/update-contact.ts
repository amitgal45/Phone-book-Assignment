import { gql } from 'apollo-angular'
export const UPDATE_CONTACT = gql`mutation UpdateContact($id:String!,$lastname:String!,$img:String,$address:String!,$firstname:String!,$nickname:String!){
    updateContact(contact:{
      id:$id,
      address:$address,
      lastName:$lastname,
      firstName:$firstname,
      nickname:$nickname,
      img:$img
    }){
        id,
        firstName,
        lastName,
        nickname
        img
    }
  }`