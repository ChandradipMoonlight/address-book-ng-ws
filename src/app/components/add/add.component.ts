import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
        name: new FormControl('', [Validators.required, Validators.pattern("^[A-Z][a-zA-z\\s]{2,}$")]),
        phoneNo: new FormControl('', [Validators.required, Validators.pattern("^[6-9][0-9]{9}$")]),
        address: new FormControl('', [Validators.required, Validators.pattern("^[A-Z][a-zA-z\\s]{2,}$")]),
        city: new FormControl('', [Validators.required]),
        state: new FormControl('', [Validators.required]),
        zip: new FormControl('', [Validators.required, Validators.pattern("^[0-9]{6}$")]),
      })
     }

     /**
      * Purpose: this method is used to update the addressBook Data in to the home page.
      * I used get and set to set the data.
      * this.route.snapshot.params['id'] check the person id send in the url of the edit page.
      * this.dataService.currentAddress(), when subscribed, fills the edit form with the person details.
      */

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


  /**
   * Purpose: onSubmit() method is used to add and update the data into the home page and database.
   *          thid method will add data into the database which will ueser fill into the form.
   *          this mehtod is called when user hit enter on the submit button.
   *          when user click on submit buttton it will add data into the database as well as into the home page.
   *          and it will navigate to the home page with the help of router url(this.router.navigateByUrl("/home")).
   */
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

   /**
   * Purpose: checkError() is called during validation of the form fields.
   * 
   * @param controlName field name for which the method is called.
   * @param errorName error details which is displayed to the user.
   * @returns 
   */

    public checkError = (controlName: string, errorName: string) => {
      return this.addressBookFormGroup.controls[controlName].hasError(errorName);
    }

}
