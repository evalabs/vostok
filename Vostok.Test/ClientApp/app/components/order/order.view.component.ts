import { Component, OnInit, OnDestroy  } from '@angular/core';
import { OrderService } from '../.././services/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ReloadService } from '../.././services/reload.service';
import * as moment from 'moment';

@Component({
    selector: 'order-view',
    templateUrl: './order.view.component.html'
})
export class OrderViewComponent implements OnInit, OnDestroy {
    public Order: any;
    private sub: any;
    private orderId: any;

    constructor(private _repository: OrderService, private route: ActivatedRoute, private router: Router, private _reload: ReloadService) {
    }

    ngOnInit() {
        this.sub = this.route.paramMap.subscribe(params => {
            this.orderId = params.get('id');
            this._repository.GetOrder(this.orderId).subscribe(
                data => {
                    this.Order = data;
                    this.Order.dateFormated = moment(this.Order.date).format('MM.DD.YYYY HH:mm');
                }
            );
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    Delete() {
        this._repository.DeleteOrder(this.orderId).subscribe(params => {
            this._reload.Reload();
            this.router.navigateByUrl('/home');
        });
    }
}
