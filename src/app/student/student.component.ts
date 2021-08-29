import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { GridDataResult, PageChangeEvent } from "@progress/kendo-angular-grid";
import { Router } from '@angular/router';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  public gridView!: GridDataResult;
  public pageSize = 10;
  public skip = 0;
  public studentList = []

  constructor(private apollo: Apollo,private router: Router) { }

  ngOnInit() {
    this.getStudentList()
  }
  getStudentList(){
    const studentQuery=gql `query{
      getAllStudent {
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
        this.studentList = response.data.getAllStudent
        this.loadStudentList()
       console.log(response)
      });
  }

    pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.loadStudentList();
  }

  loadStudentList(){
    this.gridView = {
      data: this.studentList.slice(this.skip, this.skip + this.pageSize),
      total: this.studentList.length,
    };
  
}

studentDetails(event:any){
  let id = event.dataItem.id
  this.router.navigateByUrl('/student-details/'+id)
 
}

}
