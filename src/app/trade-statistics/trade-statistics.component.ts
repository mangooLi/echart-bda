//最近六个月交易统计图
import { Component, OnInit } from '@angular/core';
import {DataService} from '../service/data.service';
import {CommonService} from '../service/common.service';
declare var echarts:any;
declare var $:any;
@Component({
  selector: 'app-trade-statistics',
  templateUrl: './trade-statistics.component.html',
  styleUrls: ['./trade-statistics.component.css']
})
export class TradeStatisticsComponent implements OnInit {

    constructor(
        private DataService:DataService,
        private CommonService:CommonService
    ) { }
    trade_static_color=['#f00','#ff0','#f60','#0f0']
    myChart=null;
    option = {
        color:['#f00','#ff0','#f60','#0f0'],
        title: {
            text: ''
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data:[],
            textStyle:{
                color:'#fff'
            }
        },
        grid: {
            left: '1%',
            right: '1%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: [],
            axisLine:{
                lineStyle:{
                    color:'#0075a1'
                }
            },
            axisLabel : {
                show : true,
                textStyle : {
                    color : '#fff'
                },
            },
           
        },
        yAxis: {
            type: 'value',
            show:true,
            axisTick: {show: false},
            axisLine:{
                show :false,
                lineStyle:{
                    color:'#fff'
                }
                
            },
            nameTextStyle:{
                color:'#fff',
                fontSize:16
            },
            splitLine:{
                show:true,
                lineStyle:{
                    color:['#0075a1']
                }
            }
        },
        series: [
            {
                name:'交易额（应付） 万元',
                type:'line',
                stack: '总量1',
                data:[120, 132, 101, 134, 90, 230, 210],
                lineStyle:{
                    normal:{
                        color:'#d95a09'
                    }
                }
            },
            {
                name:'交易额（应收）万元',
                type:'line',
                stack: '总量2',
                data:[220, 182, 191, 234, 290, 330, 310],
                lineStyle:{
                    normal:{
                        color:'#00fa02'
                    }
                }
            },
            {
                name:'交易吨位（吨）',
                type:'line',
                stack: '总量3',
                data:[150, 232, 201, 154, 190, 330, 410],
                lineStyle:{
                    normal:{
                        color:'#fe0002'
                    }
                }
            },
            {
                name:'交易次数',
                type:'line',
                stack: '总量4',
                data:[320, 332, 301, 334, 390, 330, 320],
                lineStyle:{
                    normal:{
                        color:'#00fdfd'
                    }
                }
            }
        ]
    };
    
    ngOnInit() {
        var scale=$('body').width()/1920;
        $('#trade-statistics-chart').width(400*scale+'px').height(250*scale+'px');
        $('.colorblock').width(30*scale+'px').height(8*scale+'px');
        this.trade_static_color.forEach((item,index)=>{
            $(`.cb0${index}`).css({'backgroundColor':item});
        })
        // this.render();
        this.loadData();
    }

    render(){
        var dom = document.getElementById("trade-statistics-chart");
        this.myChart = echarts.init(dom);
        this.myChart.clear();
        if (this.option && typeof this.option === "object") {
            this.myChart.setOption(this.option, true);
           
        }
    }

    loadData(){
        var now=new Date()
        var today=this.CommonService.transformDate(now);
        var endDate=today.substr(0,8)+'01';

        var thisMonth=now.getMonth()+1;
        var thisYear=now.getFullYear()
        var startMonth=thisMonth>6?thisMonth-6:thisMonth+6;
        var startYear=thisMonth>6?thisYear:thisYear-1;
        var startDate=startYear+'-'+startMonth+'-01';


        this.DataService.Transaction_getTransactionChart(2,startDate,endDate,0,-1).subscribe(res=>{
            // console.log('res',res.data);
            var list=res.data;
            list.pop();
            this.option.xAxis.data=[];
            this.option.series[0].data=[];
            this.option.series[1].data=[];
            this.option.series[2].data=[];
            this.option.series[3].data=[];
            list.forEach((item,index) => {
                this.option.xAxis.data.push({  value:item.time,textStyle: {align:'right'}});
                this.option.series[0].data.push(this.CommonService.numConverse(item.sumFeeAmount,10000));
                this.option.series[1].data.push(this.CommonService.numConverse(item.sumReceivableTotalPrice,10000));
                this.option.series[2].data.push(this.CommonService.numConverse(item.sumTon,100));
                this.option.series[3].data.push(item.num);
                
            });

            this.render();
        })
    }

    

}
