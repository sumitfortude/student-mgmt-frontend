import { Component, Inject, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { ActivatedRoute } from '@angular/router';
import { CancelEvent, EditEvent, EditService, RemoveEvent, SaveEvent } from '@progress/kendo-angular-listview';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {
    studentId:any
    editedRowIndex: any
    // editService: EditService;
    formGroup: FormGroup;
    view:any
   

  constructor(private apollo: Apollo,private activatedroute:ActivatedRoute,private fb: FormBuilder) {
      
     this.formGroup = this.fb.group({
         name:[null,[Validators.required]],
         birthdate:[null,[Validators.required]],
         email:[null,[Validators.required]]
     })
    // this.editService = editServiceFactory();
   }

  ngOnInit() {
   
   this.activatedroute.params.subscribe(params =>{
       this.studentId = params['id']
       this.getStudentById(this.studentId)
   })
  }

  getStudentById(id:any){
    const studentQuery=gql `query{
        getStudentById(id:${id}) {
          id
          name
          birthdate
          age
          email
        }
      
        }`
        this.apollo.watchQuery<any>({
          query:studentQuery
        }).valueChanges
        .subscribe((response) => {
            let arrObj = [{
                id:response.data.getStudentById.id,
                name:response.data.getStudentById.name,
                email:response.data.getStudentById.email,
                birthdate:response.data.getStudentById.birthdate,
                age:response.data.getStudentById.age

            }]
            
            this.view = arrObj
         console.log(this.view)
        });
  }

  public editHandler({ dataItem, isNew, itemIndex, sender }: EditEvent) {
    this.closeEditor(sender);

    this.formGroup = this.fb.group({
        name:[dataItem.name,[Validators.required]],
        birthdate:[dataItem.birthdate,[Validators.required]],
        email:[dataItem.email,[Validators.required]]
    })

    this.editedRowIndex = itemIndex;

    sender.editItem(itemIndex, this.formGroup);
  }


  public cancelHandler({ formGroup, dataItem, isNew, itemIndex, sender }: CancelEvent) {
    this.closeEditor(sender, itemIndex);
  }


  public saveHandler({ formGroup, dataItem, isNew, itemIndex, sender }: SaveEvent) {
    // const product: Product = formGroup.value;

    // this.editService.save(product, isNew);

    // sender.closeItem(itemIndex);
  }

  public removeHandler({  dataItem, isNew, itemIndex, sender }: RemoveEvent) {
    // this.editService.remove(dataItem);
    
  }

  private closeEditor(sender:any, itemIndex = this.editedRowIndex) {
    sender.closeItem(itemIndex);
    this.editedRowIndex = undefined;
  }
  
}
