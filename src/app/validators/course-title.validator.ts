import { AsyncValidatorFn, AbstractControl } from "@angular/forms";
import { catchError, debounceTime, distinctUntilChanged, from, map, Observable, of } from "rxjs";
import { CareerService } from "../pages/services/career.service";

/**
 * Validador assíncrono para verificar se uma carreira FIFA é válida.
 * @param versionsFifa - Lista de versões permitidas.
 * @returns AsyncValidatorFn
 */
export function fifaCareerValidator(career: CareerService): AsyncValidatorFn {
  return (control: AbstractControl) => {
    if (!control.value) {
      return of(null);
    }

    return career.httpVersionFifa$().pipe(
      debounceTime(500),
      distinctUntilChanged(),
      map(versionsFifa => {
        const isVersionValid = versionsFifa.some(
          (version) => version.toLowerCase() === control.value.toLowerCase()
        );
        return isVersionValid ? null : { invalidVersion: true };
      })
    );
  };
}
