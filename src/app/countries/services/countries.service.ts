import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country } from '../interfaces/country';
import { Observable, catchError, delay, map, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor(public httpClient: HttpClient) { }

  private getCountriesRequest( url: string ): Observable<Country[]> {
    return this.httpClient.get<Country[]>(url).pipe(
      catchError( () => of([]) ),
      // delay( 1500 )
    )
  }

  public apiURL: string = "https://restcountries.com/v3.1"
  
  searchCapital(term: string): Observable<Country[]> {
    const url = `${this.apiURL}/capital/${term}`
    return this.getCountriesRequest(url)    
  }

  searchCountry(term: string): Observable<Country[]> {
    const url = `${this.apiURL}/name/${term}`    
    return this.getCountriesRequest(url)
  }

  searchRegion(region: string): Observable<Country[]> {
    const url = `${this.apiURL}/region/${ region }`    
    return this.getCountriesRequest(url)
  }

  searchCountryByAlphaCode( code: string ): Observable<Country | null> {
    const url = `${this.apiURL}/alpha/${ code }`

    return this.httpClient.get<Country[]>( url )
    .pipe(
      map( countries => countries.length > 0 ? countries[0] : null),
      catchError( () => of(null) )
    )
  }

}

