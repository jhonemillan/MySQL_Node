import { Country } from './../models/country';
import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../countries.service';
import { FormsModule } from '@angular/forms'


@Component({
  selector: 'countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css'],
  providers:[CountriesService]
})
export class CountriesComponent implements OnInit {
countries: Country[];
country: Country;
idcountry: number;
name: string;
continent: string;
surfacearea: number;
population: number;
editing:boolean;

  constructor(private countryservice:CountriesService) { }

  ngOnInit() {
    this.getAllCountries();
    this.country = {}
  }

  getAllCountries(){
    this.countryservice.getCountries().subscribe(countries => {
      this.countries = countries;
      console.log(this.countries);
    },(err)=>{
      console.log(err);
    })
  }

  onSubmit(){
    this.country = {};
    this.country.idcountry = this.idcountry;
    this.country.name = this.name;
    this.country.continent = this.continent;
    this.country.surfacearea = this.surfacearea;
    this.country.population = this.population;

    this.countryservice.addCountry(this.country).subscribe(data=>{
      console.log(data); 
      this.idcountry = null;
      this.name = null;
      this.continent = null;
      this.surfacearea =null;
      this.population = null;
      this.getAllCountries();
    })
  }

  OnDelete(idcountry){
    this.countryservice.deleteCountry(idcountry).subscribe(data=>{
      console.log(data);     
      this.getAllCountries();
    })
  }

  selectRow(item: Country){
    this.idcountry = item.idcountry;
    this.continent = item.continent;
    this.name = item.name;
    this.population = item.population;
    this.surfacearea = item.surfacearea;
    this.editing = true;
  }

  

}
