import { Region } from './../interfaces/region.type';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/country';
import { CacheStore } from '../interfaces/cache-store.interface';



@Injectable({providedIn: 'root'})
export class CountriesService {

  public cacheStore:CacheStore= {
    byCapital:{ term:'',countries:[]},
    byCountries:{ term:'',countries:[]},
    byRegion:{ term:'',countries:[]},

  }

  private apiUrl:string ='https://restcountries.com/v3.1'
  constructor(private http: HttpClient) {
    this.loadFromLocStorage()
  }

  private saveToLocStorage( ){
    localStorage.setItem( 'cacheStore',JSON.stringify(this.cacheStore))

  }

  private loadFromLocStorage(){
    if(!localStorage.getItem( 'cacheStore'))return;
    this.cacheStore=JSON.parse(localStorage.getItem( 'cacheStore')!)

  }

  private getCountriesRequest(url:string):Observable<Country[]>{
    return this.http.get<Country[]>(url)
    .pipe(catchError(() => of ([])))
  }

  searchCountryByAlphaCode(code: string): Observable<Country | null> {

    const url =`${this.apiUrl}/alpha/${code}`

    return this.http.get<Country[]>(url).pipe(
      map(countries=> countries.length>0 ? countries[0]: null),
      catchError(error => of())

    )

  }

  searchCapital(term: string): Observable<Country[]> {

    const url =`${this.apiUrl}/capital/${term}`

    return this.getCountriesRequest(url).pipe(
      tap(countries => this.cacheStore.byCapital= {term:term, countries}),
      tap( ()=> this.saveToLocStorage())

    )



  }

  searchCountry(term: string): Observable<Country[]> {

    const url =`${this.apiUrl}/name/${term}`

    return this.getCountriesRequest(url).pipe(
      tap(countries => this.cacheStore.byCountries= {term:term, countries}),
      tap( ()=> this.saveToLocStorage()))



  }

  searchRegion(term: Region): Observable<Country[]> {

    const url =`${this.apiUrl}/region/${term}`

    return this.getCountriesRequest(url).pipe(
      tap(countries => this.cacheStore.byRegion= {term, countries}),
      tap( ()=> this.saveToLocStorage()))



  }



}
