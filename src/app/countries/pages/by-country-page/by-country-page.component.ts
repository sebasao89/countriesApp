import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styleUrls: ['./by-country-page.component.scss']
})
export class ByCountryPageComponent implements OnInit {

  public countries: Country[] = []
  public initialValue: string = ""

  constructor( private countriesService: CountriesService ) {}

  ngOnInit(): void {
    this.countries = this.countriesService.catchStore.byCountries.countries
    this.initialValue = this.countriesService.catchStore.byCountries.term
  }

  searchByCountry( term: string ): void {
    this.countriesService.searchCountry(term).subscribe(
      countries => {
        this.countries = countries
      }
    )
  }

}
