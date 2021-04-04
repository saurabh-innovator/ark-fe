import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment.prod'
import { map } from 'rxjs/operators';
const options = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  })
}
const baseUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class FormsService {

  constructor(private http: HttpClient) { }

  createUser(body) {
    console.log(body)
    return this.http.post<any>(`${baseUrl}addUser`, body, options).pipe(map(response => {
      return response;
    }))
  }
  updateUser(body, email) {
    console.log(body)
    return this.http.post<any>(`${baseUrl}updateUser?email=${email}`, body, options).pipe(map(response => {
      return response;
    }))
  }
  deleteUser(email) {
    return this.http.delete<any>(`${baseUrl}deleteUser?email=${email}`, options).pipe(map(response => {
      return response;
    }))
  }
  getUserDetails(email) {
    return this.http.delete<any>(`${baseUrl}getUserDetails?email=${email}`, options).pipe(map(response => {
      return response;
    }))
  }
  getAllUserList() {
    return this.http.get<any>(`${baseUrl}allUsers`, options).pipe(map(response => {
      return response;
    }))
  }
}
