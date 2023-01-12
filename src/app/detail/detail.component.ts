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
  isLoading: boolean = false;
  isCompare: boolean = false;

  page: number = 1;
  limit: number = 12;
  offset: number = 0;
  totalCharacter: number = 0; 
  characters: any[] = [];

  character: any;
  character_compare: any;

  @ViewChild(HeaderComponent) header!: HeaderComponent;

  constructor(
    private pokemonService: PokemonService,
    private route: ActivatedRoute,
    private location: Location,
    private cookies: CookieService) {}

    ngOnInit() {
      this.isLoading = true;
      this.getDetailCharacter();
      this.getList();
    }

    /* Get Pokemon Detail */
    getDetailCharacter(): void {
      const data = this.route.snapshot.paramMap.get('name');
      if(data != null){
        this.pokemonService.getPokemonDetailByName(data, 
          (data) => {
            this.character = data;
          }  
        )
      } else {
        this.location.back();
      }
      
      this.isLoading = false;
    }

    /* Save to My Pokemon */
    save(): void {
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

    /* Get Pokemon List */
    getList(): void{
      this.isLoading = true;
      this.characters = [];
      this.pokemonService.getPokemonList(this.limit, this.offset, 
        (data) => {
          this.totalCharacter = data.count;
          data.results.forEach((item: any) => {
            this.getDetail(item)
          });
        }  
      )
  
      this.isLoading = false;
    }
  
    /* Get Pokemon List - Detail */
    getDetail(character: any): void{
      this.pokemonService.getPokemonDetailByUrl(character.url, 
        (data) => {
          this.characters.push(data)
        }  
      )
    }
  
    /* Get Pokemon List - Pagination */
    renderPage(event: number) {
      this.page = event;
      this.offset = (event - 1) * 12;
      this.getList();
    }

    /* Compare 2 Pokemon */
    compare(character: any): void {
      this.character_compare = character;
      this.isCompare = true;
    }

    /* Compare Close */
    remove(): void {
      this.isCompare = false;
    }
}

