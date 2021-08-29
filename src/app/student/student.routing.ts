
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentDetailsComponent } from './student-details/student-details.component';

const route: Routes = [
    {
        path: 'student-details/:id', component: StudentDetailsComponent
    },
   
]

export const StudentRoute: ModuleWithProviders<any> = RouterModule.forChild(route);