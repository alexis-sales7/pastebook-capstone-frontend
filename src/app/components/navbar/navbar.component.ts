import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  token = false;

  constructor() {}

  ngOnInit(): void {}

  switchView() {
    this.token = !this.token;
  }
}
