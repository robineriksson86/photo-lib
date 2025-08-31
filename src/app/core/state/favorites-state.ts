import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Photo } from '../models/photo.model';

const KEY = 'favorites:v1';

@Injectable({ providedIn: 'root' })
export class FavoritesStateService {
  private _favorites = new BehaviorSubject<Photo[]>(this.read());
  readonly favorites$ = this._favorites.asObservable();

  get list(): Photo[] {
    return this._favorites.value;
  }

  add(photo: Photo) {
    if (this.has(photo.id)) return;
    const next = [...this.list, photo];
    this.write(next);
  }

  remove(id: string) {
    const next = this.list.filter((p) => p.id !== id);
    this.write(next);
  }

  toggle(photo: Photo) {
    this.has(photo.id) ? this.remove(photo.id) : this.add(photo);
  }

  has(id: string): boolean {
    return this.list.some((p) => p.id === id);
  }

  private read(): Photo[] {
    try {
      return JSON.parse(localStorage.getItem(KEY) || '[]');
    } catch {
      return [];
    }
  }

  private write(next: Photo[]) {
    localStorage.setItem(KEY, JSON.stringify(next));
    this._favorites.next(next);
  }
}
