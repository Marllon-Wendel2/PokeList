import { TestBed } from '@angular/core/testing';

import { PokemonStyleService } from './pokemon-style.service';

describe('PokemonStyleService', () => {
  let service: PokemonStyleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokemonStyleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
