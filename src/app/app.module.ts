import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import {AppRoutesModule} from './app.router';
import { OrderTableComponent } from './order-table/order-table.component';
import { PriceStatisticsComponent } from './price-statistics/price-statistics.component';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { ClientOrderComponent } from './client-order/client-order.component';
import { TradeStatisticsComponent } from './trade-statistics/trade-statistics.component';

import { MainChartComponent } from './main-chart/main-chart.component';

import { HotRoutePriceComponent } from './hot-route-price/hot-route-price.component';
import { HotRouteTradeTimesComponent } from './hot-route-trade-times/hot-route-trade-times.component'



//service

import {RouteService} from './service/route.service';//交易统计
import {DataService} from './service/data.service';
import {CommonService} from './service/common.service'
@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    OrderTableComponent,
    PriceStatisticsComponent,
    WithdrawComponent,
    ClientOrderComponent,
    TradeStatisticsComponent,
    MainChartComponent,
    HotRoutePriceComponent,
    HotRouteTradeTimesComponent,
  ],
  imports: [
    AppRoutesModule,
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
      RouteService,
      DataService,
      CommonService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
