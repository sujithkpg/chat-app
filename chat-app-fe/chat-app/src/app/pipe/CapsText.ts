import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
name:'capsText'
})
export class CapsText implements PipeTransform{

    transform(value : string)
    {
        return value.toUpperCase();
    }
}