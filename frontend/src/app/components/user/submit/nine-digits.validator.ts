import { ValidatorFn, AbstractControl } from '@angular/forms';

export function nineDigitsValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    const regex = /[^0-9]/;

    if (value) {
      // Extract the first 9 digits from the input value
      if(regex.test(value)){
        return { 'invalidNineDigits': { value } };
      }
      else{
        const nineDigits = value.replace(/\D/g, '').substring(0, 9);
        if (!/^\d{9}$/.test(nineDigits)) {
          return { 'invalidNineDigits': { value } };
        }
      }
      
    }
    return null;
  };
}