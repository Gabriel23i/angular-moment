import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { IMoment } from 'src/app/interfaces/Moment';

@Injectable({
  providedIn: 'root'
})
export class MomentService {
  private baseApiUrl = environment.baseApiUrl;
  private apiUrl = `${this.baseApiUrl}api/moments`;

  constructor(private http: HttpClient) { }

  // Como estou lidadando com a criação de dados, utilizo o Observable
  createMoment(formData: FormData): Observable<FormData>{
    return this.http.post<FormData>(this.apiUrl, formData);
  }
}
