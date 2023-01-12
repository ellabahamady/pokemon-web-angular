import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  totalPokemon: number = 0;

  constructor(private cookies: CookieService) {}

  ngOnInit() {
    this.loadTotalPokemon();
  }

  /* Get Total My Pokemon */
  loadTotalPokemon(): void {
    const check = this.cookies.check('pokemon');
    if(check) {
      const myPokemon = JSON.parse(this.cookies.get('pokemon'));
      this.totalPokemon = myPokemon.length;
    } else {
      this.totalPokemon = 0;
    }
  }
}
