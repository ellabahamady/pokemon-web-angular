import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseResponse } from '../models/base-response';

const httpOptions = {
  headers : new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class BaseService {

  constructor(protected httpClient: HttpClient) { }

  get: Function = (url: string) => {
    return this.httpClient.get<BaseResponse>(`${url}`, httpOptions);
  }
}
