import { IProfile } from './../models/profile';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  formGroup: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      firstName: this.fb.control(''),
      lastName: this.fb.control(''),
      username: this.fb.control(''),
      email: this.fb.control({ value: '', disabled: true }),
      age: this.fb.control(''),
    });
  }

  getData(): IProfile {
    return this.formGroup.getRawValue();
  }

  setData(data: IProfile) {
    this.formGroup.setValue(data);
  }

  setEmail(data: string) {
    this.formGroup.get('email').setValue(data);
  }
}
