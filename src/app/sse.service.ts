import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SSEService {

  constructor() { }

  getServerSentEvents(url: string): Observable<any> {
    return new Observable<any>(observer => {
      const eventSource = new EventSource(url);

      eventSource.onmessage = (event) => {
        observer.next(JSON.parse(event.data));
      };

      eventSource.onerror = (error) => {
        observer.error('EventSource error: ' + error);
      };

      return () => {
        eventSource.close();
      };
    });
  }
}
