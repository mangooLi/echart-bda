import { Component, OnInit } from '@angular/core';
import {DataService} from '../../service/data.service';
import {CommonService} from '../../service/common.service';

declare var echarts:any;
declare var $:any;
declare var bootbox:any;
@Component({
  selector: 'app-tms-cargo',
  templateUrl: './tms-cargo.component.html',
  styleUrls: ['./tms-cargo.component.css']
})
export class TmsCargoComponent implements OnInit {

    constructor(
        private DataService:DataService,
        private CommonService:CommonService,
    ) { }
    total=0;
    pageIndex=1;
    pageSize=10;
    cargo_in_myChart=null;
    cargo_out_myChart=null;
    type=3;
    startTime="";
    endTime="";
    dateRange="";
    typeList=[{text:'年',value:0},{text:'季',value:1},{text:'月',value:2},{text:'日',value:3}]
    option = {
        color:['#70cffb','#f8a008','#ff525b'],
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data:[]
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
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
                name:'',
                type:'line',
                stack: '总量0',
                data:[]
            },
            {
                name:'',
                type:'line',
                stack: '总量1',
                data:[]
            },
            {
                name:'',
                type:'line',
                stack: '总量2',
                data:[]
            }
        ]
    };

    cargo_out_pros=[]
    cargo_in_pros=[];
    cargo_in_out_pros=[];
    cargo_table_pros=[];
    cargo_table_details=[];
    table_is_out=true//当前列表展示的是流出量还是流入量
    ngOnInit() {
        this.startTime=this.CommonService.getEndDay(37);
        this.endTime=this.CommonService.getEndDay();
        this.dateRange=this.startTime+"至"+this.endTime;
        $('#tms_transaction_dateRange').dateRangePicker({
            format: 'YYYY-MM-DD',
            separator: ' 至',
            startDate:'2016-8-1',
            endDate:this.CommonService.getEndDay()
        }).bind('datepicker-change',(event,obj)=>{
            console.log('changed',this.type,typeof this.type);
            
            
            switch (Number(this.type)) {
                case 0:;break;
                case 1:;
                case 2:{
                    if(obj.date1.getFullYear()!==obj.date2.getFullYear()){
                        bootbox.alert("时间单位为'季度'或者'月'时，起始时间应位于同一年");
                        return;
                    };
                    break;
                    
                }
                case 3:{
                    var skip=obj.date2.getTime()-obj.date1.getTime();
                    if(skip>30*24*3600*1000){
                        bootbox.alert("时间单位为‘日’时，前后不得超过30天");
                        return;
                    }
                    break;
                }
                default:break;
            }
            this.startTime=this.CommonService.transformDate(obj.date1);
            this.endTime=this.CommonService.transformDate(obj.date2);
            this.dateRange=this.startTime+"至"+this.endTime;
        })

        this.loadCargo_in_table();
        this.loadCarogo_out_table();
        
        this.switchChart('out');
        this.switchTable('out');
    }

    renderChart(){
        var cargo_in_dom = document.getElementById("cargo-chart-dom");
        if(!this.cargo_in_myChart){
            this.cargo_in_myChart = echarts.init(cargo_in_dom);
        }
        this.cargo_in_myChart.clear();
        if (this.option && typeof this.option === "object") {
            this.cargo_in_myChart.setOption(this.option,true);
        }
    }
    /**
     * 获取货物流入省份Top3的列表
     */
    loadCargo_in_table(){
        this.DataService.Cargo_getInFlowTop(3,this.startTime,this.endTime).subscribe(res=>{
            var list=res.data;
            list.forEach((item,index)=>{
                item.index=index+1;
            })
            this.cargo_in_pros=list;
            
        })
    }

    /**
     * 获取货物流出省份Top3的列表
     */
    loadCarogo_out_table(){
        this.DataService.Cargo_getOutFlowTop(3,this.startTime,this.endTime).subscribe(res=>{
            // console.log('cargon out table',res);
            var list=res.data;
            list.forEach((item,index)=>{
                item.index=index+1;
            })
            this.cargo_out_pros=list;
           
        })
    }
    /**
     * 获取货物流入图表的数据获取货物流入图表的数据
     */
    load_cargo_in_chart(){
        this.DataService.Cargo_getInFlowChartsAsync(3,-1,-1,this.type,this.startTime,this.endTime).subscribe(res=>{
            var list=res.data.inFlowChartsList;
            this.option.xAxis.data=[];
            this.option.series[0].data=[];
            this.option.series[1].data=[];
            this.option.series[2].data=[];
            // this.total
            if(list[0].provinceDetailList.length===0){
                bootbox.alert('该时间段内没有数据');
                return;
            }
            list.forEach((item,index)=>{
                this.option.xAxis.data.push(item.date);
                this.option.series[0].data.push(item.provinceDetailList[0].realQuantityOfGoods);
                this.option.series[1].data.push(item.provinceDetailList[1].realQuantityOfGoods);
                this.option.series[2].data.push(item.provinceDetailList[2].realQuantityOfGoods);
            })
            list[0].provinceDetailList.forEach((item,index)=>{
                // this.option.series[index].name=item.province;
                
                item.index=index+1;
                this.option.series[index].name=item.province;
                item.color=this.option.color[index];
                this.cargo_in_out_pros[index]=item;
            })

            this.renderChart();
            console.log(this.option.series);
            // this.renderOutChart();
        })
    }
    /**
     * 获取货物流出图表的数据
     */
    load_cargo_out_chart(){
        this.DataService.Cargo_getOutFlowChartsAsync(3,-1,-1,this.type,this.startTime,this.endTime).subscribe(res=>{
            var list=res.data.outFlowChartsList;
            this.option.xAxis.data=[];
            this.option.series[0].data=[];
            this.option.series[1].data=[];
            this.option.series[2].data=[];
            if(list[0].provinceDetailList.length===0){
                bootbox.alert("该时间段内没有数据");
                return;
            }
            list[0].provinceDetailList.forEach((item,index)=>{
                // this.option.series[index].name=item.province;
                item.index=index+1;
                this.option.series[index].name=item.province;
                item.color=this.option.color[index];
                this.cargo_in_out_pros[index]=item;
            })
            list.forEach((item,index)=>{
                this.option.xAxis.data.push(item.date);
                
                this.option.series[0].data.push(item.provinceDetailList[0].realQuantityOfGoods);
                this.option.series[1].data.push(item.provinceDetailList[1].realQuantityOfGoods);
                this.option.series[2].data.push(item.provinceDetailList[2].realQuantityOfGoods);
                
            })
            

            this.renderChart();
            // this.renderOutChart();
        })
    }
    /**
     * 将折线图切换为流入数据图或者流出数据图
     * @param inOrOut "in"或者"out"，对应折线图切换为流入数据图和流出数据图
     */
    switchChart(inOrOut){
        $('.cargo-title-item').removeClass('cargo-item-active');
        switch(inOrOut){
            case 'in':{
                $('.cargo-title-item')[1].classList.add('cargo-item-active');
                this.load_cargo_in_chart();
                // this.option.series[0].name=
                this.cargo_in_out_pros=this.cargo_in_pros;
                
            };break;
            case 'out':{
                $('.cargo-title-item')[0].classList.add('cargo-item-active');
                this.load_cargo_out_chart();
                this.cargo_in_out_pros=this.cargo_out_pros;
                
            };break;
        }
    }

    /**
     * 加载货物流出明细列表
     * @param top 
     * @param pageSize 
     * @param pageIndex 
     * @param dateType 
     * @param startTime 
     * @param endTime 
     */
    loadOutDetail(top,pageSize,pageIndex,dateType,startTime,endTime){

        this.DataService.Cargo_getOutFlowChartsAsync(3,this.pageSize,this.pageIndex,this.type,this.startTime,this.endTime).subscribe(res=>{
            var list=res.data.outFlowChartsList;
            this.total=res.data.totalCount
            this.cargo_table_details=[];
            list.forEach((item,index) => {
                this.cargo_table_details[index]=[];
                this.cargo_table_details[index][0]=item.date;
                item.provinceDetailList.forEach((it,idx)=>{
                    this.cargo_table_details[index].push(it.realQuantityOfGoods);
                })
            });
        })
    }
    //加载货物流入明细列表
    loadInDetail(top,pageSize,pageIndex,dateType,startTime,endTime){

        this.DataService.Cargo_getInFlowChartsAsync(3,pageSize,this.pageIndex,this.type,this.startTime,this.endTime).subscribe(res=>{
            var list=res.data.inFlowChartsList;
            this.total=res.data.totalCount;
            this.cargo_table_details=[];
            list.forEach((item,index) => {
                this.cargo_table_details[index]=[];
                this.cargo_table_details[index][0]=item.date;
                item.provinceDetailList.forEach((it,idx)=>{
                    this.cargo_table_details[index].push(it.realQuantityOfGoods);
                })
            });
        })
    }
    /**
     * 切换流出数据明细 或 流入数据明细
     * @param inOrOut "in"或者"out"，对应详情列表切换为流入数据明细和流出数据明细
     */
    switchTable(inOrOut){
        $('.cargo-table-item').removeClass('cargo-item-active');
        // this.pageSize=10;
        // this.pageIndex=1;
        switch(inOrOut){
            case 'in':{
                $('.cargo-table-item')[1].classList.add('cargo-item-active');
                this.loadInDetail(3,this.pageSize,this.pageIndex,this.type,this.startTime,this.endTime);
                this.cargo_table_pros=this.cargo_in_pros;
                this.table_is_out=false;
            };break;
            case 'out':{
                $('.cargo-table-item')[0].classList.add('cargo-item-active');
                this.loadOutDetail(3,this.pageSize,this.pageIndex,this.type,this.startTime,this.endTime);
                this.cargo_table_pros=this.cargo_out_pros;
                this.table_is_out=true;
            };break;
        }
    }
    /**
     * 导出列表
     */
    export(){
        if(this.table_is_out){
            this.DataService.Cargo_getOutFlowExprot(3,this.type,this.startTime,this.endTime);
        }else{
            this.DataService.Cargo_getInFlowExprot(3,this.type,this.startTime,this.endTime);
        }
    }

    query(){
        this.pageIndex=1;
        this.switchChart('out');
        this.switchTable('out');
    }

    onPageIndexChange(event){
        // this.skip=event.pageSkip;
        // this.count=event.pageSize;
        this.pageIndex=(event.pageSkip/event.pageSize)+1;
        this.pageSize=event.pageSize;

        if(!this.table_is_out){
            this.loadInDetail(3,this.pageSize,this.pageIndex,this.type,this.startTime,this.endTime);
        }else{
            this.loadOutDetail(3,this.pageSize,this.pageIndex,this.type,this.startTime,this.endTime);
        }
    }


}
