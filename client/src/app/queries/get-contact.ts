import {gql} from 'apollo-angular'
export const GET_CONTACT_BY_ID = gql`
query Contact($id:String!) {
    contact(id:$id){
    id,
    firstName,
    lastName,
    img,
    address,
    nickname,
    phonenums{
        id,
      number,
      contactId
    }
  }
}`