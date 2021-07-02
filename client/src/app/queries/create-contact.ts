import { gql } from 'apollo-angular'
export const CREATE_CONTACT = gql`
mutation create($nickname:String,$lastName:String!,
  $firstName:String!,$img:String!,$address:String
  ){
    createContact(nickname:$nickname,address:$address,
    firstName:$firstName,lastName:$lastName,
      img:$img
    ){
      id,
      firstName,
      lastName,
      nickname,
      img
    }
  }`