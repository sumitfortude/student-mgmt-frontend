import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { NotificationService } from '@progress/kendo-angular-notification';
import { AppModule } from '../app.module';
import { EditService } from '../service/edit.service';
import { SocketService } from '../service/socket.service';
import { StudentComponent } from './student.component';



describe('StudentComponent', () => {
  let component: StudentComponent;
  let fixture: ComponentFixture<StudentComponent>;
  beforeEach(async () => {
    
     
    await TestBed.configureTestingModule({
      imports:[AppModule],
      declarations: [ StudentComponent ],
      providers:[EditService,FormBuilder,SocketService,NotificationService,]
    })
    .compileComponents();

  });

  

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should read data', () => {
    const studentSpy = spyOn(component, 'read');
    component.read();
   expect(studentSpy).toHaveBeenCalled();
  });
  it('should calculate age', () => {
    
    const studentSpy = spyOn(component, 'studentAge');
    const birthDate = '1997-05-24'
    component.studentAge(birthDate);
   expect(studentSpy).toHaveBeenCalled();
  });

});
