import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  totalPokemon: number = 0;

  constructor() {}

  ngOnInit() {
    this.loadTotalPokemon();
  }

  /* Get Total My Pokemon */
  loadTotalPokemon(): void {
    const check = localStorage.getItem('pokemon');
    if(check) {
      const myPokemon = JSON.parse(check);
      this.totalPokemon = myPokemon.length;
    } else {
      this.totalPokemon = 0;
    }
  }
}
