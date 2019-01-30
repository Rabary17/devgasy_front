import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(
    private apiService: ApiService
  ) { }


  new(params): Observable<[string]> {
    return this.apiService.post('/messages/new', params)
          .pipe(map(data => data.tags));
  }
}
