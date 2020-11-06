import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject, of, Observable } from 'rxjs';
import { Product } from '../products';

@Injectable({
  providedIn: 'root'
})

export class MainpageDataService {
  public products$ = new BehaviorSubject<Product>(null);
  productsSource$ = this.products$.asObservable();
  currency: 'USD';
  constructor(private apollo: Apollo,) { }

}
