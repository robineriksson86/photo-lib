import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FavoritesStateService } from '../../core/state/favorites-state';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './favorites.html',
  styleUrl: './favorites.scss',
})
export class FavoritesComponent {
  constructor(public favorites: FavoritesStateService) {}
  remove(id: string) {
    this.favorites.remove(id);
  }
}
