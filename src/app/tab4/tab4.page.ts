import { Component } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { UserServiceService } from '../services/user-service.service';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page {
  isLoading = false;
  userDetails:any;
  constructor(
    public userService: UserServiceService,
    public storeService: StorageService,
    public router : Router,
    public alertController: AlertController,
    public loadingController: LoadingController,
  ) {
    this.lodingPresent();
    this.storeService.getVerify().then(() => {
      if(this.storeService.verify>0) {
        this.storeService.getUserid().then(() => {
          if(this.storeService.uId>0) {
            this.userService.getAlluserDetails(this.storeService.uId).subscribe(res =>  {
              this.loadingDismiss();
              this.userDetails = res.result;
            })
          }else {
            //this.router.navigate(['']);
          }
        })
      }else {
        //this.router.navigate(['']);
        //Remove Koribo lagibo
        this.userService.getAlluserDetails(19).subscribe(res =>  {
          this.loadingDismiss();
          this.userDetails = res.result;
          console.log( this.userDetails);
        })
      }
    })
    
  }

  ngOnInit() {
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
