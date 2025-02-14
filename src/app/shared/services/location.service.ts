import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private autocompleteService: google.maps.places.AutocompleteService;

  constructor(private http: HttpClient) {
    // Initialize the AutocompleteService
    this.autocompleteService = new google.maps.places.AutocompleteService();
  }

  getLocationSuggestions(query: string): Observable<any> {
    return new Observable((observer) => {
      if (query) {
        this.autocompleteService.getPlacePredictions(
          { input: query },
          (predictions, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
              observer.next(predictions);
            } else {
              observer.error(status);
            }
          }
        );
      } else {
        observer.next([]);
      }
    });
  }
}
