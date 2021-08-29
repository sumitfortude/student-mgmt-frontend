import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentComponent } from './student/student.component';

const route: Routes = [
 
  {
    path: '', 
    component:StudentComponent
  },

]

export const AppRouting: ModuleWithProviders<any> = RouterModule.forRoot(route, { useHash: true });