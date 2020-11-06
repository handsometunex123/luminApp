import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  title: string = "Dashboard";

  @Output()
  open: EventEmitter<boolean> = new EventEmitter();

  ngOnInit(): void {
  }

  clickMenu() {
    this.open.emit(true);
  }

}
