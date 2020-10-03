import { Component } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { UserServiceService } from '../services/user-service.service';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  isLoading = false;
  constructor(
    public userService: UserServiceService,
    public storeService: StorageService,
    public router : Router,
    public alertController: AlertController,
    public loadingController: LoadingController,
  ) {
    this.storeService.getVerify().then(() => {
      if(this.storeService.verify>0) {
        this.storeService.getUserid().then(() => {
          if(this.storeService.uId>0) {
    
          }else {
            this.router.navigate(['']);
          }
        })
      }else {
        this.router.navigate(['']);
      }
    })
  }

}
