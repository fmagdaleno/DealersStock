import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'modelos'
})
export class ModelosPipe implements PipeTransform {

  transform(value: any[],  arg1: string){
    if (value && value.length){
        return value.filter(item =>{
            if (item.modelo.toLowerCase().indexOf(arg1.toLowerCase()) === -1){
                return false;
            }
            return true;
       })
    }
    else{
        return value;
    }
}

}
