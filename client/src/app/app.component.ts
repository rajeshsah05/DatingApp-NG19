import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { NavComponent } from "../layout/nav/nav.component";
import { AccountService } from '../core/services/account.service';
import { lastValueFrom } from 'rxjs';
import { HomeComponent } from "../features/home/home.component";
import { User } from '../types/user';

@Component({
  selector: 'app-root',
  imports: [NavComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  private accountService = inject(AccountService);
  private http = inject(HttpClient);
  title = 'Dating App';
  protected members = signal<User[]>([]);

 async ngOnInit() {
    this.members.set(await this.getMembers());
    this.setCurrentUser();
  }

  async getMembers(){
    try {
      return lastValueFrom(this.http.get<User[]>('https://localhost:5001/api/members'));
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  setCurrentUser(){
   const userString = localStorage.getItem('user');
   if(!userString) return;
   const user = JSON.parse(userString);
   this.accountService.currentUser.set(user);
  }

}
