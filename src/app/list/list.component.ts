import { Component, OnInit, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit {
  characters: any[] = [];

  @ViewChild(HeaderComponent) header!: HeaderComponent;

  constructor(private cookies: CookieService) {}

  ngOnInit() {
    this.getList();
  }

  /* Get My Pokemon List */
  getList(): void{
    const check = this.cookies.check('pokemon');
    if(check) {
      const myPokemon = JSON.parse(this.cookies.get('pokemon'));
      this.characters = myPokemon;
    } else {
      
    }
  }

  /* Delete My Pokemon */
  delete(id: string): void {
    const check = this.cookies.check('pokemon');
    if(check) {
      const myPokemon = JSON.parse(this.cookies.get('pokemon'));
      const index = myPokemon.findIndex((item: { id: string; }) => item.id === id);
      if (index !== -1) {
        myPokemon.splice(index, 1);
      } else {
        console.log('character is not found')
      }

      this.cookies.set('pokemon', JSON.stringify(myPokemon));
    } else {
      console.log('my pokemon is empty')
    }

    this.getList();
    this.header.loadTotalPokemon();
  }
}
