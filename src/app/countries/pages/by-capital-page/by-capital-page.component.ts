import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: [
  ]
})
export class ByCapitalPageComponent implements OnInit {

  public countries: Country[] = []
  public isLoading: boolean = false
  public initialValue: string = ""

  constructor( private countriesService: CountriesService ) {}

  ngOnInit(): void {
    this.countries = this.countriesService.catchStore.byCapital.countries
    this.initialValue = this.countriesService.catchStore.byCapital.term
  }

  searchByCapital( term: string ): void {
    // console.log("Desde By Capital Page " + term)
    this.isLoading = true

    this.countriesService.searchCapital(term).subscribe(
      countries => {
        this.countries = countries
        this.isLoading = false
      }
    )
    // console.log( {term} )
  }

}
