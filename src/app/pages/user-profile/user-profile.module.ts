import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './user-profile.component';

const routes: Routes = [
  { 
    path: '', 
    component: UserProfileComponent,
    children: [
      { path: '', redirectTo: 'profile', pathMatch: 'full' },
      { 
        path: 'profile', 
        component: UserProfileComponent,
        data: { tab: 'profile' }
      },
      { 
        path: 'orders', 
        component: UserProfileComponent,
        data: { tab: 'orders' }
      },
      { 
        path: 'favorites', 
        component: UserProfileComponent,
        data: { tab: 'favorites' }
      }
    ]
  }
];

@NgModule({
  imports: [
    UserProfileComponent,
    RouterModule.forChild(routes)
  ]
})
export class UserProfileModule { }
