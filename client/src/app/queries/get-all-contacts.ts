import {gql} from 'apollo-angular'
export const GET_ALL_CONTACTS = gql`query GetAllContact($page:Float!) {
    getAllContacts(page:$page){
    id,
    firstName,
    lastName,
    nickname
    img
  }
}
`