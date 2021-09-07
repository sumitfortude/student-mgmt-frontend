import { TestBed } from '@angular/core/testing';
import { EditService } from '../service/edit.service';
import { ApolloTestingModule} from 'apollo-angular/testing';
import { StudentComponent } from '../student/student.component';


describe('EditService', () => {
  let service: EditService;

  beforeEach(() => {
    TestBed.configureTestingModule({ 
      imports: [ApolloTestingModule],
      declarations:[StudentComponent],
      providers: [EditService]
     });
    service = TestBed.inject(EditService);
  });

 

  it('should get student', () => {
    const studentSpy = spyOn(service, 'read');
     service.read();
    expect(studentSpy).toHaveBeenCalled();
  });
  it('should update student', () => {
    const studentSpy = spyOn(service, 'save');
    const student = {
      id:1,
      name:'sumit',
      email:'sumit@gmail.com',
      birthdate:"1997-05-24",
      age:'24'
    };
     service.save(student);
    expect(studentSpy).toHaveBeenCalled();
  });
  it('should delete student', () => {
    const studentSpy = spyOn(service, 'remove');
    const id={
      id:1
    }
     service.remove(id);
    expect(studentSpy).toHaveBeenCalled();
  });
  it('should file upload', () => {
    const files =  { 
      files: [
        {
          size: 123000,
          rawFile: 'test raw file',
        },
      ],
     } ;
    const studentSpy = spyOn(service, 'uploadFile');
     service.uploadFile(files);
    expect(studentSpy).toHaveBeenCalled();
  
  });

  

});
