import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private mainUrl: string = "http://localhost:8081/address-book/address";

  constructor(private httpClient: HttpClient) { }

  getAddressBookData(): Observable<any>{
    return this.httpClient.get(this.mainUrl)

  }

  addAddressBookData(addressBook: any): Observable<any> {
    return this.httpClient.post(this.mainUrl, addressBook);
  }

  deleteAddressBookData(id: any): Observable<any> {
    return this.httpClient.delete(this.mainUrl+"/"+id)
  }

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
