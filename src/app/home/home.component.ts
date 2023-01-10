import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  limit = 12;
  off = 0;
  characters: any[] = [];

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.getList();
  }

  getList(): void{
    this.pokemonService.getPokemonList(this.limit, this.off, 
      (data) => {
        data.forEach((item: any) => {
          this.getDetail(item)
        });
      }  
    )
  }

  getDetail(character: any): void{
    this.pokemonService.getPokemonDetailByUrl(character.url, 
      (data) => {
        this.characters.push(data)
      }  
    )
  }
}

