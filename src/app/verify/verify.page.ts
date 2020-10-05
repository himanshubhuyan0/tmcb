import { Component } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { UserServiceService } from '../services/user-service.service';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.page.html',
  styleUrls: ['./verify.page.scss'],
})
export class VerifyPage {
  verifyfrm = {ans1:'',ans2:''};
  Q1:any;
  Q2:any;
  Qid1:any;
  Qid2:any;
  isLoading = false;
  constructor(
    public userService: UserServiceService,
    public storeService: StorageService,
    public router : Router,
    public alertController: AlertController,
    public loadingController: LoadingController,
  ) {
    this.userService.getAllquestions().subscribe(res =>  {
      this.Q1 = res.result[0].question;
      this.Q2 = res.result[1].question;
      this.Qid1 = res.result[0].rowid;
      this.Qid2 = res.result[1].rowid;
    });  
  }

  ngOnInit() {
  }
  verifysubmitForm() {
    this.lodingPresent();
    const ans1 = this.verifyfrm.ans1;
    const ans2 = this.verifyfrm.ans2;
    this.storeService.getUserid().then(() => {
      if(this.storeService.uId>0) {
        this.userService.verifyAccount(this.storeService.uId,ans1,ans2,this.Qid1,this.Qid2).subscribe(res =>  {
          this.loadingDismiss();
          if (res.result.status == '1') {
            if (this.storeService.storeVerify()) {
              this.router.navigate(['profile/tabs/tab1']);
            }     
          }else {
            this.showAlert('Error','',res.result.msg);
          }
        });
      }else {
        this.router.navigate(['']);
      }
    })
    
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
}
