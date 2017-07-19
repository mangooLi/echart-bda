import { Component, OnInit } from '@angular/core';
import {DataService} from '../service/data.service';
import {CommonService} from '../service/common.service';
declare var echarts:any;
declare var $:any;
@Component({
  selector: 'app-hot-route-price',
  templateUrl: './hot-route-price.component.html',
  styleUrls: ['./hot-route-price.component.css']
})
export class HotRoutePriceComponent implements OnInit {

    constructor(
        private DataService:DataService,
        private CommonService:CommonService
    ) { }
    route_box_color=['#ff0000','#ffff00','#00ffff','#ff6600','#00ff00','#ff00ff']
    hotRouteList=["江苏镇江-广东广州","江苏镇江-广东广州","江苏镇江-广东广州","江苏镇江-广东广州","江苏镇江-广东广州","江苏镇江-广东广州"]
    option = {
        color:['#ff0000','#ffff00','#00ffff','#ff6600','#00ff00','#ff00ff'],
        title: {
            text: ''
        },
        tooltip: {
            trigger: 'axis'
        },
        // legend: {
        //     data:['江苏镇江--广东广州','江苏镇江--广东深圳','江苏镇江--广东珠海','江苏镇江--广东东莞','江苏镇江--广东佛山','江苏镇江--广东茂名'],
        //     textStyle:{
        //         color:'#fff'
        //     }
        // },
        grid: {
            
            left: '5%',
            right: '1%',
            bottom: '1%',
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
            offset:0,
            // min:0,
            // max:1500,
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
                // fontSize:16
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
                name:'江苏镇江--广东广州',
                type:'line',
                stack: '总量1',
                data:[120, 130, 100, 130, 900, 230, 210],
                lineStyle:{
                    normal:{
                        color:'#d95a09'
                    }
                }
            },
            {
                name:'江苏镇江--广东深圳',
                type:'line',
                stack: '总量2',
                data:[220, 180, 190, 230, 290, 330, 310],
                lineStyle:{
                    normal:{
                        color:'#00fa02'
                    }
                }
            },
            {
                name:'江苏镇江--广东珠海',
                type:'line',
                stack: '总量3',
                data:[150, 230, 200, 150, 190, 330, 410],
                lineStyle:{
                    normal:{
                        color:'#fe0002'
                    }
                }
            },
            {
                name:'江苏镇江--广东东莞',
                type:'line',
                stack: '总量4',
                data:[320, 330, 300, 330, 390, 330, 320],
                lineStyle:{
                    normal:{
                        color:'#00fdfd'
                    }
                }
            },
            {
                name:'江苏镇江--广东佛山',
                type:'line',
                stack: '总量5',
                data:[820, 930, 900, 930, 850, 650, 400],
                lineStyle:{
                    normal:{
                        color:'#fa91fd'
                    }
                }
            },
            {
                name:'江苏镇江--广东茂名',
                type:'line',
                stack: '总量6',
                data:[450, 100, 700, 650, 130, 100, 650],
                lineStyle:{
                    normal:{
                        color:'#fa01fd'
                    }
                }
            }
        ]
    };
    
    ngOnInit() {
        var scale=$('body').width()/1920;
        $('.route-box').width(8*scale+'px').height(8*scale+'px');
        this.route_box_color.forEach((item,index)=>{
            $(`.rbx0${index}`).css({'backgroundColor':item});
        })
        // this.render();
        this.loadData();
    }

    render(){
        var dom = document.getElementById("hot-route-chart");
        var scale=$('body').width()/1920;
        $(dom).css({'width':400*scale+'px','height':250*scale+'px'});
        var myChart = echarts.init(dom);
        myChart.clear();
        if (this.option && typeof this.option === "object") {
            myChart.setOption(this.option, true);
           
        }
    }

    loadData(){
         var now=new Date()
        var today=this.CommonService.transformDate(now);
        

        var thisMonth=now.getMonth()+1;
        var thisYear=now.getFullYear()
        var startMonth=thisMonth>6?thisMonth-6:thisMonth+6;
        var startYear=thisMonth>6?thisYear:thisYear-1;
        var startDate=startYear+'-'+startMonth+'-01';
        this.DataService.Line_getHotLineDetail(6,2,startDate,today).subscribe(res=>{
            this.option.xAxis.data=[];
            // this.option.legend.data=[]
            var list=res.data;
            // list.pop();
            this.hotRouteList=[];
            this.option.series.forEach(item=>{
                item.data=[];
            })
            list[0].value.forEach((item,index)=>{
                //最后一个月的数据不取
                if(index===list[0].value.length-1){
                    return;
                }
                this.option.xAxis.data.push({
                    value:item.date,
                    textStyle: {align:'right'}
                });
            })
            list.forEach((item,index) => {
                // this.option.legend.data.push(item.key);
                this.hotRouteList.push(item.key);
                this.option.series[index].name=item.key;
                item.value.forEach((it,ind) => {
                    if(ind===it.length-1){return}
                    this.option.series[index].data.push(it.counts);
                });
            
            });

            this.render();
        })
    }

}
