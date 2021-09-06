import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private mainUrl: string = "http://localhost:8081/address-book/address";

  constructor(private httpClient: HttpClient) { }

  /**
   * Purpose:- This method is used to fetch all data form the database.
   * 
   * @returns message.
   */
  getAddressBookData(): Observable<any>{
    return this.httpClient.get(this.mainUrl)

  }

  /**
   * Purpose:- This method is used to add the data into the database.
   * 
   * @param addressBook is object of data which is to be add into the database.
   * @returns status message.
   */
  addAddressBookData(addressBook: any): Observable<any> {
    return this.httpClient.post(this.mainUrl, addressBook);
  }

  /**
   * Purpose: This method is used to delete the data form the database related to perticular id.
   * 
   * @param id is recored id whose details will deleted.
   * @returns status message.
   */
  deleteAddressBookData(id: any): Observable<any> {
    return this.httpClient.delete(this.mainUrl+"/"+id)
  }

  /**
   * Purpose:- This Method is used to update the data into the database for perticular id.
   *            
   * @param id person id whose data will be added.
   * @param data object person data whose details will be added.
   * @returns  status message.
   */
  updateAddressBookData(id: any, data:any): Observable<any> {
    return this.httpClient.put(this.mainUrl+"/"+id, data);
  }

  states() {
    return[
      {
        id: 1, name: "Maharashtra"
      },
      {
        id: 2, name: "West Bengol"
      }
    ]
  }

  cities() {
    return[
      {
        id: 1, name: "Mumbai"
      },
      {
        id: 1, name: "Pune"
      },
      {
        id: 2, name: "Kolkata"
      },
      {
        id: 2, name: "Howara"
      }
    ]
  }
}
