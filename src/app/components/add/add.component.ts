import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/service/http.service';
import { AddressBook } from '../../model/address-book';
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  public addressBook: AddressBook = new AddressBook;
  public addressBookFormGroup: FormGroup ;
  states: any = [];
  cities: any = [];


  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dataService: DataService) {
      this.addressBookFormGroup = this.formBuilder.group({
        name: new FormControl(''),
        phoneNo: new FormControl(''),
        address: new FormControl(''),
        city: new FormControl(''),
        state: new FormControl(''),
        zip: new FormControl(''),
      })
     }

  ngOnInit(): void {
    this.states = this.httpService.states();
    this.cities = this.httpService.cities(); 
    if(this.activatedRoute.snapshot.params['id'] !=undefined) {
      this.dataService.currentAddressBook.subscribe(addressBook=> {
        if (Object.keys(addressBook).length !==0) {
          this.addressBookFormGroup.get("name")?.setValue(addressBook.name);
          this.addressBookFormGroup.get("phoneNo")?.setValue(addressBook.phoneNo);
          this.addressBookFormGroup.get("address")?.setValue(addressBook.address);
          this.addressBookFormGroup.get("state")?.setValue(addressBook.state);
          this.addressBookFormGroup.get("city")?.setValue(addressBook.city);
          this.addressBookFormGroup.get("zip")?.setValue(addressBook.zip);
        }
      })
    }  
  }

  // onSelect(states:any) {
  //   console.log(states.target.value);
  //   this.cities = this.httpService.cities();
  //   console.log(this.cities)
  // }

  onSubmit(): void {
    if (this.activatedRoute.snapshot.params['id'] != undefined) {
      console.log(this.addressBookFormGroup.value);
      this.httpService.updateAddressBookData(this.activatedRoute.snapshot.params['id'],
      this.addressBookFormGroup.value).subscribe((response: any) => {
        console.log(response);
        this.router.navigateByUrl("/home")
      });
    } else {
    this.addressBook = this.addressBookFormGroup.value;
    this.httpService.addAddressBookData(this.addressBook).subscribe((response: any)=>{
      console.log(response);
      this.router.navigateByUrl("/home")
    })
  }
  }

}
