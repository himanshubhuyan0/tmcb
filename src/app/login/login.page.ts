import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { UserServiceService } from '../services/user-service.service';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginfrm = {username:'',password:''};
  isLoading = false;
  constructor(
    public userService: UserServiceService,
    public storeService: StorageService,
    public router : Router,
    public alertController: AlertController,
    public loadingController: LoadingController,
  ) {
  }

  ngOnInit() {      
  }
  logForm() {
    this.lodingPresent();
    this.userService.loginUser(this.loginfrm.username,this.loginfrm.password).subscribe(res =>  {
      this.loadingDismiss();
      if (res.result.status == '1') {
        if (this.storeService.storeUserid(res.result.userid)) {
          this.router.navigate(['verify']);
        }else {
          this.showAlert('Error','','Oops! something went wrong, please try again.');
        }    
      }else {
        this.showAlert('Error','',res.result.msg);
      }
    });
  }
  async showAlert(title,subtitle:any='',msg) {
    const alert = await this.alertController.create({
      header: title,
      subHeader: subtitle,
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }
  async lodingPresent() {
    this.isLoading = true;
    return await this.loadingController.create({
      message: 'Please wait...',
    }).then(a => {
      a.present().then(() => {
        console.log('presented');
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }
  async loadingDismiss() {
    this.isLoading = false;
    return await this.loadingController.dismiss().then(() => console.log('dismissed'));
  }
  goToforgotPassword() {
    //this.router.navigate(['profile/tabs/tab1']);
  }

}
