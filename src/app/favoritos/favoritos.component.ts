import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PokemonStyleService } from '../services/pokemon-style.service';

@Component({
  selector: 'app-favoritos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css'],
})
export class FavoritosComponent implements OnInit {
  favoritos: string[] = [];
  pokemons: any[] = [];

  constructor(
    private http: HttpClient,
    private styleService: PokemonStyleService
  ) {}

  ngOnInit(): void {
    const saved = localStorage.getItem('favorites');
    this.favoritos = saved ? JSON.parse(saved) : [];

    // Buscar os dados na PokéAPI
    this.favoritos.forEach((name) => {
      this.http
        .get<any>(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .subscribe((data) => {
          this.pokemons.push({
            name: data.name,
            id: data.id,
            types: data.types.map((t: any) => t.type.name).join(', '),
            image: data.sprites.front_default,
          });
        });
    });
  }

  getBackgroundColor(type: string): string {
    return this.styleService.getBackgroundColor(type);
  }
}
