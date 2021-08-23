import { Injectable } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class DropDownService {
    public show: Boolean = false;
    public userShow: Boolean = false;
    // public isOpened = false;
    toggle() {
        if ( this.show === false) {
        this.userShow = false;

            this.show = true;
            // this.isOpened = true;
        } else {
            this.show = false;
            // this.isOpened = false;
        }
    }
    hideMenu() {
        this.show = false;
        this.userShow = false;
    }
    test() {
        this.userShow = true;
        this.show = false;
    }
}
