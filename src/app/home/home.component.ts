import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  page: number = 1;
  limit: number = 12;
  offset: number = 0;
  totalCharacter: number = 0; 
  characters: any[] = [];

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.getList();
  }

  getList(): void{
    this.characters = [];
    this.pokemonService.getPokemonList(this.limit, this.offset, 
      (data) => {
        console.log(data.results)
        this.totalCharacter = data.count;
        data.results.forEach((item: any) => {
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

  renderPage(event: number) {
    this.page = event;
    this.offset = (event - 1) * 12;
    this.getList();
  }
}

