import { Component, HostBinding } from '@angular/core';
import { FormControl } from '@angular/forms';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  @HostBinding('class') className = 'darkMode';

  toggleControl = new FormControl(true);

  constructor(private overlay: OverlayContainer, private router: Router) { }

  ngOnInit(): void {
    this.toggleControl.valueChanges.subscribe((darkMode) => {
      const darkClassName = 'darkMode';
      this.className = darkMode ? darkClassName : '';
      darkMode ? this.overlay.getContainerElement().classList.add(darkClassName) : this.overlay.getContainerElement().classList.remove(darkClassName);
    });
  }

  onAdminButtonClick(): void {
    this.router.navigateByUrl('/home/admin-panel');
  }
}
