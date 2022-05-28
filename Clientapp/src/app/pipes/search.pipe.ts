import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, fieldName?: any, fieldValue?: any): any {
    if(!fieldName || !fieldValue){
      return value;
    }
    return value.filter((val)=>{
      let rVal=(val[fieldName].toLocaleLowerCase().includes(fieldValue));
      return rVal;
    })

  }

}
