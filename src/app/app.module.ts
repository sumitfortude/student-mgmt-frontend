import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { StudentComponent, UploadInterceptor } from './student/student.component';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonsModule } from "@progress/kendo-angular-buttons";

import {Apollo, APOLLO_OPTIONS} from 'apollo-angular';
import {HttpLink} from 'apollo-angular/http';
import {InMemoryCache} from '@apollo/client/core';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { GridModule } from '@progress/kendo-angular-grid';
import { AppRouting } from './app.routes';
import { StudentModule } from './student/student.module';
import { EditService } from './service/edit.service';
import { UploadModule, UploadService } from '@progress/kendo-angular-upload';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { SocketService } from './service/socket.service';
import { NotificationModule } from '@progress/kendo-angular-notification';
import { environment } from 'src/environments/environment';











@NgModule({
  declarations: [
    AppComponent,
    StudentComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    InputsModule,
    BrowserAnimationsModule,
    ButtonsModule,
    GridModule,
    AppRouting,
    StudentModule,
    UploadModule,
    DialogsModule,
    NotificationModule
   
    
    
  ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: environment.crudApiUrl,
          }),
        };
      },
      deps: [HttpLink],
    },
    {
      deps: [Apollo ],
      provide: EditService,
      useFactory:  (apollo: Apollo) => () => new EditService(apollo)
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UploadInterceptor,
      multi: true
    },
    SocketService,
    {
      provide: APP_INITIALIZER,
      useFactory: (ss: SocketService) => () =>{ return ss.load()},
      deps: [SocketService],
      multi: true
    },
    EditService
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
