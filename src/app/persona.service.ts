import { Injectable } from '@angular/core';


import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Persona} from "./persona";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  private URL = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public getAllPersonas(): Observable<Persona[]> {
    return this.http.get<Persona[]>(`${this.URL}/credifiel/all`)
  }

  public addPersona(persona: Persona): Observable<Persona> {
    return this.http.post<Persona>(`${this.URL}/credifiel/add`, persona)
  }
  public updatePersona(persona: Persona): Observable<Persona> {
    return this.http.put<Persona>(`${this.URL}/credifiel/update`, persona)
  }

  public deletePersona(personaId: number): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    return this.http.delete(`${this.URL}/credifiel/delete/${personaId}`,{ headers, responseType: 'text'});
  }
}

