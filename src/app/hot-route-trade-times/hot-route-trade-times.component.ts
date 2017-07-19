//上个月热门线路前五交易次数统计
import { Component, OnInit } from '@angular/core';
import {DataService} from '../service/data.service'
declare var echarts:any;
declare var $:any;
@Component({
  selector: 'app-hot-route-trade-times',
  templateUrl: './hot-route-trade-times.component.html',
  styleUrls: ['./hot-route-trade-times.component.css']
})
export class HotRouteTradeTimesComponent implements OnInit {
    constructor(
        private DataService:DataService
    ) { }
    hotRouteList=['江苏镇江-广东深圳','江苏镇江-广东深圳','江苏镇江-广东深圳','江苏镇江-广东深圳','江苏镇江-广东深圳'];
    myChart=null;
    option = {
        color:['#ff0000','#ffff00','#00ffff','#ff6600','#00ff00','#ff00ff'],
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
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['01','02','03','04','05','05','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30'],
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
            splitNumber:3,
            axisLine:{
                show :false,
                lineStyle:{
                    color:'#fff'
                }
                
            },
            axisTick: {show: false},
            splitLine:{
                show:true,
                interval:1,
                lineStyle:{
                    color:['#0075a1']
                }
            }
        },
        series: [
            {
                name:'邮件营销',
                type:'line',
                stack: '总量1',
                data:[50, 40, 30, 20, 10, 5, 16],
                lineStyle:{
                    normal:{
                        color:'#d95a09'
                    }
                }
            },
            {
                name:'联盟广告',
                type:'line',
                stack: '总量2',
                data:[55, 18, 19, 23, 29, 33, 31],
                lineStyle:{
                    normal:{
                        color:'#00fa02'
                    }
                }
            },
            {
                name:'视频广告',
                type:'line',
                stack: '总量3',
                data:[15, 23, 20, 15, 19, 33, 41],
                lineStyle:{
                    normal:{
                        color:'#fe0002'
                    }
                }
            },
            {
                name:'直接访问',
                type:'line',
                stack: '总量4',
                data:[32, 33, 30, 33, 39, 33, 32],
                lineStyle:{
                    normal:{
                        color:'#00fdfd'
                    }
                }
            },
            {
                name:'搜索引擎',
                type:'line',
                stack: '总量5',
                data:[21, 50, 36, 25, 45, 12, 45],
                lineStyle:{
                    normal:{
                        color:'#fa01fd'
                    }
                }
            }
        ]
    };
    
    ngOnInit() {
        var scala=$('body').width()/1920;
        $('#hrtt-chart').width(1700*scala+'px').height(130*scala+'px');
        this.render();

        this.loadData()
    }

    render(){
        var dom = document.getElementById("hrtt-chart");
        if(!this.myChart){
            this.myChart = echarts.init(dom);
        }
        
        this.myChart.clear();
        if (this.option && typeof this.option === "object") {
            this.myChart.setOption(this.option, true);
           
        }
    }

    /**
     * 加载上个月前五线路交易次数统计
     */
    loadData(){
        var thisYear=new Date().getFullYear();
        var thisMonth=new Date().getMonth();
        let preMonth=thisMonth=0?12:thisMonth;
        let preYear=thisMonth?thisYear:thisYear-1;
        let startTime=preYear+'-'+preMonth+'-'+'01';
        let endTime=thisYear+'-'+(Number(thisMonth)+1)+'-'+'01';
        this.DataService.Line_getHotLineDetail(5,3,startTime,endTime).subscribe(res=>{
            var list=res.data;
            // list.pop();
            this.hotRouteList=[];
            this.option.xAxis.data=[];
            list.forEach((ele,index) => {
                this.hotRouteList.push(ele.key)
                this.option.series[index].name=ele.key;
                this.option.series[index].data=[];
                ele.value.pop();
                ele.value.forEach((item,idx)=>{

                    this.option.series[index].data.push(item.counts);
                    if(index===0){
                        this.option.xAxis.data.push(item.date)
                    }
                })
            });

            this.render();
        })
    }
}
