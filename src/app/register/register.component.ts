import { Component, OnDestroy, OnInit } from '@angular/core';


import { NgForm } from '@angular/forms';

import { Router } from "@angular/router";
import { from, Observable, observable, Subscription } from "rxjs";
import { HeaderType } from "../enum/header-type.enum";


import { User } from "../model/user";
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from "../service/authentication.service";
import { NotificationType } from '../enum/notification-type.enum';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  showLoading: boolean | undefined;
  private subscriptions: Subscription[] = [];
  Observable: any;
  notificationService: any;
  showPasswordOnPage: any;
  isShowPassword : boolean = false;

  constructor(private router: Router,
    private authenticationService: AuthenticationService, private messageService: MessageService) { }

  ngOnInit(): void {
    if (this.authenticationService.isUserLoggedIn()) {
      this.router.navigateByUrl('/user/management');
    }

  }


  onRegister(user: User): void {
    this.showLoading = true;
    this.isShowPassword = false;
    console.log(user);
    this.subscriptions.push(
      this.authenticationService.register(user).subscribe({
                next: (response: any) => {
                  console.log(JSON.stringify(response))

          this.showLoading = false;
          this.showLoading = false;
          this.messageService.add({ severity: 'success', summary: 'Success', detail: `A new account was created for ${response.firstName}. Please check your email for password to log in.` });
          this.showPasswordOnPage = response['originalPassword'];
          this.isShowPassword = true;
        setTimeout(() =>{
          this.router.navigate(['/login']);
        }, 30000);
         
        },
        error: (errorREponse: HttpErrorResponse) => {
          this.isShowPassword = false;
          console.log(errorREponse);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error' });

        }
      })
    );
  }




  private sendNotification(notificationType: NotificationType, message: string): void {
    if (message) {
      this.notificationService.notify(notificationType, message);
    } else {
      this.notificationService.notify(notificationType, 'An error occurred. Please try again.');
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
