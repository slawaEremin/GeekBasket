import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@environments/environment';
import { PromocodeRequest, PromocodeResponse } from '../models';

@Injectable({
  providedIn: 'root'
})
export class PromocodeApiService {
  private endpoint = `${environment.api}/promocode`;

  constructor(
    private http: HttpClient
  ) {}

  public apply(promoCode: string): Observable<PromocodeResponse> {
    const request = {
      promoCode,
    } as PromocodeRequest;

    return this.http.post<PromocodeResponse>(this.endpoint, request);
  }
}
