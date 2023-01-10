import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})

export class PokemonService extends BaseService {
  private pokemonUrl = 'https://pokeapi.co/api/v2/pokemon';  // URL to web api

  // Get Pokemon List
  getPokemonList(lim: any, off: any, onSuccess: (data: any) => void): any {
    this.get(this.pokemonUrl +  `?limit=${lim}&offset=${off}`)
        .subscribe(
          (resp: any) => {
            onSuccess(resp.results)
          }
        )
    }

  // Get Pokemon Detail
  getPokemonDetail(pokemon: any, onSuccess: (data: any) => void): any {
    this.get(pokemon.url)
        .subscribe(
          (resp: any) => {
            onSuccess(resp)
          }
        )
  }

}

