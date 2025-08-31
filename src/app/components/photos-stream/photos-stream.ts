import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { map } from 'rxjs/operators';
import { InfiniteScrollDirective } from '../../shared/directives/infinite-scroll';
import { LoaderComponent } from '../loader/loader';
import { PhotosStateService } from '../../core/state/photos-state';
import { FavoritesStateService } from '../../core/state/favorites-state';

@Component({
  selector: 'app-photos-stream',
  standalone: true,
  imports: [CommonModule, RouterLink, InfiniteScrollDirective, LoaderComponent],
  templateUrl: './photos-stream.html',
  styleUrl: './photos-stream.scss',
})
export class PhotosStreamComponent {
  photos$ = this.state.state$.pipe(map((s) => s.photos));
  loading$ = this.state.state$.pipe(map((s) => s.loading));

  constructor(private state: PhotosStateService, public favorites: FavoritesStateService) {
    if (this.state.photos.length === 0) this.state.loadNext();
  }

  onBottom() {
    this.state.loadNext();
  }

  onToggleFavorite(ev: MouseEvent, p: { id: string }) {
    ev.preventDefault();
    ev.stopPropagation();
    this.favorites.toggle(p as any);
  }
}
