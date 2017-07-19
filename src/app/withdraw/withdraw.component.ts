import { Component, OnInit } from '@angular/core';
import {DataService} from '../service/data.service';
declare var $:any;
@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.css']
})
export class WithdrawComponent implements OnInit {

    constructor(
        private DataService:DataService
    ) { }
    year="";
    month="";
    date="";
    day="";
    hour="";
    minute="";
    second="";
    totalCar=30500
    carToLoad=250
    carOnRoad=180
    monthWithdraw=35080
    totalWithdraw=58000
    averageWithdraw=5860
    vehicleInfo={
        totalVehicleCount:'',
        shipmentVehicleCount:'',
        inTransitVehicleCount:''

    };
    withdrawInfo={
        withdrawalsMoneyOfMonths:'',
        totalWithdrawalsMoney:'',
        averageWithdrawalsMoney:''
    };

    ngOnInit() {
        var scale=$('body').width()/1920;
        $('.driver-withdraw-car-img,.driver-withdraw-money-img').width(32*scale+'px').height(32*scale+'px');
        this.loadData();
        setInterval(()=>{
            let now=new Date();
            this.year=now.getFullYear()+"";
            this.month=(now.getMonth()+1).toString();
            this.date=now.getDate()+'';
            this.day=['日','一','二','三','四','五','六'][now.getDay()];
            this.hour=now.getHours()+'';
            this.minute=now.getMinutes()<10?'0'+now.getMinutes():now.getMinutes()+'';
            this.second=now.getSeconds()<10?'0'+now.getSeconds():now.getSeconds()+'';

        },1000);
    }

    loadData(){
        this.DataService.Main_getVehicleCount().subscribe(res=>{
            // console.log(res);
            // this.vehicleInfo=res.data;
            for(var key in this.vehicleInfo){
                if(this.vehicleInfo.hasOwnProperty(key)){
                    this.vehicleInfo[key]=res.data[key];
                }
            }
        });
        this.DataService.Main_getWithdrawalsMoney().subscribe(res=>{
            // this.withdrawInfo=res.data;
            for (var key in this.withdrawInfo) {
                if (this.withdrawInfo.hasOwnProperty(key)) {
                    this.withdrawInfo[key]=Number(res.data[key]).toFixed(2)
                    // this.withdrawInfo[key]=Number(this.withdrawInfo[key]).toFixed(2)
                }
            }
        })
    }

} 
