import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Photo } from '../models/photo.model';
import { PhotosService } from '../services/photos.service';

const KEY = 'photosState:v1';

interface PhotosState {
  photos: Photo[];
  nextPage: number;
  loading: boolean;
}

@Injectable({ providedIn: 'root' })
export class PhotosStateService {
  private _state = new BehaviorSubject<PhotosState>(this.hydrate());
  readonly state$ = this._state.asObservable();

  get photos() {
    return this._state.value.photos;
  }
  get loading() {
    return this._state.value.loading;
  }
  get nextPage() {
    return this._state.value.nextPage;
  }

  constructor(private api: PhotosService) {}

  loadNext() {
    const s = this._state.value;
    if (s.loading) return;

    this.patch({ loading: true });

    this.api.getPage(s.nextPage).subscribe({
      next: (batch) => {
        const existing = new Set(s.photos.map((p) => p.id));
        const merged = [...s.photos, ...batch.filter((p) => !existing.has(p.id))];
        this.patch({ photos: merged, nextPage: s.nextPage + 1, loading: false });
      },
      error: () => this.patch({ loading: false }),
    });
  }

  getFromCache(id: string) {
    return this._state.value.photos.find((p) => p.id === id);
  }

  upsert(photo: Photo) {
    const s = this._state.value;
    if (s.photos.some((p) => p.id === photo.id)) return;
    this.patch({ photos: [...s.photos, photo] });
  }

  private hydrate(): PhotosState {
    try {
      const raw = sessionStorage.getItem(KEY);
      if (raw) return JSON.parse(raw) as PhotosState;
    } catch {}
    return { photos: [], nextPage: 1, loading: false };
  }

  private patch(partial: Partial<PhotosState>) {
    const next = { ...this._state.value, ...partial };
    this._state.next(next);
    try {
      sessionStorage.setItem(KEY, JSON.stringify(next));
    } catch {}
  }
}
