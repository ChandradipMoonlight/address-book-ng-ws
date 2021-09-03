import { Component, OnInit } from '@angular/core';
import { AddressBook } from 'src/app/model/address-book';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public addressCount: number = 10;

  public addressBookDetails: AddressBook[] = [];

  constructor(private httpService: HttpService) { }

    ngOnInit(): void {
    this.httpService.getAddressBookData().subscribe(Response=>{
      this.addressBookDetails = Response.data;
      this.addressCount = this.addressBookDetails.length;
      console.log(this.addressBookDetails);
    });
  }

}
