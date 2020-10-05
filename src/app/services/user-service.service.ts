import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  getBaseUrl = 'http://assamgovjobs.com/shareholder/apis/v1/getapi';
  postBaseUrl = 'http://assamgovjobs.com/shareholder/apis/v1/postapi';
  constructor(
    public http: HttpClient
  ) { }
  getAllquestions() {
    const url = this.getBaseUrl + '?type=securityquestions';
    return this.http.get(url).pipe(map((res: any) => {
      return res;
    }));
  }
  loginUser(username,password) {
    const url = this.postBaseUrl + '?type=login&username='+username+'&password='+password;
    return this.http.get(url).pipe(map((res: any) => {
      return res;
    }));
  }
  verifyAccount(uId,ans1,ans2,qus1,qus2) {
    const url = this.postBaseUrl + '?type=verify&uid='+uId+'&ans1='+ans1+'&ans2='+ans2+'&q1='+qus1+'&q2='+qus2;
    return this.http.get(url).pipe(map((res: any) => {
      return res;
    }));
  }
  getAlluserDetails(uid) {
    const url = this.getBaseUrl + '?type=userdetails&uid='+uid;
    return this.http.get(url).pipe(map((res: any) => {
      return res;
    }));
  }
}
