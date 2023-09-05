import { Injectable } from '@angular/core';
//import { HttpClient } from '@angular/common/http';
import { Observable , of} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PremierLeagueService {
  private apiEndpoint = 'https://api-football-v1.p.rapidapi.com/v3/fixtures'; // Replace with your API endpoint URL
  //private premierLeagueData: any; // Store the fetched data
  private isDataLoaded: boolean = false; // Flag to track data loading
  private storageKey = 'premierLeagueData';

  constructor(private http: HttpClient) {}

  getPremierLeagueData(season: number, leagueId: number): Observable<any> {

    const headers = new HttpHeaders()
      .set('X-RapidAPI-Key', '3dbfe83dcamsh515f5d2574f5afep1704cejsnfdba04c163aa') // Example: Add an authorization token
      .set('X-RapidAPI-Host', 'api-football-v1.p.rapidapi.com');

      if (this.isDataLoaded) {
        // If data is already loaded, return it as an observable
        // return new Observable((observer) => {
        //   observer.next(this.premierLeagueData);
        //   observer.complete();
        // });
        return of(JSON.parse(localStorage.getItem(this.storageKey ) || 'null'));
      } 

      const cachedData = localStorage.getItem(this.storageKey);
    if (cachedData) {
      // If data is found in local storage, parse and return it
      this.isDataLoaded = true; // Set the flag to indicate data is loaded
      return of(JSON.parse(cachedData));
    }

    const url = `${this.apiEndpoint}?season=${season}&leagueId=${leagueId}`;

    return this.http.get(url, {headers}).pipe(
        // Store the data and set the isDataLoaded flag
        tap((data) => {
            localStorage.setItem(this.storageKey, JSON.stringify(data));
          this.isDataLoaded = true;

    }),
    catchError((error) => {
        console.error('API request failed:', error);
        return of(null); // Return an empty observable or handle the error as needed
      })
    );
}
  }

