import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl:string = 'http://localhost:3000';
  profileapi:string = '/profile/';


  constructor(private http: HttpClient) { }

  getProfile(id):Observable<any>{
    console.log(id);

    console.log(`${this.baseUrl}${this.profileapi}${id}`);
    
    // HttpClient does not send cookie automaticly, you need to add it manually
    return this.http.get<any>(`${this.baseUrl}${this.profileapi}${id}`, {withCredentials: true});  //Attach cookie {withCredentials: true}, this will also cause CORS issue, need to fix reponse headers issues at server side


  }

}
