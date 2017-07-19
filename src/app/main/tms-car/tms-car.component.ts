import { Component, OnInit } from '@angular/core';
import {CommonService} from '../../service/common.service';
import { DataService } from '../../service/data.service';
declare var echarts;
declare var $:any;
@Component({
  selector: 'app-tms-car',
  templateUrl: './tms-car.component.html',
  styleUrls: ['./tms-car.component.css']
})
export class TmsCarComponent implements OnInit {

    constructor(private CommonService:CommonService,private DataService: DataService) {}

    type:2;
    startTime="";
    endTime="";
    year="1";//选中的是2017年
    mounth="3";//选中的是4月
    yearList=[];
    mounthList=[{ value: 0, text: '1' },{ value: 1, text: '2' },{ value: 2, text: '3' },{ value: 3, text: '4' },{ value: 4, text: '5' },{ value: 5, text: '6' },{ value: 6, text: '7' },
    { value: 7, text: '8' }, { value: 8, text: '9' },{ value: 9, text: '10' },{ value: 10, text: '11' },{ value: 11, text: '12' } ];
    //单一车辆交易次数统计列表
    carNumList=[];
    //车辆累计交易次数TOP5
    totalTimesList=[];
    //车辆累计交易金额TOP5
    totalMoneyList=[];
    //车辆来源TOP5
    totalCarList=[];
    //车辆评价TOP5
    totalCommentList=[];

    //单一车辆交易次数统计柱状图
    columnOption= {
        color: ['#ffa003'],
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            left: '10px',
            right: '4%',
            top: '50px',
            containLabel: true
        },
        xAxis : [
            {
                type : 'category',
                data : [],
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : [
            {
                name:'车辆数',
                type:'bar',
                barWidth: '12px',
                data:[] 
            }
        ]

    };

    //单一车辆交易次数统计饼状图
    pieOption= {//(xDates,yDates)
        // return{
            title : {
                text: '交易次数占比',
                y:'center',
                x:'center',
                textStyle:{
                    color:'#333',
                    fontFamily: '微软雅黑',
                    fontSize: 14,
                    fontWeight: 'bold'
                }
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)",
            },
            color:['#6fd8f6','#e1b64e','#f37267','#9dc77f','#d556db'],
            legend: {
                x:'center',
                y:'bottom',
                data: [],//xDates
                icon:'circle',
                itemWidth:10,
                itemHeight:10,
                itemGap:20

            },
            series : [
                {
                    name: '车型分布',
                    type: 'pie',
                    radius : ['50%', '60%'],
                    avoidLabelOverlap: false,
                    data:[],//yDates
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        // }
    };


    ngOnInit() {
        // this.renderColumn();
        // this.renderPie();
        var date=new Date;
        var year=date.getFullYear();
        // console.log('year',year)
        for(var startYears=2016;startYears<=year;startYears++){
            var i=year-startYears;
            // this.year = "i";
            this.yearList.push({value:Math.abs(--i),text:String(startYears)});           
            // console.log('yearList',this.yearList)  
        }

        this.onQuery();
        
    }

    onQuery(){
        this.startTime = this.yearList[this.year].text + '-' +this.mounthList[this.mounth].text + '-1' ;
        var days=new Date(this.yearList[this.year].text,this.mounthList[this.mounth].text,0);
        this.endTime = this.yearList[this.year].text + '-' +this.mounthList[this.mounth].text + '-' + days.getDate();
        // console.log("startTime",this.startTime)
        // console.log('endTime',this.endTime)

        this.getOneCarTransactionNum(2,this.startTime,this.endTime);
        this.getCarTransactionNumTop5(2,this.startTime,this.endTime);
        this.getCarFeeAmountTop5(2,this.startTime,this.endTime);
        this.getCodeNumTop5(2,this.startTime,this.endTime);
        this.getCarAverageTop5(2,this.startTime,this.endTime);
    }

    //单一车辆交易次数统计
    getOneCarTransactionNum(type,startTime,endTime){
        this.DataService.OneCarTransactionNum(2,startTime,endTime).subscribe((res)=>{
            console.log('res',res.data)
             this.carNumList = res.data;
             //柱形图，饼状图
            // const xData = [];
            // const yData = [],yDatas=[{value:"",name:""}];
            res.data.map((item, index) => {
                this.columnOption.xAxis[0].data.push(item.num);
                this.columnOption.series[0].data.push({value:item.carNum,name:item.num});

                this.pieOption.series[0].data.push({value:item.carNum,name:item.num});
                this.pieOption.legend.data.push(item.num);

                // xData.push(item.num);
                // yData.push(item.carNum);
                // yDatas.push({value:item.carNum,name:item.num})
            });
            // const columnDom=document.getElementById('tms-car-tradeTims-chart');         
            // const columnDomCharts = echarts.init(columnDom);       
            // columnDomCharts.setOption(this.columnOption(xData,yData), true);
            this.renderColumn();
            this.renderPie();
            // const pieDom=document.getElementById('tms-car-tradeTimsSacle-chart');
            // const pieDomCharts = echarts.init(pieDom);
            // pieDomCharts.setOption(this.pieOption(xData,yDatas), true);
        });
    }

    //车辆累计交易次数top5
    getCarTransactionNumTop5(type,startTime,endTime){
        this.DataService.CarTransactionNumTop5(2,startTime,endTime).subscribe((res)=>{
            this.totalTimesList = res.data
            //console.log('resTOP5',res.data)
        })
    }

    //车辆累计交易金额TOP5
    getCarFeeAmountTop5(type,startTime,endTime){
        this.DataService.CarFeeAmountTop5(2,startTime,endTime).subscribe((res)=>{
            this.totalMoneyList = res.data
            //console.log('resTOP5',res.data)
        })
    }

    //车辆来源TOP5
    getCodeNumTop5(type,startTime,endTime){
        this.DataService.CodeNumTop5(2,startTime,endTime).subscribe((res)=>{
            this.totalCarList = res.data
            //console.log('resTOP5',res.data)
        })
    }

    //车辆评价TOP5
    getCarAverageTop5(type,startTime,endTime){
        this.DataService.CarAverageTop5(2,startTime,endTime).subscribe((res)=>{
            this.totalCommentList = res.data
            //console.log('resTOP5',res.data)
        })
    }


    renderColumn(){
        var columnDom=document.getElementById('tms-car-tradeTims-chart');   
        var columnDomChart = echarts.init(columnDom);
        columnDomChart.clear();
        if (this.columnOption && typeof this.columnOption === "object") {
            columnDomChart.setOption(this.columnOption, true);
        }
    }
    renderPie(){
        var pieDom=document.getElementById('tms-car-tradeTimsSacle-chart');
        var pieDomChart = echarts.init(pieDom);
        pieDomChart.clear();
        if (this.pieOption && typeof this.pieOption === "object") {
            pieDomChart.setOption(this.pieOption, true);
            
        }
    }

}
