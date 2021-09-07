import { concat, Observable, of } from 'rxjs';
import { Component, OnInit, Injectable } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CancelEvent, EditEvent, GridDataResult, PageChangeEvent, RemoveEvent, SaveEvent } from '@progress/kendo-angular-grid';
import { delay } from 'rxjs/operators';
import { EditService } from '../service/edit.service';
import * as moment from 'moment';
import { FileRestrictions, UploadEvent } from '@progress/kendo-angular-upload';
import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpProgressEvent, HttpRequest, HttpResponse } from '@angular/common/http';
import { SocketService } from '../service/socket.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  public view!: GridDataResult;
  public pageSize = 10;
  public skip = 0;
  public studentFormGroup!: FormGroup;
  public item:Student[] = []
 
  private editedRowIndex!: number;

  public events: string[] = [];
  public imagePreviews: any[] = [];

  public uploadSaveUrl = environment.uploadApiurl;
  public uploadRestrictions: FileRestrictions = {
    allowedExtensions: [".xlsx", ".xls"],
  };

  public dialogOpened: Boolean = false
  public removeHandlerData: any


  constructor(private editService:EditService, private fb: FormBuilder, private socketServie: SocketService) {
  
    this.socketServie.studentComponentMethodCalled$.subscribe(
      () => {
        this.read()
      }
    );

  }
  

  public ngOnInit(): void {
      this.read()
  }

  read(){
    this.editService.read().subscribe((response: any)=>{
      this.item = response.data.getAllStudent
      this.loadItems()
    });
  }

  public pageChange({ skip, take }: PageChangeEvent): void {
    this.skip = skip;
    this.pageSize = take;
    this.loadItems();
  }

  public loadItems(): void {
    this.view = {
      data: this.item.slice(this.skip, this.skip + this.pageSize),
      total: this.item.length,
    };
  }
 

  public editHandler({ dataItem, isNew, rowIndex, sender }: EditEvent) {
    this.closeEditor(sender);
    let date = dataItem.birthdate
    date = new Date(parseInt(date.split('-')[0]), (parseInt(date.split('-')[1]) - 1), parseInt(date.split('-')[2]))

    this.studentFormGroup = this.fb.group({
      name: [dataItem.name, [Validators.required]],
      birthdate: [date, [Validators.required]],
      email: [dataItem.email, [Validators.required, Validators.pattern('[a-zA-z_.+0-9-]+@[a-zA-Z0-9-]+([.][a-zA-Z0-9]+)+')]],
    })

    this.editedRowIndex = rowIndex;

    sender.editRow(rowIndex, this.studentFormGroup);
  }

  public cancelHandler({ formGroup, dataItem, isNew, rowIndex, sender }: CancelEvent) {
    this.closeEditor(sender, rowIndex);
  }

  public saveHandler({ formGroup, dataItem, isNew, rowIndex, sender }: SaveEvent) {
    const student = formGroup.value;
    student.age = this.studentAge(student.birthdate)
    student.id = dataItem.id
    student.birthdate = moment(student.birthdate).format('YYYY-MM-DD')
    this.editService.save(student).subscribe((response: any) => {
      this.read();
      this.socketServie.notification('Your data has been saved', 'success')
      sender.closeRow(rowIndex);

    })


  }

  public removeHandler({ dataItem, isNew, rowIndex, sender }: RemoveEvent) {
    this.removeHandlerData = dataItem
  }

  private closeEditor(grid: any, rowIndex = this.editedRowIndex) {
    grid.closeRow(rowIndex);
  }

  studentAge(birthdate: any) {
    var today = new Date();
    var birthDate = new Date(birthdate);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age.toString()
  }

  // file upload 


  onUploadEvent({ files, headers, data, prevented, isDefaultPrevented }: UploadEvent) {
    this.editService.uploadFile(files)
  }


  public open() {
    this.dialogOpened = true
  }

  public close() {
    this.dialogOpened = false
  }

  public action(status: any) {
    if (status == 'yes') {
      this.editService.remove(this.removeHandlerData).subscribe((response: any) => {
        this.read();
        this.socketServie.notification("Your data has been removed", 'success')
        this.dialogOpened = false;
      });
    }

  }


}


@Injectable()
export class UploadInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url === environment.uploadApiurl) {

      const events: Observable<HttpEvent<any>>[] = [0, 30, 60, 100].map((x) => of(<HttpProgressEvent>{
        type: HttpEventType.UploadProgress,
        loaded: x,
        total: 100
      }).pipe(delay(1000)));

      const success = of(new HttpResponse({ status: 200 })).pipe(delay(1000));
      events.push(success);

      return concat(...events);
    }

    return next.handle(req);
  }
}

export interface Student {
  id: number;
  name: string;
  age: number;
  dateofbirth: string;
  email: string;
}