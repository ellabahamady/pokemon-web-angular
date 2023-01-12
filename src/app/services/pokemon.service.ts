import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})

export class PokemonService extends BaseService {
  private pokemonUrl = 'https://pokeapi.co/api/v2/pokemon';  // URL to web api

  /* Get Pokemon List */
  getPokemonList(limit: any, offset: any, onSuccess: (data: any) => void): any {
    this.get(this.pokemonUrl +  `?limit=${limit}&offset=${offset}`)
        .subscribe(
          (resp: any) => {
            onSuccess(resp)
          }
        )
    }

  /* Get Pokemon Detail by Url */
  getPokemonDetailByUrl(url: string, onSuccess: (data: any) => void): any {
    this.get(url)
        .subscribe(
          (resp: any) => {
            onSuccess(resp)
          }
        )
  }

  /* Get Pokemon Detail by Name */
  getPokemonDetailByName(name: string, onSuccess: (data: any) => void): any {
    this.get(this.pokemonUrl +  `/${name}/`)
        .subscribe(
          (resp: any) => {
            onSuccess(resp)
          }
        )
  }
}

