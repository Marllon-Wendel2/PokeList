import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { CommonModule } from '@angular/common';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzAlertModule } from 'ng-zorro-antd/alert';

@Component({
  selector: 'app-pokemon',
  standalone: true,
  imports: [
    CommonModule,
    NzCardModule,
    NzTagModule,
    NzProgressModule,
    NzSpinModule,
    NzDescriptionsModule,
    NzResultModule,
    NzAlertModule,
  ],
  templateUrl: './pokemon.component.html',
  styleUrl: './pokemon.component.css',
})
export class PokemonComponent implements OnInit {
  ngOnInit(): void {}
}
