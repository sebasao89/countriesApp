import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country } from '../interfaces/country';
import { Observable, catchError, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor(public httpClient: HttpClient) { }

  public apiURL: string = "https://restcountries.com/v3.1"
  
  searchCapital(term: string): Observable<Country[]> {
    const url = `${this.apiURL}/capital/${term}`
    
    return this.httpClient.get<Country[]>( url ).pipe(
      catchError( () => of([]) )
    )
  }

  searchCountry(term: string): Observable<Country[]> {
    const url = `${this.apiURL}/name/${term}`
    
    return this.httpClient.get<Country[]>( url ).pipe(
      catchError( () => of([]) )
    )
  }

  searchRegion(region: string): Observable<Country[]> {
    const url = `${this.apiURL}/region/${ region }`
    
    return this.httpClient.get<Country[]>( url ).pipe(
      catchError( () => of([]) )
    )
  }

  searchCountryByAlphaCode( code: string ): Observable<Country[]> {
    const url = `${this.apiURL}/alpha/${ code }`

    return this.httpClient.get<Country[]>( url ).pipe(
      catchError( () => of([]) )
    )
  }

}

