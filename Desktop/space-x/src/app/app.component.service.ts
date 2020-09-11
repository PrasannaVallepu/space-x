import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AppService {

  constructor(
    private http: HttpClient,
  ) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  getSpaceListing(){
    let url = "https://api.spaceXdata.com/v3/launches?limit=100";
    return this.http.get(url, this.httpOptions);
  }

  getSpaceFilters(){    
    let url = "https://api.spaceXdata.com/v3/launches?limit=100&launch_success=true&land_success=true";
    return this.http.get(url, this.httpOptions);
  }

  getSpaceLaunch(){
    let url = "https://api.spaceXdata.com/v3/launches?limit=100&launch_success=true";
    return this.http.get(url, this.httpOptions);
  }
  getSpaceYear(){
    let url = "https://api.spaceXdata.com/v3/launches?limit=100&launch_success=true&land_success=true&launch_year=2014";
    return this.http.get(url, this.httpOptions);
  }

}
