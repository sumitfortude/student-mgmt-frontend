 import { Inject, Injectable } from '@angular/core';
import { NotificationService } from '@progress/kendo-angular-notification';
import { Subject } from 'rxjs';
import * as socketClusterClient from 'socketcluster-client';
import { environment } from 'src/environments/environment';




 @Injectable()
export class SocketService{
    public socketCluster:any;
  
  private studentComponentMethodCallSource = new Subject<any>();
  
 
  studentComponentMethodCalled$ = this.studentComponentMethodCallSource.asObservable();
    
    constructor(private notificationService: NotificationService){
      
    }

    
    

    load(){
        
        this.socketCluster = socketClusterClient.create({​​​​​​​​​​​​​​​​
            hostname:environment.socketHost,
            port:environment.socketPort
                    }​​​​​​​​​​​​​​​​);
                    (async () => {​​​​​​​​
            for await (let event of this.socketCluster.listener('connect')) {​​​​​​​​
                        }​​​​​​​​
                    }​​​​​​​​)();

         // Subscribe to a channel and watch for messages
        (async () => {
            let channel = this.socketCluster.subscribe('TaskDone');
            for await (let data of channel) {
                
                this.studentComponentMethodCallSource.next();
                this.notification(data,'success')
              // ... Handle channel data.
            }
          })();

          (async () => {
            let channel = this.socketCluster.subscribe('TaskFailed');
            for await (let data of channel) {
                
                this.notification(data,'error')
              // ... Handle channel data.
            }
          })();
    }

    public notification(msg:string,styleType:any){
   
        this.notificationService.show({
          content: msg,
          cssClass: "button-notification",
          animation: { type: "slide", duration: 400 },
          position: { horizontal: "center", vertical: "bottom" },
          type: { style: styleType, icon: true },
          closable: true,
        });
        
      }
}