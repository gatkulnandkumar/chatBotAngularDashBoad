import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChatBot } from '../Model/chatbot.model';
import { Observable, throwError } from 'rxjs';
import { Login } from '../Model/login.model';
import { catchError, map } from 'rxjs/operators';

import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';

type JwtToken = {
  id_token: string;
};

@Injectable({
  providedIn: 'root'
})
export class ChatDemoService {
  //  
  constructor(private http: HttpClient) { }
  // ,private localStorageService: LocalStorageService,  private sessionStorageService: SessionStorageService

  baseUrl = "http://192.168.11.21:5050/chatBot";
  tokenUrl = "http://192.168.11.21:8086/token";
  registerUrl = "http://192.168.11.21:8086/chatBot";

  getAllTemplate(): Observable<ChatBot[]> {
    console.log("inside service call");
    return this.http.get<ChatBot[]>(this.baseUrl);
  }

  insertTemplate(formData: any): Observable<ChatBot[]> {
    console.log("inside insertTemplate call");
    return this.http.post<ChatBot[]>(this.baseUrl + "/insertData", formData);
  }

  update(formData: any): Observable<ChatBot[]> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.http.put<ChatBot[]>(this.baseUrl + '/' + formData.id, formData, { headers });
  }

  deleteTemplate(id: any): Observable<ChatBot[]> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.http.delete<ChatBot[]>(this.baseUrl + "/" + id, { headers });
  }

  getById(id: any) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.http.get<ChatBot>(this.baseUrl + "/" + id);
  }

  updateTemplateData(data: ChatBot) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.http.put<ChatBot>(this.baseUrl + '/' + data.id, data, { headers });
  }

  logout() {
    // Clear localStorage
    localStorage.clear();
  }

  public logging(payload: any) {
    console.log("Data is Entering through:-->", payload);
    console.log("daata resp", this.http.post(this.tokenUrl + '/authenticate', payload));
    return this.http.post(this.tokenUrl, payload)
  }

  login(credentials: Login): Observable<any> {
    console.log("inside service ===>", credentials);
    return this.http.post<JwtToken>(this.tokenUrl, credentials)
      .pipe(map((response: JwtToken) =>  {
        console.log("inside mapppppppp",response);
        localStorage.setItem('authenticationToken', response.id_token);
        console.log("authenticationToken has been set",response.id_token);
        
      } ));
  }

  signUp(loginData: any){
    console.log("Data is Entering through:-->", loginData);
    console.log("daata resp", this.http.post(this.baseUrl + '/insertUserData', loginData));
    // return this.http.post(this.baseUrl, loginData)
    return this.http.post(this.registerUrl + "/insertUserData", loginData);
  }

  
}
