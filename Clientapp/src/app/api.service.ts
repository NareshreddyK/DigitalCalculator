import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url: string = 'http://localhost:3000/users';
  constructor(private httpClient: HttpClient) { }


  saveUser(data): Observable<any> {
    return this.httpClient.post<any>(this.url, data);
  }

  getUser(): any {
    return this.httpClient.get<any>(this.url).pipe(map((res: any) => {
      return res;
    }));
  }

  updateUser(data: any, id: number): any {
    return this.httpClient.put<any>(this.url + `/${id}`, data).pipe(map((res: any) => {
      return res;
    }));
  }
}
