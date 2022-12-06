import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { IMoment } from 'src/app/interfaces/Moment';
import { IResponse } from './../../interfaces/Response';

@Injectable({
  providedIn: 'root'
})
export class MomentService {
  private baseApiUrl = environment.baseApiUrl;
  private apiUrl = `${this.baseApiUrl}api/moments`;

  constructor(private http: HttpClient) { }

  getMoments(): Observable<IResponse<IMoment[]>> {
    return this.http.get<IResponse<IMoment[]>>(this.apiUrl);
  }

  getMoment(id: number): Observable<IResponse<IMoment>> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<IResponse<IMoment>>(url);
  }

  // Como estou lidadando com a criação de dados, utilizo o Observable
  createMoment(formData: FormData): Observable<FormData>{
    return this.http.post<FormData>(this.apiUrl, formData);
  }
}
