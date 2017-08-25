import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'

import { CookieService } from 'angular2-cookie/core';
import { RequestOptions, Request, RequestMethod } from '@angular/http'
import { Router } from '@angular/router';


@Injectable()
export class AuthenticationService {

    public  isLogin = this. _cookieService.get("access_token") ? true : false;

    constructor(private  _router: Router, private http: Http, private _cookieService:CookieService) {
    };

    /**
     * Login to the site
     * 
     * @param username inputed username
     * @param password inputed password
     */
    login(username: string, password: string):Observable<Response> {
        let options = new RequestOptions({ withCredentials: true, body: { userName: username, password: password } });
        return this.http.post('http://localhost:4300/login', JSON.stringify({ userName: username, password: password }), options)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                console.log(response.json());
                if (this. _cookieService.get("access_token")) {
                    this.isLogin = true;
                } 
            }) 
            .catch(error => {
            if (error.status === 401) {
                return Observable.throw('Unauthorized');
            }
        });
    };

    /**
     * Logout from site
     */
    logout() {
        // remove user from local storage to log user 
        this._cookieService.removeAll();
        this._router.navigate(['/login']);
        this.isLogin = false;
    }
}