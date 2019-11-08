import { Component, OnInit } from '@angular/core';
import { OrderService } from '../.././services/order.service';
import { ReloadService } from '../.././services/reload.service';
import * as moment from 'moment';

@Component({
    selector: 'nav-menu',
    templateUrl: './navmenu.component.html',
    styleUrls: ['./navmenu.component.css']
})
export class NavMenuComponent implements OnInit {
    public Orders: any[];

    constructor(private _repository: OrderService, private _reload: ReloadService) {
        this.Orders = [];
    }

    ngOnInit() {
        this._reload.change.subscribe((rel: any) => {
            this._repository.GetOrderList().subscribe(
                data => {
                    this.Orders = data;
                    this.Orders.forEach(order => {
                        order.dateFormated = moment(order.date).format('MM.DD.YYYY HH:mm');
                    });
                }
            );
        });

        this._reload.Reload();
    }
}
