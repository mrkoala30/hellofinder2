import { Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class NewpctService {
  url: string;
  constructor(private _http: Http) { }

  loadHome(){
    let item = {'page':'http://www.newpct.com/peliculas-castellano/estrenos-de-cine/'}
    const headers = new Headers({'Content-Type': 'application/json'});
    let handleError: any;

    return this._http.post('http://localhost:3000/api/page', JSON.stringify(item), {headers: headers}).map(res => res.json());
  }

  load4k(){
    let item = {'page':'http://www.newpct.com/cine-alta-definicion-hd/'}
    const headers = new Headers({'Content-Type': 'application/json'});
    let handleError: any;

    return this._http.post('http://localhost:3000/api/page', JSON.stringify(item), {headers: headers}).map(res => res.json());
  }

  loadBlueRip(){
    let item = {'page':'http://www.newpct.com/peliculas-castellano/peliculas-rip/'}
    const headers = new Headers({'Content-Type': 'application/json'});
    let handleError: any;

    return this._http.post('http://localhost:3000/api/page', JSON.stringify(item), {headers: headers}).map(res => res.json());
  }

  getItem(url: string){
    let item = {'url':url}
    const headers = new Headers({'Content-Type': 'application/json'});
    let handleError: any;

    return this._http.post('http://localhost:3000/api/item', JSON.stringify(item), {headers: headers}).map(res => res.json());

  }



}
