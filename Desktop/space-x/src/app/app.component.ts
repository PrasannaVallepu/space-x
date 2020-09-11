import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from './app.component.service';
import { map } from 'rxjs/operators';
import * as _ from 'underscore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
	constructor(
    private router:Router,
    private appService : AppService
  ) { }

  public allProductList : any = sessionStorage.getItem('allProducts')?JSON.parse(sessionStorage.getItem('allProducts')) : null;
  title = 'SpaceX launch programs';
  Developername = "Prasanna";
  public showProductNotFound : boolean = false;
  public products:any;
  public brandFilters: any;
  public landFilters: any;
  public productFilters : any;
  public yearFilters: any;

  ngOnInit() {
    let _self = this;
      // Get Space Listing
      this.getProductList(function(status){
      	 _self.getSpaceLaunch(); 
         _self.getSpaceLanding(); 
         _self.getSpaceYear();
      });  

  }

//For getting space list
   getProductList(callback){
    let _self = this;
    this.appService.getSpaceListing().subscribe(
      (data:any)=>{
      	// console.log("1111111", data)
        _self.allProductList = data;
        _self.allProductList = data.map((item:any)=>{
            item.isadded = false;
            return item;
        });
        _self.products = data;
         
        if(_self.products.length){
          _self.allProductList = data;
          sessionStorage.setItem('allProducts', JSON.stringify(_self.allProductList));
        }else{
          _self.allProductList = null;
          _self.showProductNotFound = true;
        }     
        callback(true);   
      },
      (error)=>{
        _self.showProductNotFound = true;
        callback(false);
      }
    )
  }
 showFilteredResult($event, type){
    let _self = this;
    let productList:any = [];
    const value = $event.target.value;
     
    switch(type){      
      case 'brand':  //// filter on basis of product brand
        _self.filterDataByBrandName(value);
        break;
    }
}
filterDataByBrandName(value){
    let _self = this;
    if(value !== "0"){
      _self.productFilters[0].isChecked = true;
      _self.productFilters[0].values.map((item:any)=>{
          item.isChecked = false;
          if (item.value == value){
            item.isChecked = true;
          }
      });

    }else{
      _self.productFilters[0].isChecked = false;
    }
    
  }
  showAllProducts(){
    let _self = this;
    _self.showProductNotFound = false;
    if(_self.allProductList){      
      _self.products = JSON.parse(sessionStorage.getItem('allProducts'));
    }else{
      _self.getProductList(function(){      
      });
    }    

    var ele:any = document.getElementById('brand-filter');
    ele.value = "0";
    
   

  }
  //for getting filter
   getSpaceLaunch(){
    let _self = this;
    this.appService.getSpaceLaunch().subscribe(
      (data)=>{
        _self.brandFilters = data;
        
        sessionStorage.setItem('allFiltersList', _self.productFilters)
      },
      (error)=>{

      }
    )
  }
    getSpaceLanding(){
    let _self = this;
    this.appService.getSpaceFilters().subscribe(
      (data)=>{
        _self.landFilters = data;
        
        sessionStorage.setItem('allFiltersList', _self.productFilters)
      },
      (error)=>{

      }
    )
  }
   getSpaceYear(){
    let _self = this;
    this.appService.getSpaceYear().subscribe(
      (data)=>{
        _self.yearFilters = data;
        
        sessionStorage.setItem('allFiltersList', _self.productFilters)
      },
      (error)=>{

      }
    )
  }



}

