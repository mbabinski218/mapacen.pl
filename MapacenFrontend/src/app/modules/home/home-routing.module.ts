import { NgModule } from '@angular/core';
import { AuthGuard } from '@app/auth/auth.guard';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '@modules/home/home.component';
import { AdminComponent } from '@modules/admin/admin.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'admin-panel',
    component: AdminComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule { }
