import { FormGroup } from '@angular/forms';

export function ConfirmedValidator(controlName: string, matchingControlName: string){
    return (registerForm: FormGroup) => {
        const control = registerForm.controls[controlName];
        const matchingControl = registerForm.controls[matchingControlName];
        if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
            return;
        }
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ confirmedValidator: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}
