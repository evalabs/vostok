import { Component } from '@angular/core';
import { OrderService } from '../.././services/order.service';
import { ReloadService } from '../.././services/reload.service';
import { Router } from '@angular/router';

@Component({
    selector: 'order-edit',
    templateUrl: './order.edit.component.html'
})
export class OrderEditComponent {
    public Items: any[];

    constructor(private _repository: OrderService, private _reload: ReloadService, private router: Router) {
        this.Items = [];
    }

    AddItem() {
        this.Items.push({ name: '', price: '' });
    }

    DeleteItem(i: number) {
        this.Items.splice(i, 1);
    }

    Save() {
        this._repository.CreateOrder(this.Items).subscribe(
            data => {
                this._reload.Reload();
                this.router.navigateByUrl('/home');
            }
        );
    }

    Cancel() {
        this.router.navigateByUrl('/home');
    }
}
