import { Routes } from '@angular/router';
import { PhotosStreamComponent } from './components/photos-stream/photos-stream';
import { FavoritesComponent } from './components/favorites/favorites';
import { PhotoDetailComponent } from './components/photo-detail/photo-detail';

export const routes: Routes = [
  { path: '', component: PhotosStreamComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: 'photos/:id', component: PhotoDetailComponent },
  { path: '**', redirectTo: '' },
];
