import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListViewModule } from '@progress/kendo-angular-listview';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { UploadModule } from '@progress/kendo-angular-upload';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { EditService } from '../service/edit.service';




@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ListViewModule,
        DateInputsModule,
        UploadModule,
        DialogsModule
    ],
    declarations: [ ],
    providers:[]
})
export class StudentModule { }