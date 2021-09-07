import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { tap, map, catchError } from 'rxjs/operators';
import { Apollo, gql } from 'apollo-angular';
import { request } from 'graphql-request'
import { environment } from 'src/environments/environment';


@Injectable()
export class EditService {
    constructor(private apollo: Apollo) {
       
    }

    private data: any[] = [];

    public read() {
    
        const studentQuery=gql `query{
                  getAllStudent {
                    id
                    name
                    birthdate
                    age
                    email
                  }
                  }`
                

                 return   this.apollo.watchQuery({
                    query:studentQuery,
                    fetchPolicy: 'network-only'
                  })
                  .valueChanges
                  .pipe(
                    map((response)=>{
                    return response
                    })
                    )
                  

       
    }

    public save(data: any, isNew?: boolean):any {
       

        this.reset();
        const studentMutation = gql`mutation updateStudentByID($id: Float! ,$name: String !, $birthdate: String ! , $age: String !, $email: String !) {
            updateStudentByID(studentInput:{id:$id,name:$name,birthdate:$birthdate,age:$age,email:$email}) {
              id
              name
              birthdate
              age
              email
            }
          }
          `
        return  this.apollo.mutate({
            mutation: studentMutation,
            variables:data
          })
          .pipe(
            map((response)=>{
            return response
            })
          )
      
    }

    public remove(data: any) {
        this.reset();
        const id = {
            id:data.id
          }
         const studentMutation = gql`mutation deleteStudentByID($id: Float! ) {
           deleteStudentByID(id:$id) {
            id
            name
            birthdate
            age
            email
           }
         }
         `
         
        return this.apollo.mutate({
           mutation: studentMutation,
           variables:id
         }).pipe(
          map((response)=>{
          return response
          })
        )
     
    }

   

    private reset() {
        this.data = [];
    }

    uploadFile(files:any){

      const uploadFileMutation=gql`mutation uploadFile($file:Upload!){
         uploadFile(file: $file)
        }`

        request(environment.uploadApiurl, uploadFileMutation, {
          userId: 1,
          file: files[0].rawFile,
        }).then((response)=>{
          return response
          
        })

    }

}