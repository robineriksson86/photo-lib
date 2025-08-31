import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, Observable } from 'rxjs';
import { Photo } from '../models/photo.model';

@Injectable({ providedIn: 'root' })
export class PhotosService {
  private readonly limit = 20;
  constructor(private http: HttpClient) {}

  getPage(page: number): Observable<Photo[]> {
    const url = `https://picsum.photos/v2/list?page=${page}&limit=${this.limit}`;
    const jitter = 200 + Math.floor(Math.random() * 100);
    return this.http.get<Photo[]>(url).pipe(delay(jitter));
  }

  getById(id: string): Observable<Photo> {
    return this.http.get<Photo>(`https://picsum.photos/id/${id}/info`);
  }
}
