import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class OrderService {

    constructor(public http: Http) { }

    GetOrderList() {
        return this.http.get(
            '/api/orders/list',
            { headers: new Headers({ 'Content-Type': 'application/json' }) }
        ).map(
            res => res.json()
        );
    }

    CreateOrder(items: any[]) {
        return this.http.post(
            '/api/orders/create',
            items,
            { headers: new Headers({ 'Content-Type': 'application/json' }) }
        ).map(
            res => res.json()
        );
    }

    GetOrder(id: any) {
        return this.http.get(
            '/api/orders/list/' + id,
            { headers: new Headers({ 'Content-Type': 'application/json' }) }
        ).map(
            res => res.json()
        );
    }

    DeleteOrder(id: any) {
        return this.http.post(
            '/api/orders/delete/' + id,
            {},
            { headers: new Headers({ 'Content-Type': 'application/json' }) }
        ).map(
            res => res.json()
        );
    }
}
