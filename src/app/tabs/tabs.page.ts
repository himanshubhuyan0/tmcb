import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  tabs:any='';
  constructor(
    public router : Router,
  ) {}
  tabSwitched() {
    this.router.navigate(['account']);
  }

}
