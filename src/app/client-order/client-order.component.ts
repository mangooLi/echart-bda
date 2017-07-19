import { Component, OnInit } from '@angular/core';
import {DataService} from '../service/data.service';
import {CommonService} from '../service/common.service';

declare var echarts:any;
declare var $:any;
@Component({
  selector: 'app-client-order',
  templateUrl: './client-order.component.html',
  styleUrls: ['./client-order.component.css']
})
export class ClientOrderComponent implements OnInit {

    constructor(
        private DataService:DataService,
        private CommonService:CommonService
    ) { }
    option = {
        
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
       
        grid: {
            left: '2%',
            right: '2%',
            bottom: '2%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            axisTick: {show: false},
            boundaryGap: [0, 0.01],
            axisLine:{
                show:false,
                lineStyle:{
                    color:'#fff'
                }
            },
            splitLine:{
                show:true,
                lineStyle:{
                    color:['#0075a1']
                }
            },
            nameTextStyle:{
                color:'#fff',
                // fontSize:16
            },
        },
        yAxis: {
            type: 'category',
            data: ['辽宁毅马五金有限公司','大亚人造板集团','江苏毅马铸锻有限公司','天工国际有限公司','江苏沃得农业机械有限公司'],
            axisLabel : {
                show : true,
                textStyle : {
                    color : '#fff'
                },
            },
            axisLine:{
                show :false,
                lineStyle:{
                    color:'#0075a1'
                }
                
            },
           
        },
        series: [
            {
                name: '（订单量）',
                type: 'bar',
                data: [ 385, 394, 560, 1083, 1533],
                itemStyle: {   
               
                    normal:{

                        color:function (params){
                            var colorList = ['#00ffff','#00ff00','#ffff00','#ff6700','#fe0100'];
                            return colorList[params.dataIndex];
                        }
                    },
                },
            }
        ]
    };

    ngOnInit() {
        
        // this.render();

        this.loadData();
    }

    render(){
        var dom = document.getElementById("client-order-chart");
        var scale=$('body').width()/1920;
        $(dom).width(400*scale+'px').height(250*scale+'px');
        var myChart = echarts.init(dom);
        myChart.clear();
        if (this.option && typeof this.option === "object") {
            myChart.setOption(this.option, true);
           
        }
    }

    loadData(){
        var now=new Date();
        var startTime=now.getFullYear()+'-'+(now.getMonth()+1)+'-'+'01';
        var endTime=this.CommonService.transformDate(now);
        this.DataService.Main_getCustomerOrdersCount(5,startTime,now).subscribe(res=>{
            // console.log(res);
            var list=res.data;
            this.option.series[0].data=[];
            this.option.yAxis.data=[];
            list=list.reverse();
            list.forEach(element => {
                this.option.series[0].data.push(element.counts);
                this.option.yAxis.data.push(element.clientName);
            });

            this.render();
        });
    }

}
