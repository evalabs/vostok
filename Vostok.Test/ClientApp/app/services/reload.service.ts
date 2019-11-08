import { Injectable, Output, EventEmitter } from '@angular/core';
import 'rxjs/Rx';

@Injectable()
export class ReloadService {

    Marker: any;
    @Output() change: EventEmitter<boolean> = new EventEmitter();

    Reload() {
        this.change.emit(this.Marker);
    }
}
