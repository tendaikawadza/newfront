import { HttpClient, HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { Token } from "@angular/compiler";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, observable, Subscription } from "rxjs";
import { CustomHttpRespone } from "../model/custom-http-response";
import { User } from "../model/user";
import { AuthenticationService } from "../service/authentication.service";
import { NotificationService } from "../service/notification.service";





import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";
import { Stock } from "../model/stock";

const baseUrl = `${environment.apiUrl}/products`;

@Injectable({
  providedIn: 'root'
})
export class StockService {

  private host=environment.apiUrl;
  private stockURL=environment.stockUrl;

  constructor(private http:HttpClient) {}
   public getStock():Observable<Stock  [] |HttpErrorResponse>{

  return  this.http.get<Stock[]>('${this.host}/stock/list');

   }

   public fetchNotifications(user:any){
    return this.http.post<any>(this.stockURL+'/stock/browseNotifications/'+user.receiverId, user);
   }


   public addStock(formData: FormData): Observable<Stock|HttpErrorResponse>{
    return this.http.post<Stock>('${this.host}/stock/add',formData);

   }
   public updateStock(formData: FormData): Observable<Stock|HttpErrorResponse>{
    return this.http.post<Stock>('${this.host}/stock/update',formData);

   }


   public deleteStock(stockId: number): Observable<any|HttpErrorResponse>{
    return this.http.delete<Stock>('${this.host}/stock/delete/${userId}');

   }
   public addProducts(formData: FormData): Observable<Stock|HttpErrorResponse>{
    return this.http.post<Stock>('${this.host}/product/product',formData);

   }
   public addProduct(product:any): Observable<any> {
    let url=`${baseUrl}/add`;    
    return this.http.post<any>(url,product);
  }
 
  getAllProducts(){  
  return this.http.get<any>(baseUrl);
  }
  updateProducts(id: string, params: any) {
    return this.http.put(`${baseUrl}/${id}`, params);
  }
   }

