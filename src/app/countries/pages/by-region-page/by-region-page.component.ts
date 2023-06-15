import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

type Region = 'Africa'|'Americas'|'Asia'|'Europe'|'Oceania'

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styleUrls: ['./by-region-page.component.scss']
})
export class ByRegionPageComponent {

  public countries: Country[] = []
  public regions: Region[] = ['Africa','Americas','Asia','Europe','Oceania']
  public selectRegion?: Region

  constructor( private countriesService: CountriesService ) {}

  searchByRegion( region: Region ): void {
    this.selectRegion = region

    this.countriesService.searchRegion(region).subscribe(
      countries => {
        this.countries = countries
      }
    )
  }
}
