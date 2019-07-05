import { Component, Input, OnInit, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';

// text,email,tel,textarea,password, 
@Component({
    selector: 'data-table',
    template: `
    <div >
    <div *ngFor="let table of field.value.tables" class="small-12 cell">
        <div *ngIf="table.tableName != ''" >
        <h5>{{"Table Name : " + table.tableName }}</h5>
        <table>
            <thead>
                <tr class="special">
                    <th width="400">Column</th>
                    <th width="200">Target</th>
                    <th width="200">MDMField</th> 
					<th width="200">Searchable</th>
					<th width="200">Secured</th>
                </tr>
            </thead>
            <tbody>
                <tr class="special">
                    <td>Select All</td>
                    <td><input type="checkbox" [id]="inTarget"
                        checked="checked" (change)="toggleSelection('inTarget')"></td>
                    <td><input type="checkbox"
						[id]="isMDMField" (click)="toggleSelection('isMDMField')"></td> 
					<td><input type="checkbox"
						[id]="isSearchable" (click)="toggleSelection('isSearchable')"></td>
					<td> <input type="checkbox"
                        [id]="isSecured" (click)="toggleSelection('isSecured')"></td>
                </tr>
                <tr class="special" *ngFor="let column of table.columns">
                    <td>{{column.columnName}}</td>
                    <td><input class="inTarget" type="checkbox"
                        [(ngModel)]="column.inTarget"></td>
                    <td><input
                         type="checkbox"
                        [(ngModel)]="column.isMDMField"></td> 
                    <td><input
                         type="checkbox"
                        [(ngModel)]="column.isSearchable"></td>
                    <td><select
                        class="isSecured" [(ngModel)]="column.isSecured">
                            <option style="display: none" value="" selected="true">Select a type</option>
                            <option value="select">select</option>
                            <option value="masking">masking</option>
                            <option value="encryption">encryption</option>
                            <option value="token">token</option>
                    </select></td>
                </tr>
            </tbody>
        </table>
        </div>
    </div>
</div>
<br>
    `
})

export class TableComponent implements OnInit {
    @Input() field:any = {};
    @Input() form:FormGroup;
    @Output() callFunctionEvent = new EventEmitter<void>();
    // get isValid() { return this.form.controls[this.field.name].valid; }
    // get isDirty() { return this.form.controls[this.field.name].dirty; }
  
    constructor() {

    }

    ngOnInit(){
        console.log(this.field);
        console.log(this.field.value.tables)
        if(this.field.value && this.field.value.restCall)
        this.callFunction(this.field.value.restCall);
          console.log(this.field);
    }

    // ngAfterViewInit(){
        
    // }

    callFunction(restCall){
      this.callFunctionEvent.emit(restCall);
    }

    toggleSelection(data){
        console.log(data); // temporary
    }
  }