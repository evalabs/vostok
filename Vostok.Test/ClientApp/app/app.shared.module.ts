import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { OrderEditComponent } from './components/order/order.edit.component';
import { OrderViewComponent } from './components/order/order.view.component';

import { OrderService } from './services/order.service';
import { ReloadService } from './services/reload.service';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        HomeComponent,
        OrderEditComponent,
        OrderViewComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'edit', component: OrderEditComponent },
            { path: 'view/:id', component: OrderViewComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ],
    providers: [
        OrderService,
        ReloadService
    ]
})
export class AppModuleShared {
}
