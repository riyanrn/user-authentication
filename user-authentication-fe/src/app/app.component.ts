import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'user-authentication-fe';
  userName = localStorage.getItem('userName');

  constructor(private router: Router){

  }

  logout(){
     localStorage.removeItem('userName')
     this.router.navigate(['/login']);
  }
}
