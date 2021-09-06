import { Component, OnInit } from '@angular/core';
import { AddressBook } from 'src/app/model/address-book';
import { HttpService } from 'src/app/service/http.service';
import { Router } from '@angular/router';
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public addressCount: number = 10;

  public addressBookDetails: AddressBook[] = [];

  constructor(private httpService: HttpService,
              private router: Router,
              private dataService: DataService) { }

    /**
     * Purpose: this method is used to retrive all data form the data and display it 
     *          on the home page.
     *          it also cout no of recored and display on the top of home page.
     */
    ngOnInit(): void {
    this.httpService.getAddressBookData().subscribe(Response=>{
      this.addressBookDetails = Response.data;
      this.addressCount = this.addressBookDetails.length;
      console.log(this.addressBookDetails);
    });
  }

  /**
   * Purpose:- this method is used to remove data form form the home page as well
   *           form the database with help of http service.
   *           when user click on the delete icon thid method get triggered.
   * 
   * @param id This Id is used to delete the recored from the database for perticular id.
   */
  remove(id: number) {
    this.httpService.deleteAddressBookData(id).subscribe(data=> {
      console.log(data);
      this.ngOnInit(); 
    })
  }


  /**
   * Purpose:- this method is used to update the exsting recored.
   *           when user click on the edite icon on the home page it will navigate to the 
   *           add Page render the data of the perticular id. 
   *           and when user click on the submit button this method get triggered and update the data into the 
   *           database as well as display the data into the home page.
   * 
   * @param addressBook :- This is object of the AddressBook Class Which has all the attributes of addressBook.
   */
  update(addressBook: AddressBook) {
    this.dataService.changeAddress(addressBook);
    this.router.navigateByUrl('update/'+addressBook.id)
  }

}
