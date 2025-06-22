import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PokemonComponent } from './pokemon/pokemon.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'pokemon/:name',
    component: PokemonComponent,
  },
  {
    path: 'favoritos',
    loadComponent: () =>
      import('./favoritos/favoritos.component').then(
        (m) => m.FavoritosComponent
      ),
  },
];
