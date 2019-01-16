import { Injectable, } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminService } from '../core/services/admin.service';


import { catchError } from 'rxjs/operators';

@Injectable()
export class AdminResolver {
  constructor(
    private router: Router,
    private Admin_Service: AdminService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {

    return this.Admin_Service.get(route.params['/'])
      .pipe(catchError((err) => this.router.navigateByUrl('/')));
  }
}
