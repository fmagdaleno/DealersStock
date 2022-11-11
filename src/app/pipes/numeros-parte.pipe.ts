import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numerosParte'
})
export class NumerosPartePipe implements PipeTransform {

  transform(value: any[],  arg1: string){
    if (value && value.length){
        return value.filter(item =>{
            if (arg1 && item.vin.toLowerCase().indexOf(arg1.toLowerCase()) === -1
            && item.modelo.toLowerCase().indexOf(arg1.toLowerCase()) === -1
            && item.claseCorporativa.toLowerCase().indexOf(arg1.toLowerCase()) === -1
            && item.gfx.toLowerCase().indexOf(arg1.toLowerCase()) === -1
            && item.motor.toLowerCase().indexOf(arg1.toLowerCase()) === -1
            && item.fchInventario.toLowerCase().indexOf(arg1.toLowerCase()) === -1){
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
