import { Component, OnInit } from '@angular/core';
import { UsersService } from './shared/services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.usersService.initAppSession();
    this.usersService.getUserFromToken()
  }

}
