import { Component, OnInit } from '@angular/core';
// import geoCoordMap from '../home-page/geoCoordMap';
import cityCoordinate from '../../vendor/cityLocation';
import {DataService} from '../service/data.service';
import {CommonService} from '../service/common.service';
declare var $:any;
declare var echarts:any;

@Component({
  selector: 'app-main-chart',
  templateUrl: './main-chart.component.html',
  styleUrls: ['./main-chart.component.css']
})
export class MainChartComponent implements OnInit {

    constructor(
        private DataService:DataService,
        private CommonService:CommonService
    ) { }
    
    total_trade_num=[];
    month_trade:number=0;
    quater_trade:number=0;
    year_trade:number=0;
    chart=null;
    
    randomValue() {
        return Math.round(Math.random()*1000);
    }
    bg=document.getElementById('bg');
    ph01='path://M285.213103,174.984725 L414.493286,174.984725 L414.493286,167.269662 L285.213103,167.269662 L285.213103,174.984725 Z M457.731903,90.2719812 C446.005956,90.3424299 437.282408,100.027276 437.277773,112.947203 C437.271285,130.523234 437.269431,148.098338 437.322267,165.67437 C437.331536,168.834366 437.615184,171.993435 437.768131,175.058882 L457.731903,175.058882 L457.731903,90.2719812 Z M266.981805,175.325846 L266.981805,90.2404647 C255.93995,90.5982701 246.942951,99.7195267 246.893822,110.613125 C246.808542,129.608327 246.869721,148.604457 246.869721,167.600586 L246.869721,175.039416 C247.868049,175.171971 248.449248,175.313795 249.031374,175.315649 C254.885078,175.332334 260.738782,175.325846 266.981805,175.325846 L266.981805,175.325846 Z M419.430234,75.4786748 C426.282265,64.0242674 433.277047,51.8672267 440.744575,40.0086661 C445.736213,32.082257 446.08382,29.7676454 436.304473,23.2205483 C434.55346,22.0479477 432.490065,21.2943317 430.498044,20.5397887 C415.131029,14.7231336 398.909364,13.40222 382.782248,12.3297307 C360.801428,10.8669926 338.756648,10.5740742 316.795295,13.1371103 C307.072492,14.2707786 297.206939,14.8844242 287.717728,17.0813122 C280.282644,18.8035983 272.995872,21.9914033 266.26249,25.6640068 C260.858358,28.61173 260.737855,32.3418049 263.949744,37.6291675 C266.27176,41.452865 268.584506,45.2821243 270.874078,49.1262149 C276.293041,58.2270785 281.695319,67.3381386 286.524741,75.4675513 C331.160274,66.6911227 374.901299,66.6577522 419.430234,75.4786748 L419.430234,75.4786748 Z M469.479169,542.848529 L469.479169,371.647918 C455.820527,370.784921 450.140163,362.428404 450.510944,350.562427 C450.896556,338.218141 450.915095,325.844193 450.529483,313.500833 C450.145725,301.230704 457.221152,293.718645 470.222585,293.066994 C470.222585,275.343576 470.566484,257.584008 470.100227,239.845759 C469.792479,228.147562 460.843681,218.599905 447.624415,218.695382 C383.832485,219.159787 320.034993,218.900239 256.239355,218.909509 C245.823192,218.911363 236.976359,227.26788 236.71774,237.696146 C236.415553,249.881922 236.434092,262.076041 236.353447,274.267379 C236.308954,281.036946 236.346032,287.80744 236.346032,294.387908 C247.903273,298.435929 252.301662,303.349728 252.392503,312.612809 C252.531546,326.822132 252.535254,341.035164 252.386941,355.245414 C252.30537,363.064296 247.677097,369.620663 240.42833,371.612693 C236.823412,372.602683 236.475805,374.438058 236.479513,377.516482 C236.539765,431.581248 236.51381,485.646014 236.506395,539.709852 C236.505468,541.217084 236.506395,542.724317 236.506395,544.088797 C249.485581,547.961623 254.160201,553.054325 254.25475,563.581775 C254.376181,577.018944 254.377108,590.45982 254.251969,603.896988 C254.165763,613.201782 248.853399,620.205869 240.801892,622.107985 C239.468934,622.422223 238.117438,622.656744 236.673246,622.948735 C236.673246,634.077781 236.494344,644.998261 236.728863,655.910398 C236.92445,665.055756 246.437762,674.288247 256.238428,674.231703 C320.803436,673.861847 385.373079,674.041677 449.940869,674.039823 C458.931379,674.039823 465.66476,669.519981 468.382584,660.873326 C472.457467,647.907052 468.990665,634.636736 470.154917,621.62504 C459.312356,620.000085 452.757877,614.359552 452.585463,606.057725 C452.263811,590.631307 452.304597,575.193765 452.451055,559.76364 C452.517796,552.778092 456.323862,547.851316 462.540004,544.924912 C464.71278,543.901552 467.185889,543.514084 469.479169,542.848529 L469.479169,542.848529 Z M217.207248,77.9193525 L197.290751,77.9193525 C195.27463,63.150147 203.936072,51.1404924 217.298089,49.9224709 C218.182402,43.5913548 218.681102,37.1490038 220.028891,30.8883364 C225.071511,7.46598747 238.022889,0.565719737 257.327597,0.377547471 C321.115819,-0.243513704 384.914238,0.0355003462 448.707095,0.271874375 C457.293454,0.303390913 465.864982,2.17584401 473.008076,7.69123802 C482.063473,14.6832745 485.030648,24.7926673 486.926265,35.4044708 C487.305389,37.5272022 487.896784,39.6916468 487.791112,41.8069626 C487.525076,47.119353 488.821883,50.6705252 493.724533,54.2587757 C501.087315,59.6490305 502.068958,68.7814106 502.719678,77.9212064 L488.376019,77.9212064 C488.376019,83.014835 488.376945,87.7284113 488.376019,92.4419875 C488.365822,284.747555 488.351918,477.054049 488.356553,669.359617 C488.356553,674.762849 488.691182,680.167935 488.617953,685.568387 C488.481691,695.489607 483.896058,699.979787 474.048117,699.988129 C447.634611,700.009449 421.221106,699.995545 394.8076,699.995545 C340.898835,699.995545 286.990998,699.996472 233.082233,699.994618 C221.486987,699.993691 217.207248,695.718566 217.207248,684.157558 L217.207248,84.5202132 L217.207248,77.9193525 Z';
    ph02='path://M0,350 L700,350';
    ph03='points://227.547837 276 478.140625 276.484375 478.582031 331.652344 230.055235 332.298762 230.055235 394.672646 478.251954 394.672646 478.251954 450.879834 227.055142 450.879834 227.055142 505.880553 477.25 507.125 476.332031 566.722656 227 564.150183 227 619.32976 479.575195 619.32976'
    planePath=this.ph01+this.ph02+this.ph03;
    BJData = [
         
    ];
    convertData = function (data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
            var dataItem = data[i];
            var fromCoord = cityCoordinate[dataItem[0].name];
            var toCoord = cityCoordinate[dataItem[1].name];
            if (fromCoord && toCoord) {
                res.push({
                    fromName: dataItem[0].name,
                    toName: dataItem[1].name,
                    coords: [fromCoord, toCoord]
                });
            }
        }
        return res;
    };
    series = [
        {
            name: '',
            type: 'lines',
            zlevel: 1,
            effect: {
                show: true,
                period: 6,
                trailLength: 0.7,
                color: '#fff',
                symbolSize: 3
            },
            lineStyle: {
                normal: {
                    color: '#ff0000',
                    width: 0,
                    curveness: 0.2
                }
            },
            data: this.convertData(this.BJData)
        },
        {
            name: '',
            type: 'lines',
            zlevel: 2,
            symbol: ['none', 'none'],
            symbolSize: 10,
            effect: {
                show: true,
                period: 6,
                trailLength: 0,
                symbol: this.planePath,
                symbolSize: 20
            },
            lineStyle: {
                normal: {
                    color: '#ff0000',
                    width: 1,
                    opacity: 0.6,
                    curveness: 0.2
                }
            },
            data: this.convertData(this.BJData)
        },
        {
            name: '',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            zlevel: 3,
            rippleEffect: {
                brushType: 'stroke'
            },
            label: {
                normal: {
                    show: false,
                    position: 'right',
                    formatter: '{b}'
                }
            },
            symbolSize: function (val) {
                return val[2] / 8;
            },
            itemStyle: {
                normal: {
                    color: '#ff0000'
                }
            },
            data: this.BJData.map( (item)=> {
                return {
                    name: item[1].name,
                    value: cityCoordinate[item[1].name].concat([item[1]['value']])
                };
            })
        },
        {
            type: 'scatter',
            coordinateSystem: 'geo',
            data: this.convertData([]),
            symbolSize: 20,
            // symbol: 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z',
            symbolRotate: 35,
            zlevel:4,
            label: {
                normal: {
                    formatter: '{b}',
                    position: 'top',
                    show: false
                },
                emphasis: {
                    show: true
                }
            },
            itemStyle: {
                normal: {
                        color: '#00cfff'
                }
            }
        },
        {
            name: '该省车辆',
            type: 'map',
            zlevel:5,
            geoIndex: 0,
            // tooltip: {show: false},
            data:null
        }
        
    ]
    option = {
        // backgroundColor: {
        //     image: this.bg, // 支持为 HTMLImageElement, HTMLCanvasElement，不支持路径字符串
        //     repeat: 'repeat' // 是否平铺, 可以是 'repeat-x', 'repeat-y', 'no-repeat'
        // },
        tooltip: {},
        title : {
            text: '',
            subtext: '',
            left: 'center',
            textStyle : {
                color: '#e0fff'
            }
        },
        visualMap: {
            min: 0,
            max: 1500,
            // left: 'left',
            // top: 'bottom',
            // text: ['High','Low'],
            seriesIndex: [4],
            inRange: {
                color: ['#0082d2', '#00ffce']
            },
            itemWidth:0,
            itemHeight:0,
            calculable : false
              
         
        },
        geo: {
            map: 'china',
            roam: false,
            label: {
                normal: {
                    show: false,
                    textStyle: {
                        color: 'rgba(0,0,0,0.4)'
                    }
                }
            },
            itemStyle: {
                normal:{
                    borderColor: '#000123',
                    // borderWidth:0,
                    // borderType:'dotted'
                },
                emphasis:{
                    areaColor: '#00cfff',
                    shadowOffsetX: 0,
                    shadowOffsetY: 0,
                    shadowBlur: 20,
                    borderWidth: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        },
        series: this.series
    };
   

    ngOnInit() {
        
        var app = {};
        this.loadProcinceCars();
        var color = ['#a6c84c', '#ffa022', '#46bee9'];
        var scale=$('body').width()/1920;
        $('#container').height(680*scale+'px').width(960*scale+'px');
        
        $('.trade-num-box').css({'fontSize':48*scale+'px'});
        
        this.loadTradeNum();
        setInterval(()=>{
            this.loadTradeNum();
        },30*60*60*1000)

        this.CommonService.orderEmit.subscribe(list=>{
            window['main_list']=list;
            this.drawLineFromList(list)
        })
        if(window['main_list']){
            this.drawLineFromList(window['main_list'])
        }
        
    }
    drawLineFromList(list){
        // console.log('chart list is ',list);
        var anotherList=this.CommonService.trimArry(list,'OriginCityName','DestinationCityName');
        anotherList=anotherList.map(order=>{
            if(order.OriginCityName=="北京辖县"){
                order.OriginCityName=="北京"
            }
            return [].concat({name:order.OriginCityName},{name:order.DestinationCityName,value:20})
        })
        
        // console.log(anotherList)
        this.BJData=anotherList;
        this.series[0].data=this.convertData(this.BJData);
        this.series[1].data=this.convertData(this.BJData);
        this.series[2].data=this.BJData.map( (item)=> {
            return {
                name: item[1].name,
                value: cityCoordinate[item[1].name].concat([item[1]['value']])
            };
        })
        this.animate();
    }

    animate(){
        var dom = document.getElementById("container");
        if(!this.chart){
            this.chart = echarts.init(dom);
        }
        
        this.chart.clear();
        if (this.option && typeof this.option === "object") {
            this.chart.setOption(this.option, true);
           
        }
    }
    
    /**
     * 加载交易额
     */
    loadTradeNum(){
        this.loadTotalTradeNum();
        this.getMonthTradeNum();
        this.getQuarterTradeNum();
        this.getYearTradeNum();
    }
    /**
     * 加载来货拉平台累计交易额
     */
    loadTotalTradeNum(){
        var today=this.CommonService.transformDate(new Date());
        this.DataService.Transaction_getTransactionSun(3,'2016-8-1',today).subscribe(res=>{
            var total=Math.floor(res.data.sumReceivableTotalPrice);
            this.total_trade_num=total.toString().split('').reverse();
            if(this.total_trade_num.length<10){
                for(let i=this.total_trade_num.length;i<10;i++){
                    this.total_trade_num[i]=0;
                }
            }
            // console.log(this.total_trade_num);
        })
    }
    /**
     * 获取本月交易额
     */
    getMonthTradeNum(){
        var today=this.CommonService.transformDate(new Date());
        var firstDayOfThisMonth=today.substr(0,8)+'01';
        this.DataService.Transaction_getTransactionSun(3,firstDayOfThisMonth,today).subscribe(res=>{
            this.month_trade=Math.floor(res.data.sumReceivableTotalPrice)
        })
    }
    /**
     * 获取季度交易额
     */
    getQuarterTradeNum(){
        var now=new Date();
        var today=this.CommonService.transformDate(now);
        var thisMonth=now.getMonth()+1;
        var firstMonthOfThisQuarter=thisMonth-thisMonth%3;

        var firstDayOfThisQuarter=now.getFullYear()+'-'+firstMonthOfThisQuarter+'-01';
        this.DataService.Transaction_getTransactionSun(3,firstDayOfThisQuarter,today).subscribe(res=>{
            this.quater_trade=Math.floor(res.data.sumReceivableTotalPrice)
        })
    }
    /**
     * 获取年度交易额
     */
    getYearTradeNum(){
        var today=this.CommonService.transformDate(new Date());
        var firstDayOfThisYear=today.substr(0,4)+'-01-01';
        this.DataService.Transaction_getTransactionSun(3,firstDayOfThisYear,today).subscribe(res=>{
            this.year_trade=Math.floor(res.data.sumReceivableTotalPrice)
        })
    }

    /**
     * 获取每个省份的车辆
     */
    loadProcinceCars(){
        this.DataService.Capacity_getCapacityList(5).subscribe(res=>{
            // console.log(res);
            var pvl=res.data.provinceVehiclesList;//
            this.series[4].data=[];
            var max=0;
            pvl.forEach(element => {
                var num=Number(element.counts);
                if(num>max){
                    max=num
                }
                let temp:{name:string,value:number}={name:element.province,value:num};
                this.series[4].data.push(temp);
                // this.series[4].data.push({name:element.province,value:10});
            });
            this.option.visualMap.max=max;
            this.animate();
        })
    }

}
