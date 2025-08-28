import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PhotosService } from '../../core/services/photos.service';
import { Photo } from '../../core/models/photo.model';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-photo-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './photo-detail.html',
  styleUrl: './photo-detail.scss',
})
export class PhotoDetailComponent {
  photo$!: Observable<Photo>;

  constructor(private route: ActivatedRoute, private photos: PhotosService) {
    this.photo$ = this.route.paramMap.pipe(
      switchMap((params) => this.photos.getById(params.get('id')!))
    );
  }
}
