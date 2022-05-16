import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import {  Observable, throwError } from 'rxjs';
import { map } from 'rxjs';
import { catchError } from 'rxjs/operators';





@Injectable({
  providedIn: 'root'
})
export class UsersService {

  PathUrl='http://localhost:27969/api';

  constructor(public http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  create(user:any): Observable<User> {
    return this.http.post<any>(this.PathUrl+ '/Users', user).pipe(map((res:any)=> {
      return res
    }))
  } 

  login(){
    return this.http.get<any>('http://localhost:27969/api/Users');
    // .pipe(
    //   catchError(this.errorHandler)
    // )
  }
 

  editCount(UserID:number,user:any): Observable<User>{
    return this.http.put<User>(`${this.PathUrl}/Users/${UserID}`,user).pipe(map((res:any)=> {
      return res
    }))
  }

  errorHandler(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }

 find(id:number): Observable<User> {
  return this.http.get<User>(this.PathUrl + '/Products/' +id)
  .pipe(
    catchError(this.errorHandler)
  )
}

}