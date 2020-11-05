import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../products';

@Injectable({
  providedIn: 'root'
})

export class MainpageDataService {
  public products$ = new BehaviorSubject<Product>(null);
  productsSource$ = this.products$.asObservable();
  constructor() { }


  // AddToSideBar(item): void {
  //   this.products$.next(item);
  // }
}
