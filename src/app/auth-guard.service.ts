import { CommonUtilityService } from './common-utility.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(public _commonUtilityService: CommonUtilityService, public router: Router) {}
  canActivate(): boolean {
    if (!this._commonUtilityService.isLoggedIn()) {
      this.router.navigate(['/Login']);
      return false;
    }
    return true;
  }

}
