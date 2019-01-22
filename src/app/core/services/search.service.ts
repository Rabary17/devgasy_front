import { Injectable } from '@angular/core';
import { ApiService } from '../services/api.service';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from '../models/article.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: ApiService) { }

  search(keyword): Observable<Article> {
    return this.http
    .get(
      '/articles/' + keyword,
      new HttpParams()
    );

  }
}
