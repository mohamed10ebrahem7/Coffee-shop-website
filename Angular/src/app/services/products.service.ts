//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { Observable ,throwError } from 'rxjs/internal/Observable';
import {  Observable, throwError } from 'rxjs';
import { map } from 'rxjs';
import { Product } from '../models/product';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  PathUrl='http://localhost:27969/api';

  constructor(public http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  getAllProds(){
    return this.http.get(`${this.PathUrl}/Products`);
  }
  getprodByID(postId:any){
    return this.http.get(`${this.PathUrl}/Products/${postId}`);
  }
  addprod(post:{name:string,price:number,image:string,description:string}){
    return this.http.post(`${this.PathUrl}/Products`,post);
  }
  deleteprodByID(postId:any){
    return this.http.delete(`${this.PathUrl}/Products/${postId}`);

  }
  editprod(postId:number,post:{id:number,name:string,price:number,image:string,description:string}){
    return this.http.put(`${this.PathUrl}/Products/${postId}`,post);
 
  }
  create(post:any): Observable<Product> {
    
    return this.http.post<any>(this.PathUrl+ '/Products', post).pipe(map((res:any)=> {
      return res
    }))
  } 

  find(id:number): Observable<Product> {
    return this.http.get<Product>(this.PathUrl + '/Products/' +id)
    .pipe(
      catchError(this.errorHandler)
    )
  }
    
  update(id:number, post:any): Observable<Product> {
    return this.http.put<Product>(this.PathUrl + '/Products/' + id, post).pipe(map((res:any)=> {
      return res
    }))
  }

  putStudent(data:any, id:number)
  {
    return this.http.put<any>(this.PathUrl + '/Products/' + id,data).pipe(map((res:any)=> {
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
}
