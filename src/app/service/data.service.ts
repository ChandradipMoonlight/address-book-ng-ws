import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AddressBook } from '../model/address-book';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private addressBookSource = new BehaviorSubject(new AddressBook());
  currentAddressBook = this.addressBookSource.asObservable();
  
  constructor() { }

  changeAddress(addressBook: AddressBook) {
    this.addressBookSource.next(addressBook);
  }
}
