import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';

import { Country } from '../interfaces/country';
import { CacheStore } from '../interfaces/cache-store';
import { Region } from '../interfaces/region.type';


@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor(public httpClient: HttpClient) {
    // console.log('Countries service init') 
    this.loadToLocalStorage()
  }

  public catchStore: CacheStore = {
    byCapital: { term: '', countries: []},
    byCountries: { term: '', countries: []},
    byRegion: { region: '', countries: []}
  }
  
  public apiURL: string = "https://restcountries.com/v3.1"

  private getCountriesRequest( url: string ): Observable<Country[]> {
    return this.httpClient.get<Country[]>(url).pipe(
      catchError( () => of([]) ),
      // delay( 1500 )
    )
  }
  
  searchCapital(term: string): Observable<Country[]> {
    const url = `${this.apiURL}/capital/${term}`
    return this.getCountriesRequest(url).pipe(
      tap( countries => this.catchStore.byCapital = { term, countries } ),
      tap( () => this.saveToLocalStorage() )
    )   
  }

  searchCountry(term: string): Observable<Country[]> {
    const url = `${this.apiURL}/name/${term}`    
    return this.getCountriesRequest(url).pipe(
      tap( countries => this.catchStore.byCountries = { term, countries } ),
      tap( () => this.saveToLocalStorage() )
    )   
  }

  searchRegion(region: Region): Observable<Country[]> {
    const url = `${this.apiURL}/region/${ region }`    
    return this.getCountriesRequest(url).pipe(
      tap( countries => this.catchStore.byRegion = { region, countries } ),
      tap( () => this.saveToLocalStorage() )
    )   
  }

  searchCountryByAlphaCode( code: string ): Observable<Country | null> {
    const url = `${this.apiURL}/alpha/${ code }`

    return this.httpClient.get<Country[]>( url )
    .pipe(
      map( countries => countries.length > 0 ? countries[0] : null),
      catchError( () => of(null) )
    )
  }

  private saveToLocalStorage() {
    localStorage.setItem('cacheStore', JSON.stringify( this.catchStore ))
  }

  private loadToLocalStorage() {
    if( !localStorage.getItem('cacheStore') ) return

    this.catchStore = JSON.parse( localStorage.getItem('cacheStore')! ) 
  }

}

