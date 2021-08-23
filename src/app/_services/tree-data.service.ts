import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TreeDataService {

  constructor(private http: Http) { }
  requestOLd(url: string) {
  //   return this.http
  //     .get('data.json')
  //     .map(res => {
  //       console.log(res)
  //       res.json()
  //     }
  //     );
  }

  request(url: string) {
    return of({
      "title": "root",
      "leaf": false,
      "children": [
        {
          "title": "GREEN_KIRBY",
          "leaf": false,
          "children": [
            {
              "title": "GREEN_KIRBY123",
              "leaf": false,
              "children": [
                {
                  "title": "COMTRAIL",
                  "leaf": true,
                  "id": 0,
                  "name": "Blanca Norman",
                  "isActive": true,
                  "checking": -857123.94,
                  "savings": 158642.3,
                  "age": 28,
                  "eyeColor": "green",
                  "gender": "female",
                  "company": "VIRXO",
                  "email": "blancanorman@virxo.com",
                  "phone": "+1 (966) 403-3671",
                  "address": "908 Times Placez, Eagleville, California, 2184",
                  "registered": "2015-09-30",
                  "latitude": -14.440434,
                  "longitude": -68.188629
                },
                {
                  "title": "TASMANIA",
                  "leaf": true,
                  "id": 1,
                  "name": "Constance Lewis",
                  "isActive": false,
                  "checking": -569226.55,
                  "savings": 806545.7,
                  "age": 20,
                  "eyeColor": "blue",
                  "gender": "female",
                  "company": "EVENTEX",
                  "email": "constancelewis@eventex.com",
                  "phone": "+1 (871) 444-2535",
                  "address": "349 Holt Court, Cazadero, Tennessee, 1927",
                  "registered": "2015-09-09",
                  "latitude": 25.712129,
                  "longitude": 92.805013
                },
                {
                  "title": "COMBOT",
                  "leaf": true,
                  "id": 2,
                  "name": "Allison Gross",
                  "isActive": false,
                  "checking": -967390.02,
                  "savings": 984327.78,
                  "age": 20,
                  "eyeColor": "brown",
                  "gender": "female",
                  "company": "ZIZZLE",
                  "email": "allisongross@zizzle.com",
                  "phone": "+1 (930) 411-3849",
                  "address": "399 Tapscott Street, Orovada, Arkansas, 8999",
                  "registered": "2015-12-01",
                  "latitude": 87.990626,
                  "longitude": 35.223319
                },
                {
                  "title": "TWIGGERY",
                  "leaf": true,
                  "id": 3,
                  "name": "Ester Petersen",
                  "isActive": true,
                  "checking": 288908.33,
                  "savings": 757106.18,
                  "age": 35,
                  "eyeColor": "blue",
                  "gender": "female",
                  "company": "BIOLIVE",
                  "email": "esterpetersen@biolive.com",
                  "phone": "+1 (879) 570-3898",
                  "address": "832 Opal Court, Wolcott, Montana, 3690",
                  "registered": "2015-12-14",
                  "latitude": -49.416505,
                  "longitude": -0.822934
                }
              ]
            },
            {
              "title": "COMTRAIL",
              "leaf": true,
              "id": 0,
              "name": "Blanca Norman",
              "isActive": true,
              "checking": -857123.94,
              "savings": 158642.3,
              "age": 28,
              "eyeColor": "green",
              "gender": "female",
              "company": "VIRXO",
              "email": "blancanorman@virxo.com",
              "phone": "+1 (966) 403-3671",
              "address": "908 Times Placez, Eagleville, California, 2184",
              "registered": "2015-09-30",
              "latitude": -14.440434,
              "longitude": -68.188629
            },
            {
              "title": "TASMANIA",
              "leaf": true,
              "id": 1,
              "name": "Constance Lewis",
              "isActive": false,
              "checking": -569226.55,
              "savings": 806545.7,
              "age": 20,
              "eyeColor": "blue",
              "gender": "female",
              "company": "EVENTEX",
              "email": "constancelewis@eventex.com",
              "phone": "+1 (871) 444-2535",
              "address": "349 Holt Court, Cazadero, Tennessee, 1927",
              "registered": "2015-09-09",
              "latitude": 25.712129,
              "longitude": 92.805013
            },
            {
              "title": "COMBOT",
              "leaf": true,
              "id": 2,
              "name": "Allison Gross",
              "isActive": false,
              "checking": -967390.02,
              "savings": 984327.78,
              "age": 20,
              "eyeColor": "brown",
              "gender": "female",
              "company": "ZIZZLE",
              "email": "allisongross@zizzle.com",
              "phone": "+1 (930) 411-3849",
              "address": "399 Tapscott Street, Orovada, Arkansas, 8999",
              "registered": "2015-12-01",
              "latitude": 87.990626,
              "longitude": 35.223319
            },
            {
              "title": "TWIGGERY",
              "leaf": true,
              "id": 3,
              "name": "Ester Petersen",
              "isActive": true,
              "checking": 288908.33,
              "savings": 757106.18,
              "age": 35,
              "eyeColor": "blue",
              "gender": "female",
              "company": "BIOLIVE",
              "email": "esterpetersen@biolive.com",
              "phone": "+1 (879) 570-3898",
              "address": "832 Opal Court, Wolcott, Montana, 3690",
              "registered": "2015-12-14",
              "latitude": -49.416505,
              "longitude": -0.822934
            }
          ]
        }
      ]
    }
    );
  }
}
