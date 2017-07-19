import { Component, OnInit } from '@angular/core';
import {DataService} from '../../service/data.service';
import {CommonService} from '../../service/common.service'
declare var echarts;
declare var $:any;
declare var bootbox:any;
@Component({
  selector: 'app-tms-route',
  templateUrl: './tms-line.component.html',
  styleUrls: ['./tms-line.component.css']
})
export class TmsLineComponent implements OnInit {

    constructor(
        private DataService:DataService,
        private CommonService:CommonService
    ) { }
    total=0;
    skip=0;
    count=10;

    hotLines=[];
    tableList=[];//列表数据
    showTableList=[];//展示的列表数据
    type=3;
    startTime="";
    endTime="";
    dateRange="";
    myChart=null;
    typeList=[{text:'年',value:0},{text:'季',value:1},{text:'月',value:2},{text:'日',value:3}]
        
    option = {
        color:['#7fb357','#f6a109','#fb5459','#70d0fb','#b65cc9'],
        title: {
            text: ''
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data:[],
            itemWidth:"20px",
            itemHeight:'10px',
            orient:'horizontal'
        },
        grid: {
            left: '3%',
            right: '5%',
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
                name:'邮件营销',
                type:'line',
                stack: '总量0',
                data:[]
            },
            {
                name:'联盟广告',
                type:'line',
                stack: '总量1',
                data:[]
            },
            {
                name:'视频广告',
                type:'line',
                stack: '总量2',
                data:[]
            },
            {
                name:'直接访问',
                type:'line',
                stack: '总量3',
                data:[]
            },
            {
                name:'',
                type:'line',
                stack: '总量4',
                data:[]
            },
        
        ]
    };
    emptyList=[];
    ngOnInit() {
        for(let i=1;i<31;i++){
            this.emptyList.push(i)
        }
        this.startTime=this.CommonService.getEndDay(37);
        this.endTime=this.CommonService.getEndDay();
        this.dateRange=this.startTime+"至"+this.endTime;
        $('#querydateRange').dateRangePicker({
            format: 'YYYY-MM-DD',
            separator: ' 至',
            startDate:'2016-8-1',
            endDate:this.CommonService.getEndDay()
        }).bind('datepicker-change',(event,obj)=>{
            console.log('changed',this.type,typeof this.type);
            
            this.startTime=this.CommonService.transformDate(obj.date1)
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

        this.renderChart(5,this.type,this.startTime,this.endTime);
        this.getHotLine(5,this.startTime,this.endTime);
        
    }

    render(){
        var dom = document.getElementById("route-chart-dom");
        if(!this.myChart){
            this.myChart = echarts.init(dom);
        }
        
        this.myChart.clear();
        if (this.option && typeof this.option === "object") {
            this.myChart.setOption(this.option, true);
            
        }
    }
    /**
     * 渲染图表
     * @param top 
     * @param dateType 
     * @param startTime 
     * @param endTime 
     */
    renderChart(top,dateType,startTime,endTime){
        
        this.DataService.Line_getHotLineDetail(top,dateType,startTime,endTime).subscribe(res=>{
            // console.log(res.data);
            this.option.xAxis.data=[];
            this.option.legend.data=[]
            var list=res.data;
            this.option.series.forEach(item=>{
                item.data=[];
            })
            list[0].value.forEach(item=>{
                this.option.xAxis.data.push(item.date);
            })
            list.forEach((item,index) => {
                this.option.legend.data.push(item.key);
                
                this.option.series[index].name=item.key;
                item.value.forEach((it,ind) => {
                    this.option.series[index].data.push(it.counts);
                });
            
            });

            this.tableList=[];
            for(let i=0;i<list[0].value.length;i++){
                this.tableList[i]={
                    date:list[0].value[i].date,
                    counts:[]
                }
                for(let j=0;j<list.length;j++){
                    this.tableList[i].counts.push(list[j].value[i  ].counts)
                }
            }
            // console.log('tableList',this.tableList)
            this.total=this.tableList.length;
            this.showTable(0,this.count);
            this.render();
        })
    }

    /**
     * 获取热门线路
     * @param top 
     * @param startTime 
     * @param endTime 
     */
    getHotLine(top,startTime,endTime){
        this.DataService.Line_getHotLine(top,startTime,endTime).subscribe(res=>{
            console.log('res',res);
            this.hotLines=res.data;
            this.hotLines.forEach((item,index)=>{
                item.index=index+1;
                item.color=this.option.color[index];
            })
        })
    }

    query(){
        this.renderChart(5,this.type,this.startTime,this.endTime);
    }
    export(){
        this.DataService.Line_exportHotLine(5,this.type,this.startTime,this.endTime);
    }
    /**
     * 展现交易明细表格
     */
    showTable(skip,count){
        if(skip+count<this.total){
            this.showTableList=this.tableList.slice(skip,skip+count);
        }else{
            this.showTableList=this.tableList.slice(skip,this.total);
        }
        // this.showTableList=this.tableList.slice(0,10);
    }
    onPageIndexChange(event){
        this.skip=event.pageSkip;
        this.count=event.pageSize;
        this.showTable(this.skip,this.count)
    }
}
