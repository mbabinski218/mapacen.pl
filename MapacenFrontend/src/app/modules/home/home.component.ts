import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { RoutesPath } from '@core/enums/routes-path.enum';
import { MyLocalStorageService } from '@shared/services/my-local-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  admin: boolean;

  constructor(
    private router: Router,
    private myLocalStorageService: MyLocalStorageService,
  ) { }

  ngOnInit() {
    this.admin = this.myLocalStorageService.getRole() === 'User' ? false : true;
  }

  onAdminButtonClick(): void {
    this.router.navigateByUrl(RoutesPath.ADMIN_PANEL);
  }
}
