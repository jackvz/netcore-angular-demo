import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Incident } from './incident';

@Injectable({
  providedIn: 'root'
})
export class IncidentService {

  myAppUrl: string;
  myApiUrl: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };
  constructor(private http: HttpClient) {
    this.myAppUrl = environment.appUrl;
    this.myApiUrl = 'https://localhost:5001/incidents/';
  }

  getIncidents(): Observable<Incident[]> {
    return this.http.get<Incident[]>(this.myApiUrl)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  getIncident(incidentId: number): Observable<Incident> {
    return this.http.get<Incident>(this.myApiUrl + incidentId)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  saveIncident(incident): Observable<Incident> {
    return this.http.post<Incident>(this.myApiUrl, JSON.stringify(incident), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  updateIncident(incidentId: number, incident): Observable<Incident> {
    return this.http.put<Incident>(this.myApiUrl + incidentId, JSON.stringify(incident), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  deleteIncident(incidentId: number): Observable<Incident> {
    return this.http.delete<Incident>(this.myApiUrl + incidentId)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
