import { Component, OnInit } from '@angular/core';
import { Character } from '../models/character';
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

  ngOnInit(): void {

    this.pokemonService.getPokemonList(this.limit, this.off, 
      (data) => {
        data.forEach((item: any) => {
          this.getDetail(item)
        });
      }  
    )
  }

  getDetail(character: any) {
    this.pokemonService.getPokemonDetail(character, 
      (data) => {
        data.image = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + data.id + '.png';
        this.characters.push(data)
        console.log(this.characters)
      }  
    )
  }
}

