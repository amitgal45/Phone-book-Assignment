import { Pipe, PipeTransform } from '@angular/core';
import { valueFromAST } from 'graphql';

@Pipe({
  name: 'isNickname'
})
export class IsNicknamePipe implements PipeTransform {

  transform(value: any[], page: number, name: string): unknown {
    console.log(value)
    let arr: any = []
    if (name=='') {
      for (let i: number = 0; i < value.length && arr.length<page*5; i++) {
        arr.push({
          id: value[i].id,
          name: value[i].nickname != null ? value[i].nickname : `${value[i].firstName} ${value[i].lastName}`,
          img: value[i].img
        })
      }
      return arr
    }
    else {
      name = name.toLowerCase()
      for (let i: number = 0; i < value.length; i++) {
        let filteredName: string = value[i].nickname != null ? value[i].nickname : `${value[i].firstName} ${value[i].lastName}`
        if (filteredName.toLowerCase().indexOf(name) > -1) {
          arr.push({
            id: value[i].id,
            name: value[i].nickname != null ? value[i].nickname : `${value[i].firstName} ${value[i].lastName}`,
            img: value[i].img
          })
        }

      }
      return arr;

    }

  }
}

// export function sortArrByName(arr, page) {
//   return arr.sort(function (a, b) {
//     var nameA = a.name.toUpperCase(); // ignore upper and lowercase
//     var nameB = b.name.toUpperCase(); // ignore upper and lowercase
//     if (nameA < nameB) {
//       return -1;
//     }
//     if (nameA > nameB) {
//       return 1;
//     }

//     // names must be equal
//     return 0;
//   }).splice((page - 1) * 5, (page * 5))
// }