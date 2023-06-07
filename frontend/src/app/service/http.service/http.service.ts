import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  
  constructor(private http: HttpClient) { }

  getHeaders = () => {
    const jwt_token = localStorage.getItem("jwt_token");
    if(jwt_token) {
      return new HttpHeaders()
      .set('Access-Control-Allow-Headers', 'x-access-token')
      .set('x-access-token', localStorage.getItem("jwt_token") as string);
    } else {
      return {}
    }
  }

  get( url: string,cond:any ) {
    return this.http.get( url, { 'headers': this.getHeaders(),'params':{cond} });
  }

  post( url: string, data: any ) {
    return this.http.post( url, data , { 'headers': this.getHeaders() });
  }

  put( url: string, data: any ) {
    return this.http.put( url, data, { 'headers': this.getHeaders() });
  }

  delete( url: string/*:_id*/ ) {
    return this.http.delete( url , { 'headers': this.getHeaders() });
  }

  upload( url: string, data: any )
  {
    return this.http.put(url, data, {
      reportProgress: true,
      observe: "events",
      headers: this.getHeaders()
    })
  }
}
