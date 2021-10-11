import { FormGroup } from '@angular/forms';
import { FormService } from './../../services/form.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { combineLatest, defer, merge, Observable, of } from 'rxjs';
import { catchError, startWith, switchMap, tap } from 'rxjs/operators';
import { IProfile } from '../../models/profile';
import { ProfileService } from './../../services/profile.service';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss'],
})
export class ProfileSettingsComponent implements OnInit {
  public title = 'Profile';
  public user$: Observable<IProfile>;

  formGroup = this.form.formGroup;

  public savingProfile: boolean;
  public savingProfileError: string;

  constructor(private profile: ProfileService, public form: FormService) {}

  ngOnInit() {
    this.getProfile();
    combineLatest([
      this.formGroup.get('firstName').valueChanges,
      this.formGroup.get('lastName').valueChanges,
    ]).subscribe(this.inputChange);
  }

  getProfile() {
    this.user$ = this.profile.getProfileUser().pipe(
      catchError(this.onError),
      tap((data) => this.form.setData(data))
    );
  }

  onError = (data): Observable<IProfile> => {
    if (data?.error) {
      return this.profile.getProfileUser().pipe(catchError(this.onError));
    }
    return of(data);
  };

  saveProfile() {
    defer(() => {
      this.savingProfile = true;
      this.savingProfileError = undefined;
      return this.profile.setName(this.form.getData());
    })
      .pipe(switchMap(() => this.profile.setEmail(this.form.getData().email)))
      .subscribe(
        (data) => this.form.setData(data),
        (err) => {
          this.savingProfile = false;
          if (err?.user) {
            this.form.setData(err?.user);
          }
          this.savingProfileError = err.error;
        },
        () => (this.savingProfile = false)
      );
  }

  inputChange = ([firstName, lastName]) => {
    this.savingProfileError = undefined;
    this.form.setEmail(
      firstName.trim().toLowerCase() +
        '.' +
        lastName.trim().toLowerCase() +
        '@blueface.com'
    );
  };
}
