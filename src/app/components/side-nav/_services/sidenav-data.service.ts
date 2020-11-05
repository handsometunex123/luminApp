import { MainpageDataService } from './../../main-page/_service/mainpage-data.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SidenavDataService {
  public currency$ = new BehaviorSubject<string>("USD");
  constructor(public mainService: MainpageDataService) { }

  // getAllProducts$ = this.mainService.productsSource$.pipe(
    
  // )

}
