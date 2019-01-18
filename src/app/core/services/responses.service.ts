import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { Response } from '../models/response.model';
import { map } from 'rxjs/operators';


@Injectable()
export class ResponsesService {
  constructor (
    private apiService: ApiService,
  ) {}

  add(wc): Observable<Comment> {
    console.log('auth' + JSON.stringify(wc));
    return this.apiService
    .post(`/response/add`, { response: { body: wc } }
    ).pipe(map(data => data.response));
  }

  getResponseComment(commentId): Observable<Response[]> {
    return this.apiService.get(`/response/${commentId}`)
      .pipe(map(data => data.comments));
  }

  destroy(commentId, articleSlug) {
    return this.apiService
           .delete(`/response/${commentId}`);
  }

}
