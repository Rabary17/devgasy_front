import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';

@Injectable()
export class AdminService {
    constructor (
        private apiService: ApiService
      ) {}

    get(slug): Observable<any> {
        return this.apiService.get('/articles/' + slug)
          .pipe(map(data => data.article));
      }

}
