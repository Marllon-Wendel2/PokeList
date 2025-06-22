import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  dataPokemons: any[] = [];
  currentPage = 1;
  limit = 40;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
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
    switch (type) {
      case 'fire':
        return '#F08030';
      case 'water':
        return '#6890F0';
      case 'grass':
        return '#78C850';
      case 'electric':
        return '#F8D030';
      case 'psychic':
        return '#F85888';
      case 'ice':
        return '#98D8D8';
      case 'dragon':
        return '#7038F8';
      case 'dark':
        return '#705848';
      case 'fairy':
        return '#EE99AC';
      case 'poison':
        return '#A040A0';
      case 'bug':
        return '#A8B820';
      case 'rock':
        return '#B8A038';
      case 'ground':
        return '#E0C068';
      case 'fighting':
        return '#C03028';
      case 'ghost':
        return '#705898';
      case 'steel':
        return '#B8B8D0';
      case 'flying':
        return '#A890F0';
      case 'normal':
        return '#A8A878';
      default:
        return '#DDD';
    }
  }
}
