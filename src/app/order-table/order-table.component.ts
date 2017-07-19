import { Component, OnInit } from '@angular/core';
import {DataService} from '../service/data.service';
import {CommonService} from '../service/common.service';
import * as wilddog from 'wilddog';
declare var $:any;
declare var BMap:any;
@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.css']
})
export class OrderTableComponent implements OnInit {

    constructor(
        private DataService:DataService,
        private CommonService:CommonService
    ) { }

    orderList=[
        {date:'2017/03/09',time:'15:30:25',start:'江苏南京',end:'湖南长沙',type:'钢材',count:'10.5吨',state:'派车中'},
        {date:'2017/03/09',time:'15:30:25',start:'江苏南京',end:'湖南长沙',type:'钢材',count:'10.5吨',state:'派车中'},
        {date:'2017/03/09',time:'15:30:25',start:'江苏南京',end:'湖南长沙',type:'钢材',count:'10.5吨',state:'派车中'},
        {date:'2017/03/09',time:'15:30:25',start:'江苏南京',end:'湖南长沙',type:'钢材',count:'10.5吨',state:'派车中'},
        {date:'2017/03/09',time:'15:30:25',start:'江苏南京',end:'湖南长沙',type:'钢材',count:'10.5吨',state:'派车中'},
        {date:'2017/03/09',time:'15:30:25',start:'江苏南京',end:'湖南长沙',type:'钢材',count:'10.5吨',state:'派车中'},
        {date:'2017/03/09',time:'15:30:25',start:'江苏南京',end:'湖南长沙',type:'钢材',count:'10.5吨',state:'派车中'},
        {date:'2017/03/09',time:'15:30:25',start:'江苏南京',end:'湖南长沙',type:'钢材',count:'10.5吨',state:'派车中'},
        {date:'2017/03/09',time:'15:30:25',start:'江苏南京',end:'湖南长沙',type:'钢材',count:'10.5吨',state:'派车中'},
        {date:'2017/03/09',time:'15:30:25',start:'江苏南京',end:'湖南长沙',type:'钢材',count:'10.5吨',state:'派车中'},
        {date:'2017/03/09',time:'15:30:25',start:'江苏南京',end:'湖南长沙',type:'钢材',count:'10.5吨',state:'派车中'},
        {date:'2017/03/09',time:'15:30:25',start:'江苏南京',end:'湖南长沙',type:'钢材',count:'10.5吨',state:'派车中'},
        {date:'2017/03/09',time:'15:30:25',start:'江苏南京',end:'湖南长沙',type:'钢材',count:'10.5吨',state:'派车中'},
        {date:'2017/03/09',time:'15:30:25',start:'江苏南京',end:'湖南长沙',type:'钢材',count:'10.5吨',state:'派车中'},
        {date:'2017/03/09',time:'15:30:25',start:'江苏南京',end:'湖南长沙',type:'钢材',count:'10.5吨',state:'派车中'},
        {date:'2017/03/09',time:'15:30:25',start:'江苏南京',end:'湖南长沙',type:'钢材',count:'10.5吨',state:'派车中'},
        {date:'2017/03/09',time:'15:30:25',start:'江苏南京',end:'湖南长沙',type:'钢材',count:'10.5吨',state:'派车中'},
        {date:'2017/03/09',time:'15:30:25',start:'江苏南京',end:'湖南长沙',type:'钢材',count:'10.5吨',state:'派车中'},
        {date:'2017/03/09',time:'15:30:25',start:'江苏南京',end:'湖南长沙',type:'钢材',count:'10.5吨',state:'派车中'}
    ]
    
    ngOnInit() {
        
         const config = {
            
            syncURL: "https://tms-web-dev.wilddogio.com/" //tms野狗地址
            // syncURL: 'https://wild-hare-72826.wilddogio.com' // tms dev野狗地址
            //https://tms-web-dev.wilddogio.com/BigData/OrderSaveEventData/1831a06d-b4dc-424d-86bd-3ac1d380701f
        };
        wilddog.initializeApp(config);
        const ref = wilddog.sync().ref('BigData');//OrderHSCEventData 已派车
        ref.on('value', snapshot => {
            
            var list=this.CommonService.getOrderSaveEventDataFromWildDog(snapshot.val())
            var orderList=[];
            list.forEach((item,index)=>{
                
                if(typeof item!='object'){return}
                item.Date=item.CreationTime.split(' ')[0].replace(/-/g,'/');
                item.Time=item.CreationTime.split(' ')[1];
                item.StartProvince=item.OriginCode.replace(item.OriginCityName,'');
                item.EndProvince=item.DestinationCode.replace(item.DestinationCityName,'');
                orderList.push(item);
            })
            
            
            if(orderList.length>10){
                orderList=orderList.slice(-10);
            }

            orderList=orderList.reverse();//新的数据在上
            if(orderList.length===10){
                orderList[9].index=9
            }
            this.orderList=orderList;
            this.CommonService.orderEmit.emit(orderList)
            
        });

        ref.on('child_added',data=>{
            // console.log(data.val());
        })

        
    }

    convertStr(str){
        if(str.length>4){
            str=str.substr(0,4)+'...';
        }
        return str;
    }

   

}
