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

    ngOnInit(): void {
    this.httpService.getAddressBookData().subscribe(Response=>{
      this.addressBookDetails = Response.data;
      this.addressCount = this.addressBookDetails.length;
      console.log(this.addressBookDetails);
    });
  }

  remove(id: number) {
    this.httpService.deleteAddressBookData(id).subscribe(data=> {
      console.log(data);
      this.ngOnInit(); 
    })
  }

  update(addressBook: AddressBook) {
    this.dataService.changeAddress(addressBook);
    this.router.navigateByUrl('update/'+addressBook.id)
  }

}
