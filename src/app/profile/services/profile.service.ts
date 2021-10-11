import { IProfile } from './../models/profile';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  user: IProfile;
  userBeforeEdit: IProfile;

  constructor() {}

  getProfileUser(): Observable<IProfile> {
    return from(
      new Promise<IProfile>((resolve, reject) => {
        setTimeout(() => {
          if (Math.round(Math.random())) {
            this.user = {
              firstName: 'Michael',
              lastName: 'Collins',
              username: 'michael.collins',
              email: 'michael.collins@blueface.com',
              age: 30,
            };
            resolve(this.user);
          } else {
            reject({ error: 'Profile not found' });
          }
        }, Math.random() * 5000);
      })
    );
  }

  setName(profile: IProfile): Observable<IProfile> {
    return from(
      new Promise<IProfile>((resolve, reject) => {
        setTimeout(() => {
          if (Math.round(Math.random())) {
            this.userBeforeEdit = { ...this.user };
            this.user.firstName = profile.firstName;
            this.user.lastName = profile.lastName;
            resolve(this.user);
          } else {
            reject({ error: 'Invalid name' });
          }
        }, Math.random() * 5000);
      })
    );
  }

  setEmail(email: string): Observable<IProfile> {
    return from(
      new Promise<IProfile>((resolve, reject) => {
        setTimeout(() => {
          if (Math.round(Math.random())) {
            this.user.email = email;
            resolve(this.user);
          } else {
            this.user = { ...this.userBeforeEdit };
            reject({
              error: 'Error on email generation',
              user: this.userBeforeEdit,
            });
          }
        }, Math.random() * 5000);
      })
    );
  }
}
