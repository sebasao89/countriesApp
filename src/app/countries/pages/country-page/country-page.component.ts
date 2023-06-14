import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styleUrls: ['./country-page.component.scss']
})
export class CountryPageComponent implements OnInit {

  public country?: Country

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private countriesService: CountriesService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      switchMap( ({ id }) => this.countriesService.searchCountryByAlphaCode( id ) )
    ).subscribe( country => {
      // console.log({ country })
      if( !country ) {
        return this.router.navigateByUrl('')
      }
      // console.log('TENEMOS UN PAÍS')
      return this.country = country
    })
      
  }

}
