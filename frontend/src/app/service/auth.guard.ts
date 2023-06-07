import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { StoreService } from './StoreService/store.service';

@Injectable({ providedIn: 'root' })
export class AuthGuardService implements CanActivate {

    private isLoggon: boolean = false;

  constructor(private router: Router, private store: StoreService) {
    this.store.isLoggon$.subscribe((isLoggon) => {
        console.log('logon changed = ' + isLoggon)
        this.isLoggon = isLoggon;
    });
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const isLoggon = new BehaviorSubject(this.isLoggon);
    console.log('isLoggon = ' + this.isLoggon);
    if (!this.isLoggon) {
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    }
    return isLoggon;
  }
}
