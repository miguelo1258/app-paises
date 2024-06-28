import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: ``
})
export class ByCountryPageComponent implements OnInit{

  public countries: Country[]=[]

  constructor (private countriesService:CountriesService){}

  public isLoading:boolean=false;
  public initialValue:string=''


  ngOnInit(): void {
    this.initialValue=this.countriesService.cacheStore.byCountries.term
    this.countries=this.countriesService.cacheStore.byCountries.countries
  }

  searchByCountry(term:string):void{
    this.countriesService.searchCountry(term).subscribe(
      countries => {this.countries=countries; this.isLoading=false}
    );
  }


}
