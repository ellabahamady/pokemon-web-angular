import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PokemonService } from '../services/pokemon.service';
import { CookieService } from 'ngx-cookie-service';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})

export class DetailComponent implements OnInit {
  character: any;

  @ViewChild(HeaderComponent) header!: HeaderComponent;

  constructor(
    private pokemonService: PokemonService,
    private route: ActivatedRoute,
    private location: Location,
    private cookies: CookieService) {}

    ngOnInit() {
      this.getDetail();
    }

    getDetail(): void {
      const data = this.route.snapshot.paramMap.get('name');
      if(data != null){
        this.pokemonService.getPokemonDetailByName(data, 
          (data) => {
            this.character = data;
            console.log(this.character)
          }  
        )
      } else {
        this.location.back();
      }
      
    }

    catch(): void {
      const data = {
        id: this.character.id,
        name: this.character.name,
        image: this.character.sprites.other.dream_world.front_default ? this.character.sprites.other.dream_world.front_default : this.character.sprites.other.home.front_default
      }
      
      const check = this.cookies.check('pokemon');
      if(check) {
        const myPokemon = JSON.parse(this.cookies.get('pokemon'));
        if(myPokemon.some((item: { id: any; }) => item.id === data.id)){
          console.log('data exist')
        } else {
          myPokemon.push(data);
          this.cookies.set('pokemon', JSON.stringify(myPokemon));
        }
      } else {
        const list = [];
        list.push(data);

        this.cookies.set('pokemon', JSON.stringify(list));
      }

      this.header.loadTotalPokemon();
    }

    goBack(): void {
      this.location.back();
    }
}

