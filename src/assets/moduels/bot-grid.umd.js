(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/forms'), require('@angular/core'), require('underscore'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('bot-grid', ['exports', '@angular/forms', '@angular/core', 'underscore', '@angular/common'], factory) :
    (factory((global['bot-grid'] = {}),global.ng.forms,global.ng.core,global._,global.ng.common));
}(this, (function (exports,forms,i0,_,common) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var BotGridService = /** @class */ (function () {
        function BotGridService() {
        }
        BotGridService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        BotGridService.ctorParameters = function () { return []; };
        /** @nocollapse */ BotGridService.ngInjectableDef = i0.defineInjectable({ factory: function BotGridService_Factory() { return new BotGridService(); }, token: BotGridService, providedIn: "root" });
        return BotGridService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var AlertComponent = /** @class */ (function () {
        function AlertComponent() {
            this.confirmation = new i0.EventEmitter();
            this.hidden = true;
        }
        /**
         * @return {?}
         */
        AlertComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
            };
        /**
         * @return {?}
         */
        AlertComponent.prototype.show = /**
         * @return {?}
         */
            function () {
                this.hidden = false;
            };
        /**
         * @return {?}
         */
        AlertComponent.prototype.hide = /**
         * @return {?}
         */
            function () {
                this.hidden = true;
            };
        /**
         * @return {?}
         */
        AlertComponent.prototype.confirm = /**
         * @return {?}
         */
            function () {
                this.confirmation.emit(true);
            };
        AlertComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'ez-alert',
                        template: "<div *ngIf=\"!hidden\">\n  <div class=\"backdrop\" (click)=\"hide()\"></div>\n\n  <div class=\"modal-popup\">\n    <ng-content></ng-content>\n    <div>\n      <button (click)=\"confirm()\">OK</button>\n      <button (click)=\"hide()\">cancel</button>\n    </div>\n  </div>\n</div>",
                        styles: [".modal-popup{position:fixed;left:50%;top:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);background-color:#fff;border:1px solid #ddd;padding:1rem}.backdrop{position:absolute;background:rgba(0,0,0,.1);top:0;bottom:0;right:0;left:0}.modal{position:fixed;z-index:1;padding-top:100px;left:0;top:0;width:100%;height:100%;overflow:auto}.modal-content{position:relative;background-color:#fefefe;margin:auto;padding:0;border:1px solid #888;width:80%;box-shadow:0 4px 8px 0 rgba(0,0,0,.2),0 6px 20px 0 rgba(0,0,0,.19);-webkit-animation-name:animatetop;-webkit-animation-duration:.4s;animation-name:animatetop;animation-duration:.4s}.close{color:#fff;float:right;font-size:28px;font-weight:700}.close:focus,.close:hover{color:#000;text-decoration:none;cursor:pointer}.modal-header{padding:2px 16px;background-color:#5cb85c;color:#fff}.modal-body{padding:2px 16px}.modal-footer{padding:2px 16px;background-color:#5cb85c;color:#fff}"]
                    }] }
        ];
        AlertComponent.propDecorators = {
            confirmation: [{ type: i0.Output }]
        };
        return AlertComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var BotGridComponent = /** @class */ (function () {
        function BotGridComponent() {
            this.columnDefs = [];
            this.rowData = [];
            this.searchText = '';
            this.numbers = [];
            this.noOfPages = 10;
            this.sortType = 'asec';
            this.filterKeys = [];
            this.pageSize = 10;
            this.currentPage = 0;
            this.students = [];
            this.recordSize = 0;
        }
        /**
         * @return {?}
         */
        BotGridComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                this.recordSize = this.rowData.length;
                this.noOfPages = Math.round(this.rowData.length / this.pageSize);
                this.numbers = Array((this.noOfPages)).fill({}).map(( /**
                 * @param {?} x
                 * @param {?} i
                 * @return {?}
                 */function (x, i) { return i; }));
            };
        /**
         * @return {?}
         */
        BotGridComponent.prototype.ngOnChanges = /**
         * @return {?}
         */
            function () {
                this.recordSize = this.rowData.length;
                this.noOfPages = Math.round(this.recordSize / this.pageSize);
                this.numbers = Array((this.noOfPages)).fill({}).map(( /**
                 * @param {?} x
                 * @param {?} i
                 * @return {?}
                 */function (x, i) { return i; }));
            };
        /**
         * @return {?}
         */
        BotGridComponent.prototype.ngDoCheck = /**
         * @return {?}
         */
            function () {
                if (!this.searchText) {
                    this.recordSize = this.rowData.length;
                }
                this.noOfPages = Math.round(this.recordSize / this.pageSize);
                this.numbers = Array((this.noOfPages)).fill({}).map(( /**
                 * @param {?} x
                 * @param {?} i
                 * @return {?}
                 */function (x, i) { return i; }));
                console.log(JSON.stringify(this.numbers));
            };
        /**
         * @return {?}
         */
        BotGridComponent.prototype.showAlert = /**
         * @return {?}
         */
            function () {
                this.alert.show();
            };
        /**
         * @param {?} value
         * @return {?}
         */
        BotGridComponent.prototype.handleConfirm = /**
         * @param {?} value
         * @return {?}
         */
            function (value) {
                this.alert.hide();
            };
        /**
         * @param {?} value
         * @return {?}
         */
        BotGridComponent.prototype.setPage = /**
         * @param {?} value
         * @return {?}
         */
            function (value) {
                this.currentPage = value;
            };
        /**
         * @return {?}
         */
        BotGridComponent.prototype.setPagePrev = /**
         * @return {?}
         */
            function () {
                if (this.currentPage !== 0) {
                    this.currentPage = this.currentPage - 1;
                }
            };
        /**
         * @return {?}
         */
        BotGridComponent.prototype.setPageNext = /**
         * @return {?}
         */
            function () {
                if (this.currentPage < this.noOfPages - 1) {
                    this.currentPage = this.currentPage + 1;
                }
            };
        /**
         * @param {?} event
         * @return {?}
         */
        BotGridComponent.prototype.filterCall = /**
         * @param {?} event
         * @return {?}
         */
            function (event) {
                if (event.target.checked) {
                    this.filterKeys.push(event.target.name);
                }
                else {
                    this.filterKeys.pop();
                }
            };
        /**
         * @param {?} value
         * @return {?}
         */
        BotGridComponent.prototype.sortById = /**
         * @param {?} value
         * @return {?}
         */
            function (value) {
                this.sortKey = value;
                if (this.sortType === 'asec') {
                    this.sortType = 'desc';
                }
                else {
                    this.sortType = 'asec';
                }
            };
        BotGridComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'ez-bot-grid',
                        template: "<ez-loader [loading]=\"false\"></ez-loader>\r\n\r\n<div class=\"col col-xs-3\">\r\n  <input placeholder=\"Search ...\" type=\"text\" class=\"form-control\" [(ngModel)]=\"searchText\">\r\n</div>\r\n\r\n<table class=\"table pd-b-5\">\r\n  <thead>\r\n    <tr>\r\n      <ng-container *ngFor=\"let header of columnDefs | headerSelection: filterKeys; let i = index\">\r\n        <th>{{header.headerName}}<span style=\"cursor:pointer\" (click)=\"sortById(header.headerName)\"> ^ </span></th>\r\n      </ng-container>\r\n    </tr>\r\n  </thead>\r\n  <tbody>\r\n    <ng-container\r\n      *ngFor=\"let row of rowData | pagination: pageSize : currentPage | selectionFilter : filterKeys  | searchFilter : searchText | sortingFilter: sortType : sortKey \">\r\n      <tr>\r\n        <ng-container *ngFor=\"let header of columnDefs; let i = index\">\r\n\r\n          <ng-container *ngIf=\"header.field; then value; else empty\">\r\n          </ng-container>\r\n      \r\n          <ng-template #value>\r\n            <td>{{ row[header.field] ? row[header.field] : '' }}</td>\r\n          </ng-template>\r\n      \r\n          <ng-template #empty>\r\n          </ng-template>\r\n\r\n        </ng-container>\r\n      </tr>\r\n    </ng-container>\r\n</table>\r\n\r\n<div>\r\n  <ng-container *ngFor=\"let header of columnDefs; let i = index\">\r\n    <input type=\"checkbox\" value=\"{{header.field}}\" name=\"{{header.field}}\" (change)=\"filterCall($event)\" />\r\n    <span>{{header.field}}</span> <br />\r\n  </ng-container>\r\n</div>\r\n<div *ngIf=\"numbers.length > 0\">\r\n  <nav aria-label=\"Page navigation \">\r\n    <ul class=\"pagination\">\r\n      <li class=\"page-item\"><a class=\"page-link\" (click)=\"setPagePrev()\">Previous</a></li>\r\n      <li *ngFor=\"let page of  numbers\" class=\"page-item\"><a class=\"page-link\" (click)=\"setPage(page)\">{{page}}</a></li>\r\n      <li class=\"page-item\"><a class=\"page-link\" (click)=\"setPageNext()\">Next</a></li>\r\n    </ul>\r\n  </nav>\r\n</div>\r\n\r\n<ez-alert (confirmation)=\"handleConfirm($event)\">My alert</ez-alert>\r\n<button (click)=\"showAlert()\">Show Alert</button>",
                        styles: [""]
                    }] }
        ];
        /** @nocollapse */
        BotGridComponent.ctorParameters = function () { return []; };
        BotGridComponent.propDecorators = {
            alert: [{ type: i0.ViewChild, args: [AlertComponent,] }],
            columnDefs: [{ type: i0.Input }],
            rowData: [{ type: i0.Input }]
        };
        return BotGridComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var SortingPipe = /** @class */ (function () {
        function SortingPipe() {
        }
        /**
         * @param {?} items
         * @param {?} sortType
         * @param {?} sortKey
         * @return {?}
         */
        SortingPipe.prototype.transform = /**
         * @param {?} items
         * @param {?} sortType
         * @param {?} sortKey
         * @return {?}
         */
            function (items, sortType, sortKey) {
                if (sortType === 'asec') {
                    items = _.sortBy(items, sortKey);
                }
                else {
                    items = _.sortBy(items, sortKey).reverse();
                }
                return items;
            };
        SortingPipe.decorators = [
            { type: i0.Pipe, args: [{
                        name: 'sortingFilter',
                        pure: false
                    },] }
        ];
        return SortingPipe;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var SelectionPipe = /** @class */ (function () {
        function SelectionPipe() {
        }
        /**
         * @param {?} items
         * @param {?} filterKeys
         * @return {?}
         */
        SelectionPipe.prototype.transform = /**
         * @param {?} items
         * @param {?} filterKeys
         * @return {?}
         */
            function (items, filterKeys) {
                /** @type {?} */
                var rowData = [];
                _.each(items, ( /**
                 * @param {?} data
                 * @return {?}
                 */function (data) {
                    if (filterKeys) {
                        /** @type {?} */
                        var filterData = _.omit(data, filterKeys);
                        rowData.push(filterData);
                    }
                    else {
                        rowData.push(data);
                    }
                }));
                return rowData;
            };
        SelectionPipe.decorators = [
            { type: i0.Pipe, args: [{
                        name: 'selectionFilter',
                        pure: false
                    },] }
        ];
        return SelectionPipe;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var SearchPipe = /** @class */ (function () {
        function SearchPipe(app) {
            this.app = app;
        }
        /**
         * @param {?} items
         * @param {?} searchText
         * @return {?}
         */
        SearchPipe.prototype.transform = /**
         * @param {?} items
         * @param {?} searchText
         * @return {?}
         */
            function (items, searchText) {
                if (!items) {
                    return [];
                }
                if (!searchText) {
                    return items;
                }
                if (items == null) {
                    return null;
                }
                items = items.filter(( /**
                 * @param {?} item
                 * @return {?}
                 */function (item) {
                    return Object.keys(item).some(( /**
                     * @param {?} k
                     * @return {?}
                     */function (k) {
                        return item[k] != null &&
                            item[k].toString().toLowerCase()
                                .includes(searchText.toLowerCase());
                    }));
                }));
                this.app.recordSize = items.length;
                return items;
            };
        SearchPipe.decorators = [
            { type: i0.Pipe, args: [{
                        name: 'searchFilter'
                    },] }
        ];
        /** @nocollapse */
        SearchPipe.ctorParameters = function () {
            return [
                { type: BotGridComponent, decorators: [{ type: i0.Inject, args: [i0.forwardRef(( /**
                                                 * @return {?}
                                                 */function () { return BotGridComponent; })),] }] }
            ];
        };
        return SearchPipe;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var PaginationPipe = /** @class */ (function () {
        function PaginationPipe() {
        }
        /**
         * @param {?} dataArray
         * @param {?} sizeOfPage
         * @param {?} currentPage
         * @return {?}
         */
        PaginationPipe.prototype.transform = /**
         * @param {?} dataArray
         * @param {?} sizeOfPage
         * @param {?} currentPage
         * @return {?}
         */
            function (dataArray, sizeOfPage, currentPage) {
                /** @type {?} */
                var copyArray = dataArray;
                if (dataArray && dataArray.length > 0) {
                    /** @type {?} */
                    var size = (currentPage) * sizeOfPage;
                    copyArray = dataArray.slice(size, size + sizeOfPage);
                }
                return copyArray;
            };
        PaginationPipe.decorators = [
            { type: i0.Pipe, args: [{
                        name: 'pagination',
                        pure: false
                    },] }
        ];
        return PaginationPipe;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var LoaderComponent = /** @class */ (function () {
        function LoaderComponent() {
        }
        /**
         * @return {?}
         */
        LoaderComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
            };
        LoaderComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'ez-loader',
                        template: "<div *ngIf=\"loading\">\n  <div id=\"loader-container\">\n  <p id=\"loadingText\">Loading</p>\n</div>\n\n</div>\n",
                        styles: ["#loader-container{width:200px;height:200px;color:#fff;margin:0 -50% 0 auto;position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);border:5px solid #3498db;border-radius:50%;-webkit-animation:1s ease-in-out infinite borderScale;animation:1s ease-in-out infinite borderScale}#loadingText{font-family:Raleway,sans-serif;color:#000;font-weight:700;font-size:2em;position:absolute;top:50%;left:50%;margin-right:-50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}@-webkit-keyframes borderScale{0%,100%{border:5px solid #ff7900}50%{border:25px solid orange}}@keyframes borderScale{0%,100%{border:5px solid #ff7900}50%{border:25px solid orange}}"]
                    }] }
        ];
        /** @nocollapse */
        LoaderComponent.ctorParameters = function () { return []; };
        LoaderComponent.propDecorators = {
            loading: [{ type: i0.Input }]
        };
        return LoaderComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var HeaderSelectionPipe = /** @class */ (function () {
        function HeaderSelectionPipe() {
        }
        /**
         * @param {?} headers
         * @param {?=} args
         * @return {?}
         */
        HeaderSelectionPipe.prototype.transform = /**
         * @param {?} headers
         * @param {?=} args
         * @return {?}
         */
            function (headers, args) {
                /** @type {?} */
                var headerItems = [];
                _.each(headers, ( /**
                 * @param {?} value
                 * @return {?}
                 */function (value) {
                    if (args && args.length > 0) {
                        /** @type {?} */
                        var arr2 = _.some(args, ( /**
                         * @param {?} v
                         * @return {?}
                         */function (v) {
                            if (v === value.field) {
                                return true;
                            }
                        }));
                        if (!arr2) {
                            headerItems.push(value);
                        }
                    }
                    else {
                        headerItems.push(value);
                    }
                }));
                return headerItems;
            };
        HeaderSelectionPipe.decorators = [
            { type: i0.Pipe, args: [{
                        name: 'headerSelection',
                        pure: false
                    },] }
        ];
        return HeaderSelectionPipe;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var BotGridModule = /** @class */ (function () {
        function BotGridModule() {
        }
        BotGridModule.decorators = [
            { type: i0.NgModule, args: [{
                        declarations: [BotGridComponent, SortingPipe, SelectionPipe, SearchPipe, PaginationPipe, AlertComponent, LoaderComponent, HeaderSelectionPipe],
                        imports: [common.CommonModule, forms.FormsModule],
                        exports: [BotGridComponent]
                    },] }
        ];
        return BotGridModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    exports.BotGridService = BotGridService;
    exports.BotGridComponent = BotGridComponent;
    exports.BotGridModule = BotGridModule;
    exports.ɵa = AlertComponent;
    exports.ɵf = LoaderComponent;
    exports.ɵg = HeaderSelectionPipe;
    exports.ɵe = PaginationPipe;
    exports.ɵd = SearchPipe;
    exports.ɵc = SelectionPipe;
    exports.ɵb = SortingPipe;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=bot-grid.umd.js.map