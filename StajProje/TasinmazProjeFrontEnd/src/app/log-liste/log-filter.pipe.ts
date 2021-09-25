import { Pipe, PipeTransform } from "@angular/core";
import { Log } from '../Model';

@Pipe({
  name:'logFilter'
})

export class LogFilterPipe implements PipeTransform{

transform(logs : Log[] , searchTerm :string) : Log[]{
  if(!logs || !searchTerm){
    return logs;
  }
  return logs.filter(log =>
    log.aciklama.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1)
}

}
