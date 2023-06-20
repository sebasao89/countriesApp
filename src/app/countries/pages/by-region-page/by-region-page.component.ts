import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';
import { Region } from '../../interfaces/region.type';


@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styleUrls: ['./by-region-page.component.scss']
})
export class ByRegionPageComponent implements OnInit{

  public countries: Country[] = []
  public regions: Region[] = ['Africa','Americas','Asia','Europe','Oceania']
  public selectRegion?: Region

  constructor( private countriesService: CountriesService ) {}

  ngOnInit(): void {
    this.countries = this.countriesService.catchStore.byRegion.countries;
    // this.selectRegion = this.countriesService.catchStore.byRegion.region
  }

  searchByRegion( region: Region ): void {
    this.selectRegion = region

    this.countriesService.searchRegion(region).subscribe(
      countries => {
        this.countries = countries
      }
    )
  }
}
