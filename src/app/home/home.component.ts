import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { PokemonStyleService } from '../services/pokemon-style.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  dataPokemons: any[] = [];
  favorites: string[] = [];
  currentPage = 1;
  limit = 40;
  hovering: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private styleService: PokemonStyleService
  ) {}

  ngOnInit(): void {
    this.loadFavorites();
    this.loadPokemons();
  }

  loadPokemons(): void {
    const offset = (this.currentPage - 1) * this.limit;

    this.http
      .get<any>(
        `https://pokeapi.co/api/v2/pokemon?limit=${this.limit}&offset=${offset}`
      )
      .subscribe((data) => {
        const requests = data.results.map((pokemon: any) =>
          this.http.get(pokemon.url)
        );

        forkJoin<any[]>(requests).subscribe((fullDetails: any[]) => {
          this.dataPokemons = fullDetails.map((p) => ({
            name: p.name,
            id: p.id,
            image: p.sprites.front_default,
            types: p.types.map((t: any) => t.type.name).join(', '),
          }));
        });
      });
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.loadPokemons();
  }

  nextPage(): void {
    this.currentPage++;
    this.loadPokemons();
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadPokemons();
    }
  }

  goToDetails(name: string): void {
    this.router.navigate([`/pokemon/${name}`]);
  }

  getBackgroundColor(type: string): string {
    return this.styleService.getBackgroundColor(type);
  }

  loadFavorites() {
    const saved = localStorage.getItem('favorites');
    this.favorites = saved ? JSON.parse(saved) : [];
  }

  saveFavorites() {
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }

  isFavorite(pokemon: any): boolean {
    return this.favorites.includes(pokemon.name);
  }

  toggleFavorite(pokemon: any): void {
    if (this.isFavorite(pokemon)) {
      this.favorites = this.favorites.filter((name) => name !== pokemon.name);
    } else {
      this.favorites.push(pokemon.name);
    }
    this.saveFavorites();
  }
}
