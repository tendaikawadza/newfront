import { HttpClient, HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { Token } from "@angular/compiler";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, observable, Subscription } from "rxjs";
import { CustomHttpRespone } from "../model/custom-http-response";
import { User } from "../model/user";
import { AuthenticationService } from "./authentication.service";
import { NotificationService } from "./notification.service";





import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";
import { Stock } from "../model/stock";

const baseUrl = `${environment.apiUrl}/user`;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private host=environment.apiUrl;
  private stockURL=environment.stockUrl;

  constructor(private http:HttpClient) {}
   public getStock():Observable<Stock  [] |HttpErrorResponse>{

  return  this.http.get<Stock[]>('${this.host}/stock/list');

   }

   public fetchNotifications(user:any){
    return this.http.post<any>(this.stockURL+'/stock/browseNotifications/'+user.receiverId, user);
   }
   createUserFormDate(data:any,test:any,tsts:any){

   }
   public addUser(formData:any): Observable<Stock|HttpErrorResponse>{
    return this.http.post<Stock>('${this.host}/user/add',formData);

   }
   getAllUsers():Observable<any>{  
    return this.http.get<any>(baseUrl+'/list');
    }
  

   }

