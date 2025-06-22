import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pokemon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon.component.html',
  styleUrl: './pokemon.component.css',
})
export class PokemonComponent implements OnInit {
  name!: string;
  dataPokemon: any;
  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.name = this.route.snapshot.paramMap.get('name')!;

    this.http
      .get<any>(`https://pokeapi.co/api/v2/pokemon/${this.name}`)
      .subscribe((data) => {
        this.dataPokemon = data;
        console.log('Pokémon:', data);
      });
  }
}
