import { Country } from './models/country';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http'
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';


@Injectable()
export class CountriesService {
  domain = "http://localhost:3000";

  constructor(private http: Http) { }


  getCountries():Observable<Country[]>{
    return this.http.get(this.domain + "/countries").map(res => res.json())
                                                    .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

                                            
  }

  addCountry(country: Country){
    return this.http.post(this.domain + '/add',country).map(res=> console.log(res));
  }

  deleteCountry(id:number){
    console.log(id);
    return this.http.delete(this.domain + '/delete/'+ id).map(res => res.json());
  }
}
