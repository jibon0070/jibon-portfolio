import {AbstractControl, AsyncValidatorFn, ValidationErrors} from "@angular/forms";
import {Observable, of} from "rxjs";
import {Config} from "./config";

export class AsyncValidator {
  static uniq(link: string, field: string, message: string, except: string[] = []): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (except.includes(control.value)) return of(null);
      return Observable.create((observer: any) => {
        fetch(link, {
          method: 'post',
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem(Config.token)}`
          },
          body: JSON.stringify({value: control.value, field: field})
        }).then(data => data.json()).then(data => {
          if (!data) observer.next({uniq: message});
          else observer.next(null);
          observer.complete();
        });
      });
    };
  }
}
