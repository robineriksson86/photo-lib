import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, Observable } from 'rxjs';
import { Photo } from '../models/photo.model';

@Injectable({ providedIn: 'root' })
export class PhotosService {
  private page = 1;
  private readonly limit = 20;

  constructor(private http: HttpClient) {}

  getNextBatch(): Observable<Photo[]> {
    const url = `https://picsum.photos/v2/list?page=${this.page}&limit=${this.limit}`;
    this.page++;
    const jitter = 200 + Math.floor(Math.random() * 100);
    return this.http.get<Photo[]>(url).pipe(delay(jitter));
  }

  getById(id: string): Observable<Photo> {
    return this.http.get<Photo>(`https://picsum.photos/id/${id}/info`);
  }
}
