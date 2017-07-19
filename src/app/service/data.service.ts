import { Injectable } from '@angular/core';
import { Http, HttpModule } from '@angular/http';

import { RouteService } from './route.service';
import 'rxjs/add/operator/map';
@Injectable()
export class DataService {

    constructor(
        private http: Http,
        private routeService: RouteService
    ) { }




    Line_getHotLine(top, startTime, endTime) {
        const url = this.routeService.tLine.getHotTopLines(top, startTime, endTime);
        return this.http.get(url).map(res => res.json());
    }

    Line_getHotLineDetail(top, dateType, startTime, endTime) {
        const url = this.routeService.tLine.getHotTopLinesDetail(top, dateType, startTime, endTime);
        return this.http.get(url).map(res => res.json());
    }
    Line_exportHotLine(top, dateType, startTime, endTime) {
        const url = this.routeService.tLine.exportHotTopLines(top, dateType, startTime, endTime);
        window.location.href = url;
    }



    Transaction_getTransactionSun(type, startTime, endTime) {
        return this.http.get(this.routeService.tTransaction.transactionSun(type, startTime, endTime)).map(res => res.json())
    }
    /**
     * @param type [0,1,2,3] 分别对应 年 季 月 日
     * @param startTime
     * @param endTime
     * @param skip
     * @param count
     */
    Transaction_getTransactionChart(type, startTime, endTime, skip, count) {
        return this.http.get(this.routeService.tTransaction.transactionChart(type, startTime, endTime, skip, count)).map(res => res.json())
    }

    Transaction_exprotTransaction(type, startTime, endTime) {
        const url = this.routeService.tTransaction.transactionExprot(type, startTime, endTime);
        window.location.href = url;
    }

    Capacity_getCapacityList(top) {
        const url = this.routeService.cCapacity.getCapacityList(top);
        return this.http.get(url).map(res => res.json());

    }

    // 运价
    // GET /api/Freight/Province
    getProvince() {
        return this.http.get(this.routeService.getBaseUrl() + `Freight/Province`).map(res => res.json());
    }


    getCity(provincecode) {
        return this.http.get(this.routeService.getBaseUrl() + `Freight/City?provincecode=${provincecode}`).map(res => res.json());
    }

    // GET /api/Freight/FreightRate

    getfreightRate(type, carlength, startTime, endTime, origin, destination, skip, count) {
        return this.http.get(this.routeService.getBaseUrl() +
                                `Freight/FreightRate?type=${type}&carlength=${carlength}&startTime=${startTime}&endTime=${endTime}`+
                                `&origin=${origin}&destination=${destination}&skip=${skip}&count=${count}`
                            ).map(res => res.json());
    }


    // GET /api/Freight/FreightRateChart
    getFreightRateChart(type, carlength, startTime, endTime, skip, count) {
        return this.http.get(this.routeService.getBaseUrl() +
                                `Freight/FreightRateChart?type=${type}&carlength=${carlength}&startTime=${startTime}&endTime=${endTime}`+
                                `&skip=${skip}&count=${count}`
                            ).map(res => res.json());
    }

    // GET /api/Freight/FreightRateExpro
    getFreightRateExpro(type, carlength, startTime, endTime, origin, destination) {
         window.location.href = this.routeService.getBaseUrl() +
                                `Freight/FreightRateExpro?type=${type}&carlength=${carlength}&startTime=${startTime}&endTime=${endTime}`+
                                `&origin=${origin}&destination=${destination}`;

    }
    // GET /api/Freight/FreightRateChartExprot
    getFreightRateChartExprot(type, carlength, startTime, endTime) {
         window.location.href = this.routeService.getBaseUrl() +
                            `Freight/FreightRateChartExprot?type=${type}&carlength=${carlength}&startTime=${startTime}&endTime=${endTime}`;
    }




    Main_getCustomerOrdersCount(top,startTime,endTime){
        var url=this.routeService.Main.getCustomerOrdersCount(top,startTime,endTime);
        return this.http.get(url).map(res=>res.json());
    }
    Main_getVehicleCount(){
        var url=this.routeService.Main.getVehicleCount();
        return this.http.get(url).map(res=>res.json());
    }
    Main_getList(){
        var url=this.routeService.Main.getList();
        return this.http.get(url).map(res=>res.json())
    }
    Main_initData(){
        var url=this.routeService.Main.initData();
        return this.http.get(url).map(res=>res.json());
    }
    Main_getWithdrawalsMoney(){
        var url=this.routeService.Main.getWithdrawalsMoney();
        return this.http.get(url).map(res=>res.json());
    }

    Cargo_getOutFlowTop(top,startTime,endTime){
        var url=this.routeService.cGoodTraffic.getOutFlowTop(top,startTime,endTime);
        return this.http.get(url).map(res=>res.json());
    }
    /**
     * 货物流出折线图所需数据
    */
    Cargo_getOutFlowChartsAsync(top,pageSize,pageIndex,dateType,startTime,endTime){
        var url=this.routeService.cGoodTraffic.getOutFlowChartsAsync(top,pageSize,pageIndex,dateType,startTime,endTime);
        return this.http.get(url).map(res=>res.json());
    }
    //导出
    Cargo_getOutFlowExprot(top,dateType,startTime,endTime){
        var url=this.routeService.cGoodTraffic.getOutFlowExprot(top,dateType,startTime,endTime);
        window.location.href=url;
    }
    //货物流入省份数据
    Cargo_getInFlowTop(top,startTime,endTime){
        var url=this.routeService.cGoodTraffic.getInFlowTop(top,startTime,endTime);
        return this.http.get(url).map(res=>res.json());
    }
    /**
     * 货物流入折线图所需数据
    */
    Cargo_getInFlowChartsAsync(top,count,skip,dateType,startTime,endTime){
        var url=this.routeService.cGoodTraffic.getInFlowChartsAsync(top,count,skip,dateType,startTime,endTime);
        return this.http.get(url).map(res=>res.json());
    }
    //导出
    Cargo_getInFlowExprot(top,dateType,startTime,endTime){
        var url=this.routeService.cGoodTraffic.getInFlowExprot(top,dateType,startTime,endTime);
        window.location.href=url;
    }


    //智运通-车辆分析

    //车辆交易次数
    OneCarTransactionNum(type,startTime,endTime){
        var url=this.routeService.tCar.getOneCarTransactionNum(type,startTime,endTime);
        return this.http.get(url).map(res=>res.json());
    }
    //车辆交易次数TOP5
    CarTransactionNumTop5(type,startTime,endTime){
        var url=this.routeService.tCar.getCarTransactionNumTop5(type,startTime,endTime);
        return this.http.get(url).map(res=>res.json());
    }
    //车辆交易金额TOP5
    CarFeeAmountTop5(type,startTime,endTime){
        var url=this.routeService.tCar.getCarFeeAmountTop5(type,startTime,endTime);
        return this.http.get(url).map(res=>res.json());
    }

    //车辆来源TOP5
    CodeNumTop5(type,startTime,endTime){
        var url=this.routeService.tCar.getCodeNumTop5(type,startTime,endTime);
        return this.http.get(url).map(res=>res.json());
    }

    //车辆评价TOP5
    CarAverageTop5(type,startTime,endTime){
        var url=this.routeService.tCar.getCarAverageTop5(type,startTime,endTime);
        return this.http.get(url).map(res=>res.json());
    }
}
