import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NominatimService {

  private baseUrl = 'https://nominatim.openstreetmap.org/search';

  constructor(private http: HttpClient) {}

  searchLocation(query: string): Observable<any[]> {
    const url = `${this.baseUrl}?q=${query}&format=json&addressdetails=1&limit=5`;
    return this.http.get<any[]>(url);
  }
}
