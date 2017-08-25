import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { CookieService } from 'angular2-cookie/core';

import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'

//import { CookieService } from 'angular2-cookie/core';
import { RequestOptions, Request, RequestMethod } from '@angular/http'
import { Router } from '@angular/router';

@Injectable()
export class ObjectService {
    public objects;

    constructor(private http: Http,  private cookieService:CookieService){}
    
    public getObjectList(start: number, size: number):Observable<Response> {
        return this.http.get('http://localhost:4300/objects?' + 'start=' + start + '&size=' + size)
            .map((response: Response) => {
                this.objects = response.json();
            }) 
            .catch(error => {
                if (error.status === 404) {
                    console.log("404 + " + error);
                } else if (error.status === 500) { 
                    console.log("500" + error);
                } 
                return Observable.throw(error);
            })   
    }

    public deleteObject(id) {
        let delUrl = "http://localhost:4300/restricted/object/" + id;
    
        var headers = new Headers();
        headers.append('Cookies', this.cookieService.get("access_token"));
        let options = new RequestOptions({ headers: headers, withCredentials: true });
        return this.http.delete(delUrl, options).map(res => res.json());
    }

    public mergeObjects(objects) {     
        let mergeUrl = "http://localhost:4300/restricted/mergeObjects";
        var headers = new Headers();
        headers.append('Cookies', this.cookieService.get("access_token"));
        let options = new RequestOptions({ headers: headers, withCredentials: true, body: {object: objects} });
        return this.http.put(mergeUrl,  JSON.stringify({mergedObjects: objects}), options)
        .map(res => res.json())
        .catch(error => {
                if (error.status === 404) {
                    console.log("404 + " + error);
                } else if (error.status === 500) { 
                    console.log("500" + error);
                } 
                return Observable.throw(error);
            })
    }

    public searchObjects(body) {
        var headers = new Headers();
        headers.append('Cookies', this.cookieService.get("access_token"));
        let options = new RequestOptions({ headers: headers, withCredentials: true, body: {params: body} });
        return this.http.post('http://localhost:4300/search',JSON.stringify({params: body}),options)
            .map((response: Response) => {
                this.objects = response.json();
                console.log(this.objects);
                return this.objects;
            }) 
            .catch(error => {
                if (error.status === 404) {
                    console.log("404 + " + error);
                    this.objects={};
                    alert("No data");
                    return this.objects;

                } else if (error.status === 500) { 
                    console.log("500" + error);
                } 
                return Observable.throw(error);
            })
    }

    public editObject(id, objType, date) {
        let editUrl = "http://localhost:4300/restricted/object/" + id;
        var headers = new Headers();
        headers.append('Cookies', this.cookieService.get("access_token"));
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers, withCredentials: true });
        let json = {
            'type': objType,
            'first_detected_date' : date
        }
        let body = JSON.stringify(json);
        return this.http.put(editUrl, body, options).map(res => res.json());
    }
}
