import { Component, OnInit } from '@angular/core';

import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';
import { Region } from '../../interfaces/region.type';



@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: ``
})
export class ByRegionPageComponent implements OnInit{

  public region: Country[]=[]
  public regions:Region[]=['Africa','America','Asia','Europe','Oceania'];
  public selectedRegion?:Region

  constructor (private countriesService:CountriesService){}
  ngOnInit(): void {
    this.countriesService.cacheStore.byRegion.countries;
    this.selectedRegion=this.countriesService.cacheStore.byRegion.term;
    throw new Error('Method not implemented.');
  }



  searchByRegion(term:Region):void{
    this.selectedRegion=term
    this.countriesService.searchRegion(term).subscribe(
      region => {this.region=region}
    );
  }

}
