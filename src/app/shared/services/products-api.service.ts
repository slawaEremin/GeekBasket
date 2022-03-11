import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@environments/environment';
import { ProductItem } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ProductsApiService {
  private endpoint = `${environment.api}/products`;

  constructor(
    private http: HttpClient
  ) {}

  public getAll(): Observable<ProductItem[]> {
    return this.http.get<ProductItem[]>(this.endpoint);
  }
}
