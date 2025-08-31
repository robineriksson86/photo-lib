import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PhotosService } from '../../core/services/photos.service';
import { Photo } from '../../core/models/photo.model';
import { PhotosStateService } from '../../core/state/photos-state';
import { FavoritesStateService } from '../../core/state/favorites-state';

@Component({
  selector: 'app-photo-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './photo-detail.html',
  styleUrl: './photo-detail.scss',
})
export class PhotoDetailComponent {
  photo?: Photo;
  loading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private photosApi: PhotosService,
    private photosState: PhotosStateService,
    public favorites: FavoritesStateService
  ) {
    const id = this.route.snapshot.paramMap.get('id')!;

    const cached = this.photosState.getFromCache(id);
    if (cached) {
      this.photo = cached;
      this.loading = false;
    } else {
      this.photosApi.getById(id).subscribe({
        next: (p) => {
          this.photo = p;
          this.photosState.upsert(p);
          this.loading = false;
        },
        error: () => {
          this.error = 'Kunde inte ladda fotot.';
          this.loading = false;
        },
      });
    }
  }

  toggleFav(photo: Photo) {
    this.favorites.toggle(photo);
  }
}
