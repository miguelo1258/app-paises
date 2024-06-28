import { Country } from './country';
import { Region } from './region.type';
export interface CacheStore{
  byCapital:TermCountries;
  byCountries:TermCountries;
  byRegion:RegionCountries;
  }


export interface TermCountries{
  term:string;
  countries: Country[];

}

export interface RegionCountries {
  term: Region;
  countries:Country[]
}
