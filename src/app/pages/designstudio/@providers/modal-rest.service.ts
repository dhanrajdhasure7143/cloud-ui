import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
const headerOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class ModalRestService {
  
  constructor(private http: HttpClient) {

  }
  
  get() {
    return this.http.get('getcall');
  }

  getDataSourcesNamesByName(data: any) {
    return this.http.post('/rest/dbconnection/getDataSourcesNamesByName', data, headerOptions);
  }

  getAllTablesByDatabase(data: any) {
    return this.http.post('/rest/dbconnection/getAllTablesByDatabase', data, headerOptions);
  }

  fetchDataSourceDetailsBydbdsNames(data: any) {
    return this.http.post('/rest/dbconnection/fetchDataSourceDetailsBydbdsNames', data, headerOptions);
  }

  getAllColumnsByTableName(data: any) {
    return this.http.post('/rest/dbconnection/getAllColumnsByTableName', data, headerOptions);
  }

  populatePrimaryTimestampFields(data: any, url: string) {
    return this.http.post('/rest/dbconnection/' + url, data, headerOptions);
  }

  getAllCollectionNames(data: any) {
    return this.http.post('/rest/dbconnection/getAllCollectionNames', data, headerOptions);
  }

  getAllFieldNames(data: any) {
    return this.http.post('/rest/dbconnection/getAllFieldNames', data, headerOptions);
  }

  getSalesforceObjectsbyConnection(data: any) {
    return this.http.post('/rest/dbconnection/getSalesforceObjectsbyConnection', data, headerOptions);
  }

  getfieldsbyObjectDetails(data: any) {
    return this.http.post('/rest/dbconnection/getfieldsbyObjectDetails', data, headerOptions);
  }

  getFileColumns(data: any) {
    return this.http.post('/rest/dbconnection/getFileColumns', data, headerOptions);
  }

  getTableDataByField(data: any) {
    return this.http.post('/rest/dbconnection/getTableDataByField', data, headerOptions);
  }

  getEntityRelationTables(data: any) {
    return this.http.post('/rest/dbconnection/getEntityRelationTables', data, headerOptions);
  }

  getAllColumnsByTableNameWithKeyCheck(data: any) {
    return this.http.post('/rest/dbconnection/getAllColumnsByTableNameWithKeyCheck', data, headerOptions);
  }

}

