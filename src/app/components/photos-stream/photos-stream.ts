import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PhotosService } from '../../core/services/photos.service';
import { Photo } from '../../core/models/photo.model';
import { InfiniteScrollDirective } from '../../shared/directives/infinite-scroll';
import { LoaderComponent } from '../loader/loader';
@Component({
  selector: 'app-photos-stream',
  standalone: true,
  imports: [CommonModule, RouterLink, InfiniteScrollDirective, LoaderComponent],
  templateUrl: './photos-stream.html',
  styleUrl: './photos-stream.scss',
})
export class PhotosStreamComponent {
  photos: Photo[] = [];
  loading = false;
  error = '';

  constructor(private photosService: PhotosService) {
    this.loadMore();
  }

  onBottom() {
    this.loadMore();
  }

  loadMore() {
    if (this.loading) return;
    this.loading = true;
    this.error = '';
    this.photosService.getNextBatch().subscribe({
      next: (batch) => {
        this.photos.push(...batch);
        this.loading = false;
      },
      error: () => {
        this.error = 'Kunde inte hämta fler foton. Försök igen.';
        this.loading = false;
      },
    });
  }
}
