import { Injectable } from '@angular/core';
import { CookieService } from 'angular2-cookie/core';
import { Http, Response, Headers, RequestOptions, } from '@angular/http';


@Injectable()
export class CamerasService {

  constructor(private http:Http, private _cookieService:CookieService) { }

  /**
   * Send request for camera deleting
   * 
   * @param id camera id
   */
  public delCamera(id) {
    let delUrl = "http://localhost:4300/restricted/camera/" + id;
    var headers = new Headers();
    headers.append('Cookies', this. _cookieService.get("access_token"));
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    console.log(options);
    return this.http.delete(delUrl, options).map(res => res.json());
  }

  /**
   * Send request for camera editing
   * 
   * @param id camera id
   * @param name camera name
   * @param latitude 
   * @param longitude 
   * @param description 
   * @param online boolean value
   */
  public editCamera(id, name, latitude, longitude, description, online) {
    let delUrl = "http://localhost:4300/restricted/camera/" + id;
    var headers = new Headers();
    headers.append('Cookies', this. _cookieService.get("access_token"));
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    let json = {
      'cameraName':name,
      'latitude':latitude,
      'longitude':longitude,
      'description':description,
      'online':online
    }
    let body = JSON.stringify(json);
    console.log(body);
    return this.http.put(delUrl, body, options).map(res => res.json());
  }

  /**
   * Get camera list.
   */
  public getCameras() {
    console.log("get called");
    let getUrl= "http://localhost:4300/cameras";
    return this.http.get(getUrl).map(res => res.json());
  }

  /**
   * Send request for camera searching
   * 
   * @param param searching parametres
   */
  public searchCameras(param) {
      console.log("searchCamera called");
      console.log(param);
      let searchUrl= "http://localhost:4300/cameraBy?" + param;
      return this.http.get(searchUrl).map(res => res.json());
  }

}
