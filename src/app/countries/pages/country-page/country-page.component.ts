import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styleUrls: ['./country-page.component.scss']
})
export class CountryPageComponent implements OnInit {

  constructor( private activedRoute: ActivatedRoute ) {}

  ngOnInit(): void {
    this.activedRoute.params.subscribe( ({ id }) => {
      console.log({ params: id})
    })
  }

}
