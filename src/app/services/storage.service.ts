import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  uId:any;
  logout:any;
  verify:any;
  constructor(
    public storage: NativeStorage,
  ) { }
  storeUserid(uid) {
    return this.storage.setItem('uid', uid)
    .then(
      () => {
        console.log('UID Stored');
        return 1;
      },
      error => {
        console.error('Error storing item', error);
        return 0;
      }
    );
  }
  getUserid() {
    return this.storage.getItem('uid').then(
      data => {
        if( data != null) {
          this.uId = data;
        } else {
          this.uId = -1;
        }
      },
      error => {
        this.uId = -1;
      }
    );
  }
  storeVerify() {
    return this.storage.setItem('verify', 1)
    .then(
      () => {
        console.log('Account verified');
        return 1;
      },
      error => {
        console.error('Error Account verify', error);
        return 0;
      }
    );
  }
  getVerify() {
    return this.storage.getItem('verify').then(
      data => {
        if( data != null) {
          this.verify = data;
        } else {
          this.verify = -1;
        }
      },
      error => {
        this.verify = -1;
      }
    );
  }
  logOut() {
    return this.storage.clear().then(() => {
      this.logout = 1;
    });
  }
}
