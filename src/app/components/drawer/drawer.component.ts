import { Component, OnInit, OnChanges, ViewChild, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss']
})
export class DrawerComponent implements OnInit {

  @ViewChild('sidenav') public sidenav: MatSidenav;
  @Input() openNav: boolean;
  constructor() { }

  ngOnChanges(): void {
    console.log('ngOnChanges', this.openNav);
    if (this.openNav) {
      this.sidenav.open();
    } else {
      this.sidenav?.close();
    }
  }

  navOpen($event){
    this.sidenav.toggle();
  }

  ngOnInit(): void {
  }

}
