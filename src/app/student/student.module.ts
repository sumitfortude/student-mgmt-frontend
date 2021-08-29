import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { StudentRoute } from './student.routing';
import { ListViewModule } from '@progress/kendo-angular-listview';


@NgModule({
    imports: [
        CommonModule,
        StudentRoute,
        FormsModule,
        ReactiveFormsModule,
        ListViewModule
    ],
    declarations: [
        StudentDetailsComponent,
       
    ]
})
export class StudentModule { }