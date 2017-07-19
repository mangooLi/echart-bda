import { Component, OnInit } from '@angular/core';
declare var $:any;
declare var echarts:any;
declare var moment:any;
declare var pickerDateRange:any;
declare var bootbox:any;
import {DataService} from '../../service/data.service';
import {CommonService} from '../../service/common.service'

@Component({
  selector: 'app-main-trade',
  templateUrl: './tms-transaction.component.html',
  styleUrls: ['./tms-transaction.component.css']
})
export class TmsTransactionComponent implements OnInit {

    constructor(
        private DataService:DataService,
        private CommonService:CommonService
    ) { }
    total=0;
    feeIn:number;
    feeOut:number;
    tradeTimes:number;
    ton:number;
    startTime="";
    endTime="";
    dateRange="";
    tableList=[];
    type:number=3;
    skip=0;
    count=10;
    typeList=[{text:'年',value:0},{text:'季',value:1},{text:'月',value:2},{text:'日',value:3}]

    
    public options: any = {
        locale: { format: 'YYYY-MM-DD',lang: 'zh-cn' },
        alwaysShowCalendars: false,
    };
    legends=[
        {name:"交易额应付（万元）",color:"#81b359"},{name:"交易额应收（万元）",color:"#f7a207"},
        {name:"交易吨位（百吨）",color:"#ff535a"},{name:"交易次数",color:"#70d0fb"}
    ]
        
    option = {
        color:['#70cffb','#f8a008','#fb5459','#70d0fb','#ff515a'],
        title: {
            text: ''
        },
        tooltip: {
            trigger: 'axis'
        },
        // legend: {
        //     data:['交易额应付（万元）','交易额应收（万元）','交易吨位（百吨）','交易次数']
        // },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        // toolbox: {
        //     feature: {
        //         saveAsImage: {}
        //     }
        // },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: []
        },
        yAxis: {
            type: 'value',
            offset:0,
            show:true,
            axisTick: {show: false},
            axisLine:{
                show :false,
                lineStyle:{
                    color:'#333'
                }
                
            },
            splitLine:{
                show:true,
                lineStyle:{
                    color:['#b5b5b5']
                }
            }
        },
        series: [
            {
                name:'交易额应付（万元）',
                type:'line',
                stack: '总量0',
                data:[],
                lineStyle:{
                    normal:{
                        color:this.legends[0].color
                    }
                }
            },
            {
                name:'交易额应收（万元）',
                type:'line',
                stack: '总量1',
                data:[],
                lineStyle:{
                    normal:{
                        color:this.legends[1].color
                    }
                }
            },
            {
                name:'交易吨位（百吨）',
                type:'line',
                stack: '总量2',
                data:[],
                lineStyle:{
                    normal:{
                        color:this.legends[2].color
                    }
                }
            },
            {
                name:'交易次数',
                type:'line',
                stack: '总量3',
                data:[],
                lineStyle:{
                    normal:{
                        color:this.legends[3].color
                    }
                }
            },
        ]
    };

    
      
    ngOnInit() {
        this.startTime=this.CommonService.getEndDay(37);
        this.endTime=this.CommonService.getEndDay();
        this.dateRange=this.startTime+"至"+this.endTime;
        var scale=$('body').width()/1920;
        $('#tms_transaction_dateRange').dateRangePicker({
            format: 'YYYY-MM-DD',
            separator: ' 至',
            startDate:'2016-8-1',
            endDate:this.CommonService.getEndDay()
        }).bind('datepicker-change',(event,obj)=>{
            console.log('changed',this.type,typeof this.type);
            
            this.startTime=this.CommonService.transformDate(obj.date1);
            this.endTime=this.CommonService.transformDate(obj.date2);
            this.dateRange=this.startTime+"至"+this.endTime;
            switch (Number(this.type)) {
                case 0:;break;
                case 1:;
                case 2:{
                    if(obj.date1.getFullYear()!==obj.date2.getFullYear()){
                        bootbox.alert("时间单位为'季度'或者'月'时，起始时间应位于同一年")
                    }
                    break;
                }
                case 3:{
                    var skip=obj.date2.getTime()-obj.date1.getTime();
                    if(skip>30*24*3600*1000){
                        bootbox.alert("时间单位为‘日’时，前后不得超过30天");
                    }
                }
                default:break;
            }
        })
        this.render(this.type,this.startTime,this.endTime);
        
        this.getTransactionBrief(0,this.startTime,this.endTime);
        this.getTableList(this.type,this.startTime,this.endTime,0,10);
    }
    
    renderChart(){
        var dom = document.getElementById("tradeChartDom");
        var myChart = echarts.init(dom);
        myChart.clear();
        if (this.option && typeof this.option === "object") {
            myChart.setOption(this.option, true);
          
        }
    }

    getTransactionBrief(type,startTime,endTime){
        this.DataService.Transaction_getTransactionSun(type,startTime,endTime).subscribe(res=>{
            
            res=res.data;
            this.feeIn=this.numConverse(res.sumReceivableTotalPrice,10000);
            this.feeOut=this.numConverse(res.sumFeeAmount,10000);
            this.tradeTimes=res.num;
            this.ton=this.numConverse(res.sumTon,100);
        })
    }
    /**
     * 渲染图表
     * @param type 
     * @param startTime 
     * @param endTime 
     */
    render(type,startTime,endTime){
        this.DataService.Transaction_getTransactionChart(type,startTime,endTime,0,-1).subscribe(res=>{
            this.total=res.data.length;
            var list=res.data;
            this.option.xAxis.data=[];
            this.option.series[0].data=[];
            this.option.series[1].data=[];
            this.option.series[2].data=[];
            this.option.series[3].data=[];
            list.forEach((item,index) => {
                this.option.xAxis.data.push(this.CommonService.getDateFromTimeStr(item.time));
                this.option.series[0].data.push(this.numConverse(item.sumFeeAmount,10000));
                this.option.series[1].data.push(this.numConverse(item.sumReceivableTotalPrice,10000));
                this.option.series[2].data.push(this.numConverse(item.sumTon,100));
                this.option.series[3].data.push(item.num);
                
            });
            this.renderChart();
        })
    }

    getTableList(type,startTime,endTime,skip,count){
        this.DataService.Transaction_getTransactionChart(type,startTime,endTime,skip,count).subscribe(res=>{
            var list=res.data;
            this.tableList=[];
            list.forEach((item,index)=>{
                this.tableList.push({
                    feeIn:this.numConverse(item.sumReceivableTotalPrice,10000),
                    feeOut:this.numConverse(item.sumFeeAmount,10000),
                    time:this.CommonService.getDateFromTimeStr(item.time),
                    tradeTimes:item.num,
                    ton:this.numConverse(item.sumTon,100)
                })
            })
        })
    }
    query(){
        this.getTableList(this.type,this.startTime,this.endTime,0,this.count);
        this.render(this.type,this.startTime,this.endTime);
    }
    /**
     * 将元/吨等数字换成万元，万吨，并保留两位小数
     * @param num 原数字
     * @param scale [10,100,1000,1000] 
     */
    numConverse(num,scale):number{
        return Number((num/scale).toFixed(2));
    }

    export(){
        this.DataService.Transaction_exprotTransaction(this.type,this.startTime,this.endTime);
    }
    
    onPageIndexChange(event){
        // console.log(event);
        this.skip=event.pageSkip;
        this.count=event.pageSize;
        this.getTableList(this.type,this.startTime,this.endTime,this.skip,this.count)
    }
}

