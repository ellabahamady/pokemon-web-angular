import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})

export class DetailComponent implements OnInit {
  character: any;

  constructor(
    private pokemonService: PokemonService,
    private route: ActivatedRoute,
    private location: Location) {}

    ngOnInit() {
      this.getDetail();
    }

    getDetail(): void{
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

    goBack(): void {
      this.location.back();
    }
}

